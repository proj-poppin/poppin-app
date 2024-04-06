import apiInstance from '../axios.ts';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';

const getHotList = async (): Promise<
  CommonResponse<GetPopUpListResponse[]>
> => {
  try {
    const response = await apiInstance.get('/api/v1/popup/hot-list');
    console.log('Hot list response:', response.data);

    if (response.data.success) {
      console.log('Hot list fetched successfully', response.data);
      // 성공적으로 데이터를 가져온 경우, error는 null입니다.
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } else {
      return {
        success: false,
        data: null,
        error: response.data.error,
      };
    }
  } catch (error) {
    // 네트워크 에러 또는 기타 예외 처리
    return {
      success: false,
      data: null,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};

export default getHotList;
