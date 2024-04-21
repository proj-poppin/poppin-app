import apiInstance from '../axios.ts';
import {GetTastePopUpListResponse} from '../../types/PopUpListData.ts';

const getTasteList = async (): Promise<
  CommonResponse<GetTastePopUpListResponse>
> => {
  try {
    const response = await apiInstance.get('/api/v1/popup/taste-list');
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};

export default getTasteList;
