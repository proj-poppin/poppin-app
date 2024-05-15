import apiInstance from '../axios.ts';
import {DetailPopUpData} from '../../types/DetaiPopUpData.ts';

export type TFilterparmas = {
  text: string;
  prepared: string;
  page: number;
  oper: string;
  order: string;
  taste: string;
  size: number;
};
const getFindPopUpList = async (params: TFilterparmas) => {
  try {
    const response = await apiInstance.get('/api/v1/popup/guest/', {
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

export default getFindPopUpList;
