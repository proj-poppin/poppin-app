import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
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
const getFindPopUpList = async (
  params: any,
): Promise<CommonResponse<TfindPopupType>> => {
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
    console.log('Error fetching popuplist:', error);
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
