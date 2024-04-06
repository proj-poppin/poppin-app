import apiInstance from '../axios.ts';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';

const getClosingList = async (): Promise<
  CommonResponse<GetPopUpListResponse[]>
> => {
  try {
    const response = await apiInstance.get('/api/v1/popup/closing-list');
    console.log('Sign up response:', response.data);

    if (response.data.success) {
      console.log('getClosingList response:', response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('getClosingList error:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error222',
      },
    };
  }
};

export default getClosingList;
