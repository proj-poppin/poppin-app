import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

export interface GetUserData {
  userImageUrl: string;
  email: string;
  nickname: string;
  birthDate: string;
  provider: string;
}
const getUser = async (): Promise<CommonResponse<GetUserData>> => {
  try {
    const response = await nonPublicApiInstance.get('/api/v1/user');
    console.log("ㄱㄷ네ㅐㅜㄴ",response)
    if (response.data.success) {
      return response.data;
    } else {
      // API 응답이 success=false인 경우
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    // 네트워크 에러 또는 기타 예외 처리
    return {
      success: false,
      data: undefined,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};
export default getUser;
