import Config from 'react-native-config';
import axios from 'axios';

interface PasswordAuthCodeResponseData {
  authCode: string;
}

// 이메일 인증 코드 요청 함수
const passwordEmailVerification = async (
  email: string,
): Promise<CommonResponse<PasswordAuthCodeResponseData>> => {
  try {
    const response = await axios.post<
      CommonResponse<PasswordAuthCodeResponseData>
    >(`${Config.API_URL}/api/v1/auth/email/verification/password`, {email});

    console.log('Server response:', response.data);

    if (response.data.success && response.data.data) {
      console.log(
        `Email verification success, AuthCode: ${response.data.data.authCode}`,
      );
      return {
        success: true,
        data: {authCode: response.data.data.authCode},
      };
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

export default passwordEmailVerification;
