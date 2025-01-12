import create from 'zustand';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
} from 'src/Object/preference.enum';
import {axiosSettingPreference} from 'src/Axios/User/user.post.axios';
import {
  BlankPreference,
  PreferenceSchema,
} from 'src/Schema/Preference/preference.schema';

type AuthPreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>;
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  isStepValid: (step: number) => boolean;
  savePreferences: () => Promise<boolean>;
};

export const useAuthPreferenceSettingScreenStore =
  create<AuthPreferenceSettingScreenProps>((set, get) => ({
    selectedTags: {},

    toggleTag: tag =>
      set(state => ({
        selectedTags: {
          ...state.selectedTags,
          [tag]: !state.selectedTags[tag],
        },
      })),

    resetTags: () => set({selectedTags: {}}),

    isStepValid: step => {
      const {selectedTags} = get();
      const keys =
        step === 1
          ? preferenceKeysForPopupCategory
          : step === 2
          ? preferenceKeysForPopupInterest
          : preferenceKeysForPopupMate;
      return keys.some(key => selectedTags[key]);
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
        console.log('result: ', result);
        if (result) {
          set({
            selectedTags: {
              ...preferenceSchema.preferencePopupStore,
              ...preferenceSchema.preferenceCategory,
              ...preferenceSchema.preferenceCompanion,
            },
          });
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  }));
