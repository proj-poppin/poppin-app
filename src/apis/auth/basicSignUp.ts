import axios from 'axios';
import Config from 'react-native-config';

interface SignUpErrorFields {
  [key: string]: string;
}

interface SignUpError {
  code: string;
  message: string;
  errorFields?: SignUpErrorFields;
}

interface SignUpResponseData {
  accessToken: string;
  refreshToken: string;
}

interface SignUpResponse {
  success: boolean;
  data?: SignUpResponseData;
  error?: SignUpError;
}

const basicSignUp = async (
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string,
  birthDate: string,
  agreedToPrivacyPolicy: boolean,
  agreedToServiceTerms: boolean,
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<
      CommonResponse<{accessToken: string; refreshToken: string}>
    >(`${Config.API_URL}/api/v1/auth/sign-up`, {
      email,
      password,
      passwordConfirm,
      nickname,
      birthDate,
      agreedToPrivacyPolicy,
      agreedToServiceTerms,
    });

    return response.data;
  } catch (error) {
    console.log('Network error:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default basicSignUp;
