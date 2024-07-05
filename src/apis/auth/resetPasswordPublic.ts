import Config from 'react-native-config';
import axios from 'axios';

// 비로그인시 비밀번호 재설정을 시도하는 함수
const resetPasswordPublic = async (
  email: string,
  password: string,
  passwordConfirm: string,
) => {
  try {
    const response = await axios.post(
      `${Config.API_URL}/api/v1/auth/reset-password/no-auth`,
      {
        email,
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

export default resetPasswordPublic;
