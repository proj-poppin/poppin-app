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
import {useUserStore} from 'src/Zustand/User/user.zustand';

import {logger} from 'react-native-logs';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';

type MypagePreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>;
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

      // 태그 토글
      toggleTag: tag =>
        set(state => ({
          selectedTags: {
            ...state.selectedTags,
            [tag]: !state.selectedTags[tag],
          },
        })),

      // 태그 초기화
      resetTags: () => {
        set({
          selectedTags: initialTags,
        });
      },

      // 모든 카테고리가 선택되었는지 확인
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

      // Preference 저장
      savePreferences: async () => {
        const {selectedTags} = get();

        // 현재 선택된 태그를 기반으로 PreferenceSchema 생성
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
            console.log('result22: ', result); // 전체 result 출력
            console.log('userPreferenceSetting: ', userPreferenceSetting); // userPreferenceSetting 출력
            console.log(
              'preferencePopupStore: ',
              userPreferenceSetting?.preferencePopupStore,
            );
            console.log(
              'preferenceCategory: ',
              userPreferenceSetting?.preferenceCategory,
            );
            console.log(
              'preferenceCompanion: ',
              userPreferenceSetting?.preferenceCompanion,
            );
            // 새롭게 설정한 추천(취향설정된) 팝업스토어로 새롭게 업데이트
            usePopupStore
              .getState()
              .setRecommendedPopupStores(result.updatedRecommendedPopupStores);

            const updatedPreferenceSetting = result.userPreferenceSetting; // 변수명 변경

            logger
              .createLogger()
              .info('updatedPreferenceSetting: ', updatedPreferenceSetting); // 로그 추가

            // 반환된 상태값으로 selectedTags 업데이트
            const updatedTags = {
              ...updatedPreferenceSetting.preferencePopupStore,
              ...updatedPreferenceSetting.preferenceCategory,
              ...updatedPreferenceSetting.preferenceCompanion,
            };

            console.log('updatedTags: ', updatedTags); // 로그 추가

            set({selectedTags: updatedTags}); // Zustand 상태 업데이트
            return true; // 성공 여부 반환
          }
          return false; // 실패 시 false 반환
        } catch (error) {
          console.error('Error saving preferences:', error);
          return false; // 실패 시 false 반환
        }
      },
    };
  });
