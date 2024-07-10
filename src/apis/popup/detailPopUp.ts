import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';

// 로그인시 사용
const getDetailPopUp = async (
  popUpId: number,
  isAlarm: boolean,
): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
  try {
    const url = isAlarm ? '/api/v1/alarm/popup/detail' : '/api/v1/popup/detail';
    const response = await nonPublicApiInstance.get(url, {
      params: {popupId: popUpId},
    });

    if (response.data.success) {
      console.log('DetailPopUpDataNonPublic:', response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error fetching pop up detail:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default getDetailPopUp;
