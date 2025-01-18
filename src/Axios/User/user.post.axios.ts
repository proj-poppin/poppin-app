import customAxios, {POPUP_TASTE, USERS} from '../axios.core';
import {PreferenceSchema} from '../../Schema/Preference/preference.schema';
import {handleAxiosError} from 'src/Util';
import {PopupSchema} from '../../Schema/Popup/popup.schema';

/**
 * 유저의 팝업 취향 정보를 설정합니다.
 * @author 도형
 */

export interface SettingPreferenceResponseData {
  updatedRecommendedPopup: PopupSchema[];
}

export const axiosSettingPreference = async (param: {
  data: PreferenceSchema;
}): Promise<{
  userPreferenceSetting: PreferenceSchema;
  updatedRecommendedPopupStores: PopupSchema[];
} | null> => {
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
      updatedRecommendedPopupStores: {[key: string]: PopupSchema}; // 객체 형태로 응답
    }>({
      method: 'PUT',
      url: `v1/${USERS}/${POPUP_TASTE}`,
      data: requestBody,
    });

    // console.log('axios에서는 ', response.data);

    const userPreferenceSetting = response.data.userPreferenceSetting;

    // 객체 형태의 recommendedPopupStores를 배열로 변환
    const updatedRecommendedPopupStores = Object.values(
      response.data.updatedRecommendedPopupStores ?? {},
    );

    return {
      userPreferenceSetting,
      updatedRecommendedPopupStores,
    };
  } catch (error) {
    // 오류 처리
    handleAxiosError({
      error,
      errorMessage: '취향 설정에 실패했습니다',
    });
    return null;
  }
};
