import apiInstance from '../axios.ts';

export interface GetUserData {
  userImageUrl: string;
  email: string;
  nickname: string;
  birthDate: string;
  provider: string;
}
const getUser = async (): Promise<CommonResponse<GetUserData>> => {
  try {
    const response = await apiInstance.get('/api/v1/user');
    console.log('Sign up response:', response.data);

    if (response.data.success) {
      console.log('Sign up successful', response.data);
      return response.data;
    } else {
      // API 응답이 success=false인 경우
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
export default getUser;
