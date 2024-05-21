import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {GetInterestPopUpListResponse} from '../../types/PopUpListData.ts';

const getInterestList = async (): Promise<
  CommonResponse<GetInterestPopUpListResponse[]>
> => {
  try {
    const response = await nonPublicApiInstance.get(
      '/api/v1/popup/interested-list',
    );

    if (response.data.success) {
      console.log('Hot list fetched successfully', response.data);
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
    // 네트워크 에러 또는 기타 예외 처리
    return {
      success: false,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};

export default getInterestList;
