import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';

const getDetailPopUpPublic = async (
  popUpId: number,
): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
  try {
    const response = await PublicApiInstance.get('/api/v1/popup/guest/detail', {
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
