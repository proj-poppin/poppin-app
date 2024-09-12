import EncryptedStorage from 'react-native-encrypted-storage';
import {btoa} from 'react-native-quick-base64';
import axios from 'axios';
import Config from 'react-native-config';

// 로그인 응답 타입 정의
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

const basicLogin = async (
  email: string,
  password: string,
): Promise<CommonResponse<LoginResponseData>> => {
  const basicAuthString = btoa(`${email}:${password}`);

  try {
    const response = await axios.post<CommonResponse<LoginResponseData>>(
      `${Config.API_URL}/api/v1/auth/sign-in`,
      {},
      {
        headers: {
          Authorization: `Basic ${basicAuthString}`,
        },
      },
    );
    if (response.data.success) {
      const {accessToken, refreshToken} = response.data.data!;
      await EncryptedStorage.setItem('refreshToken', refreshToken);
      await EncryptedStorage.setItem('accessToken', accessToken);
      // 전체 응답 객체를 반환
      return response.data;
    } else {
      // API 응답이 success=false인 경우
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};

export default basicLogin;
