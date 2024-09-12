import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {
  CommonResponse,
  ResponseData,
  TFilterparmas,
} from '../../types/FindPopupType.ts';

const getFindPopUpList = async (
  params: TFilterparmas,
): Promise<CommonResponse<ResponseData>> => {
  try {
    const response = await nonPublicApiInstance.get('/api/v1/popup/search', {
      params: params,
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
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default getFindPopUpList;
