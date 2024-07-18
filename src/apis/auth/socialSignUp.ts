import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

// 회원가입을 시도하는 함수
const socialSignUp = async (provider: string, nickname: string) => {
  try {
    const response = await nonPublicApiInstance.post('/api/v1/auth/register', {
      provider,
      nickname,
    });

    // 성공적으로 회원가입 처리된 경우, 응답 데이터 반환
    if (response.data.success) {
      console.log('Social Sign up successful', response.data);
      return response.data; // 응답 데이터 반환
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    // HTTP 에러 처리
    console.log('socialSignUp error:', error);
    throw error;
  }
};

export default socialSignUp;
