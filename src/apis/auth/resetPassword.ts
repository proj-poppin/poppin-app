import axios from '../axios.ts';
import Config from 'react-native-config';

// 회원가입을 시도하는 함수
const resetPassword = async (password: string, passwordConfirm: string) => {
  try {
    const response = await axios.put(
      `${Config.API_URL}/api/v1/auth/reset-password`,
      {
        password,
        passwordConfirm,
      },
    );
    if (response.data.success) {
      console.log('Sign up successful', response.data);
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

export default resetPassword;
