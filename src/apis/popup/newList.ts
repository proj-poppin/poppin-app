import apiInstance from '../axios.ts';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';

const getNewList = async (): Promise<
  CommonResponse<GetPopUpListResponse[]>
> => {
  try {
    const response = await apiInstance.get('/api/v1/popup/new-list');

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('getNewList error:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error222',
      },
    };
  }
};

export default getNewList;
