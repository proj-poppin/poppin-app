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
} from 'src/Screen/FindPopup/Types/preference.schema';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';

type MypagePreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>; // 실제로 저장된 취향 태그
  draftSelectedTags: Record<string, boolean>; // 화면에서 누르기만 하고 설정 저장하지 않은 태그 (UI용)
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  isAllCategoriesSelected: () => boolean;
  savePreferences: () => Promise<boolean>;
};

export const useMypagePreferenceSettingScreenStore =
  create<MypagePreferenceSettingScreenProps>((set, get) => {
    const {isPreferenceSettingCreated, userPreferenceSetting} =
      useUserStore.getState();

    const initialTags = isPreferenceSettingCreated
      ? {
          ...userPreferenceSetting.preferencePopupStore,
          ...userPreferenceSetting.preferenceCategory,
          ...userPreferenceSetting.preferenceCompanion,
        }
      : {};

    return {
      selectedTags: initialTags,
      draftSelectedTags: initialTags,

      // 태그 토글 (임시 상태 수정)
      toggleTag: tag =>
        set(state => ({
          draftSelectedTags: {
            ...state.draftSelectedTags,
            [tag]: !state.draftSelectedTags[tag],
          },
        })),

      // 태그 초기화
      resetTags: () => {
        set(state => ({
          draftSelectedTags: state.selectedTags, // 저장된 태그로 초기화
        }));
      },

      // 모든 카테고리가 선택되었는지 확인
      isAllCategoriesSelected: () => {
        const {draftSelectedTags} = get();
        const isPopupCategorySelected = preferenceKeysForPopupCategory.some(
          key => draftSelectedTags[key],
        );
        const isPopupInterestSelected = preferenceKeysForPopupInterest.some(
          key => draftSelectedTags[key],
        );
        const isPopupMateSelected = preferenceKeysForPopupMate.some(
          key => draftSelectedTags[key],
        );

        return (
          isPopupCategorySelected &&
          isPopupInterestSelected &&
          isPopupMateSelected
        );
      },

      // Preference 저장
      savePreferences: async () => {
        const {draftSelectedTags} = get();

        // 현재 선택된 태그를 기반으로 PreferenceSchema 생성
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

        // API 호출
        try {
          const result = await axiosSettingPreference({data: preferenceSchema});
          if (result) {
            const updatedPreferenceSetting = result.userPreferenceSetting; // 변수명 변경

            // 반환된 상태값으로 selectedTags 업데이트
            const updatedTags = {
              ...updatedPreferenceSetting.preferencePopupStore,
              ...updatedPreferenceSetting.preferenceCategory,
              ...updatedPreferenceSetting.preferenceCompanion,
            };

            useUserStore
              .getState()
              .setUserPreferenceSetting(updatedPreferenceSetting);

            // 태그 상태 업데이트
            set({
              selectedTags: updatedTags, // 저장된 상태 업데이트
              draftSelectedTags: updatedTags, // 임시 상태도 동기화
            });

            // 새롭게 설정한 추천(취향설정된) 팝업스토어로 새롭게 업데이트
            usePopupStore
              .getState()
              .setRecommendedPopupStores(result.updatedRecommendedPopupStores);

            return true; // 성공 여부 반환
          }
          return false; // 실패 시 false 반환
        } catch (error) {
          // console.error('Error saving preferences:', error);
          return false; // 실패 시 false 반환
        }
      },
    };
  });
