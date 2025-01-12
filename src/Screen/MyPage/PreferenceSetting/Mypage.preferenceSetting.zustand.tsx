import create from 'zustand';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
} from '../../../Object/preference.enum';
import {axiosSettingPreference} from 'src/Axios/User/user.post.axios';
import {
  BlankPreference,
  PreferenceSchema,
} from 'src/Schema/Preference/preference.schema';

type MypagePreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>;
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  isAllCategoriesSelected: () => boolean;
  savePreferences: () => Promise<boolean>;
};

export const useMypagePreferenceSettingScreenStore =
  create<MypagePreferenceSettingScreenProps>((set, get) => ({
    selectedTags: {},

    toggleTag: tag =>
      set(state => ({
        selectedTags: {
          ...state.selectedTags,
          [tag]: !state.selectedTags[tag],
        },
      })),

    resetTags: () => set({selectedTags: {}}),

    isAllCategoriesSelected: () => {
      const {selectedTags} = get();
      const isPopupCategorySelected = preferenceKeysForPopupCategory.some(
        key => selectedTags[key],
      );
      const isPopupInterestSelected = preferenceKeysForPopupInterest.some(
        key => selectedTags[key],
      );
      const isPopupMateSelected = preferenceKeysForPopupMate.some(
        key => selectedTags[key],
      );

      return (
        isPopupCategorySelected &&
        isPopupInterestSelected &&
        isPopupMateSelected
      );
    },

    savePreferences: async () => {
      const {selectedTags} = get();

      // BlankPreference를 기반으로 선택된 태그를 반영
      const preferenceSchema: PreferenceSchema = {
        ...BlankPreference,
        preferencePopupStore: {
          ...BlankPreference.preferencePopupStore,
          ...Object.fromEntries(
            preferenceKeysForPopupCategory.map(key => [
              key,
              selectedTags[key] ?? false,
            ]),
          ),
        },
        preferenceCategory: {
          ...BlankPreference.preferenceCategory,
          ...Object.fromEntries(
            preferenceKeysForPopupInterest.map(key => [
              key,
              selectedTags[key] ?? false,
            ]),
          ),
        },
        preferenceCompanion: {
          ...BlankPreference.preferenceCompanion,
          ...Object.fromEntries(
            preferenceKeysForPopupMate.map(key => [
              key,
              selectedTags[key] ?? false,
            ]),
          ),
        },
      };

      // API 호출
      try {
        const result = await axiosSettingPreference({data: preferenceSchema});
        if (result) {
          // 성공 시, Zustand 상태 업데이트
          set({
            selectedTags: {
              ...preferenceSchema.preferencePopupStore,
              ...preferenceSchema.preferenceCategory,
              ...preferenceSchema.preferenceCompanion,
            },
          });
          return true; // 성공 여부 반환
        }
        return false; // 실패 시 false 반환
      } catch {
        return false; // 실패 시 false 반환
      }
    },
  }));
