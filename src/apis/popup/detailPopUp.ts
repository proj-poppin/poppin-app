import apiInstance from '../axios.ts';
import {DetailPopUpData} from '../../types/DetaiPopUpData.ts';

const getDetailPopUp = async (
  popUpId: number,
): Promise<CommonResponse<DetailPopUpData>> => {
  try {
    const response = await apiInstance.get('/api/v1/popup/detail', {
      params: {popupId: popUpId},
    });
    console.log('getDetailPopUp response:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.error('Error fetching pop up detail:', error);
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
