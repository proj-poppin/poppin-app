import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {DetailPopUpData} from '../../types/DetailPopUpData.ts';

const getDetailPopUp = async (
  popUpId: number,
): Promise<CommonResponse<DetailPopUpData>> => {
  try {
    const response = await nonPublicApiInstance.get('/api/v1/popup/detail', {
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

export default getDetailPopUp;
