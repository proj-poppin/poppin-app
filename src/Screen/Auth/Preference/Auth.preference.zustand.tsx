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
} from 'src/Screen/FindPopup/Types/preference.schema';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import {useHomeLandingScreenStore} from 'src/Screen/Home/Landing/Home.landing.zustand';
import {useUserStore} from 'src/Zustand/User/user.zustand';

type AuthPreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>;
  draftSelectedTags: Record<string, boolean>;
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  isStepValid: (step: number) => boolean;
  savePreferences: () => Promise<boolean>;
};

export const useAuthPreferenceSettingScreenStore =
  create<AuthPreferenceSettingScreenProps>((set, get) => ({
    selectedTags: {},
    draftSelectedTags: {},

    toggleTag: tag =>
      set(state => ({
        selectedTags: {
          ...state.selectedTags,
          [tag]: !state.selectedTags[tag],
        },
        draftSelectedTags: {
          ...state.draftSelectedTags,
          [tag]: !state.draftSelectedTags[tag],
        },
      })),

    resetTags: () =>
      set({
        selectedTags: {},
        draftSelectedTags: {},
      }),

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
      const {draftSelectedTags} = get();

      // BlankPreference를 기반으로 선택된 태그를 반영
      const preferenceSchema: PreferenceSchema = {
        ...BlankPreference,
        preferencePopupStore: {
          ...BlankPreference.preferencePopupStore,
          ...Object.fromEntries(
            preferenceKeysForPopupCategory.map(key => [
              key,
              draftSelectedTags[key] ?? false,
            ]),
          ),
        },
        preferenceCategory: {
          ...BlankPreference.preferenceCategory,
          ...Object.fromEntries(
            preferenceKeysForPopupInterest.map(key => [
              key,
              draftSelectedTags[key] ?? false,
            ]),
          ),
        },
        preferenceCompanion: {
          ...BlankPreference.preferenceCompanion,
          ...Object.fromEntries(
            preferenceKeysForPopupMate.map(key => [
              key,
              draftSelectedTags[key] ?? false,
            ]),
          ),
        },
      };

      try {
        const result = await axiosSettingPreference({data: preferenceSchema});
        if (result) {
          const updatedPreferenceSetting = result.userPreferenceSetting;

          const updatedTags = {
            ...updatedPreferenceSetting.preferencePopupStore,
            ...updatedPreferenceSetting.preferenceCategory,
            ...updatedPreferenceSetting.preferenceCompanion,
          };

          useUserStore
            .getState()
            .setUserPreferenceSetting(updatedPreferenceSetting);

          set({
            selectedTags: updatedTags,
            draftSelectedTags: updatedTags,
          });

          // 새롭게 설정한 추천(취향설정된) 팝업스토어로 새롭게 업데이트
          usePopupStore
            .getState()
            .setRecommendedPopupStores(result.updatedRecommendedPopupStores);

          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  }));
