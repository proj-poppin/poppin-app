import customAxios, {POPUP_TASTE, USERS} from '../axios.core';
import {UserSchema} from '../../Schema/User/user.schema';
import {PreferenceSchema} from '../../Schema/Preference/preference.schema';
import {handleAxiosError} from 'src/Util';

/**
 * 유저의 팝업 취향 정보를 설정합니다.
 * @author 도형
 */

export const axiosSettingPreference = async (param: {
  data: PreferenceSchema;
}) => {
  // API에서 요구하는 requestBody 형태로 변환
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
      webtoonAni: param.data.preferenceCategory.webtoonAni,
      interiorThings: param.data.preferenceCategory.interiorThings,
      movie: param.data.preferenceCategory.movie,
      musical: param.data.preferenceCategory.musical,
      sports: param.data.preferenceCategory.sports,
      game: param.data.preferenceCategory.game,
      itTech: param.data.preferenceCategory.itTech,
      kpop: param.data.preferenceCategory.kpop,
      alcohol: param.data.preferenceCategory.alcohol,
      animalPlant: param.data.preferenceCategory.animalPlant,
      guitar: param.data.preferenceCategory.guitar,
    },
    whoWith: {
      solo: param.data.preferenceCompanion.solo,
      withFriend: param.data.preferenceCompanion.withFriend,
      withFamily: param.data.preferenceCompanion.withFamily,
      withLover: param.data.preferenceCompanion.withLover,
    },
  };

  try {
    const response = await customAxios.request<{
      user: UserSchema;
      userPreferenceSetting: PreferenceSchema;
    }>({
      method: 'PUT',
      url: `v1/${USERS}/${POPUP_TASTE}`,
      data: requestBody, // 변환된 requestBody 전달
    });

    console.log('preference response', response);

    console.log('preference response.data', response.data);

    return response.data;
  } catch (error) {
    handleAxiosError({
      error,
      errorMessage: '취향 설정에 실패했습니다',
    });
    return null;
  }
};
