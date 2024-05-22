import PublicApiInstance from '../../apis/apiInstance/PublicApiInstance.ts';
import {TfindPopupType} from '../../types/FindPopUpData.ts';

export type TFilterparmas = {
  text: string;
  prepared: string;
  page: number;
  oper: string;
  order: string;
  taste: string;
  size: number;
};
const getPublicFindPopUpList = async (
  params: any,
): Promise<CommonResponse<TfindPopupType>> => {
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
