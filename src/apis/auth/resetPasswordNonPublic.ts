import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

// 로그인시 비밀번호 재설정을 시도하는 함수
const resetPasswordNonPublic = async (
  password: string,
  passwordConfirm: string,
) => {
  try {
    const response = await nonPublicApiInstance.put(
      '/api/v1/auth/reset-password',
      {
        password,
        passwordConfirm,
      },
    );
    if (response.data.success) {
      console.log('resetpassword successful', response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Email verification error:', error);
    return {
      success: false,
      error: {code: 'Network', message: 'Network error'},
    };
  }
};

export default resetPasswordNonPublic;
