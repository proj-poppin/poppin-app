import Config from 'react-native-config';
import axios from 'axios';

interface AuthCodeResponseData {
  authCode: string;
}

// 이메일 인증 코드 요청 함수
const emailVerification = async (
  email: string,
): Promise<CommonResponse<AuthCodeResponseData>> => {
  try {
    const response = await axios.post<CommonResponse<AuthCodeResponseData>>(
      `${Config.API_URL}/api/v1/auth/email/verification`,
      {email},
    );

    if (response.data.success && response.data.data) {
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
    return {
      success: false,
      data: {authCode: ''},
      error: {code: 'Network', message: 'Network error'},
    };
  }
};

export default emailVerification;
