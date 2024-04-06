import axios from 'axios';
import Config from 'react-native-config';
import {LoginResponseData} from './basicLogin.ts';

const basicSignUp = async (
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string,
  birthDate: string,
  agreedToPrivacyPolicy: boolean,
  agreedToServiceTerms: boolean,
): Promise<CommonResponse<LoginResponseData>> => {
  try {
    const response = await axios.post<CommonResponse<LoginResponseData>>(
      `${Config.API_URL}/api/v1/auth/sign-up`,
      {
        email,
        password,
        passwordConfirm,
        nickname,
        birthDate,
        agreedToPrivacyPolicy,
        agreedToServiceTerms,
      },
    );

    console.log('Sign up response:', response.data);

    if (response.data.success) {
      console.log('Sign up successful', response.data);
      return response.data;
    } else {
      return {
        success: false,
        data: null,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.error('Email verification error:', error);
    return {
      success: false,
      data: null,
      error: {code: 'Network', message: 'Network error'},
    };
  }
};

export default basicSignUp;
