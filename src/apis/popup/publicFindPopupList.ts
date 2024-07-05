import PublicApiInstance from '../../apis/apiInstance/PublicApiInstance.ts';
import {
  CommonResponse,
  ResponseData,
  TFilterparmas,
} from '../../types/FindPopupType.ts';

const getPublicFindPopUpList = async (
  params: TFilterparmas,
): Promise<CommonResponse<ResponseData>> => {
  try {
    const response = await PublicApiInstance.get('/api/v1/popup/guest/search', {
      params: params,
    });

    console.log('getFindPopupList response:', response.data);

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

export default getPublicFindPopUpList;
