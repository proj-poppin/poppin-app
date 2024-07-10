import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';

// 비로그인시 사용
const getDetailPopUpPublic = async (
  popUpId: number,
  isAlarm: boolean,
): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
  try {
    const url = isAlarm
      ? '/api/v1/alarm/popup/guest/detail'
      : '/api/v1/popup/guest/detail';
    const response = await PublicApiInstance.get(url, {
      params: {popupId: popUpId},
    });

    if (response.data.success) {
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

export default getDetailPopUpPublic;
