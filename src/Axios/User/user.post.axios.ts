import customAxios, {POPUP_TASTE, USERS} from '../axios.core';
import {PreferenceSchema} from '../../Schema/Preference/preference.schema';
import {handleAxiosError} from 'src/Util';
import {PopupSchema} from '../../Schema/Popup/popup.schema';
import {usePopupStore} from '../../Zustand/Popup/popup.zustand';

/**
 * 유저의 팝업 취향 정보를 설정합니다.
 * @author 도형
 */

export interface SettingPreferenceResponseData {
  updatedRecommendedPopup: PopupSchema[];
}

export const axiosSettingPreference = async (param: {
  data: PreferenceSchema;
}) => {
  const requestBody = {
    preference: {
      market: param.data.preferencePopupStore.market,
      display: param.data.preferencePopupStore.display,
      experience: param.data.preferencePopupStore.experience,
      wantFree: param.data.preferencePopupStore.wantFree,
    },
    taste: {
      fashionBeauty: param.data.preferenceCategory.fashionBeauty,
      characters: param.data.preferenceCategory.characters,
      foodBeverage: param.data.preferenceCategory.foodBeverage,
      webtoonAnimation: param.data.preferenceCategory.webtoonAnimation,
      interiorThings: param.data.preferenceCategory.interiorThings,
      movie: param.data.preferenceCategory.movie,
      musical: param.data.preferenceCategory.musical,
      sports: param.data.preferenceCategory.sports,
      game: param.data.preferenceCategory.game,
      itTech: param.data.preferenceCategory.itTech,
      kpop: param.data.preferenceCategory.kpop,
      alcohol: param.data.preferenceCategory.alcohol,
      animalPlant: param.data.preferenceCategory.animalPlant,
      etc: param.data.preferenceCategory.etc,
    },
    whoWith: {
      solo: param.data.preferenceCompanion.solo,
      withFriend: param.data.preferenceCompanion.withFriend,
      withFamily: param.data.preferenceCompanion.withFamily,
      withLover: param.data.preferenceCompanion.withLover,
    },
  };

  try {
    // Axios 요청
    const response = await customAxios.request<{
      userPreferenceSetting: PreferenceSchema;
      updatedRecommendedPopupStores: PopupSchema[];
    }>({
      method: 'PUT',
      url: `v1/${USERS}/${POPUP_TASTE}`,
      data: requestBody,
    });

    // 응답 데이터 구조 확인
    const {userPreferenceSetting, updatedRecommendedPopupStores} =
      response.data;

    // // Zustand 상태 업데이트
    // usePopupStore
    //   .getState()
    //   .setRecommendedPopupStores(updatedRecommendedPopupStores);

    // // 콘솔 로깅 (디버깅 용도)
    // console.log('Updated User Preference:', userPreferenceSetting);
    // console.log(
    //   'Updated Recommended Popup Stores:',
    //   updatedRecommendedPopupStores,
    // );

    return response.data;
  } catch (error) {
    // 오류 처리
    handleAxiosError({
      error,
      errorMessage: '취향 설정에 실패했습니다',
    });
    return null;
  }
};
