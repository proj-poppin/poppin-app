import Config from 'react-native-config';
import axios from 'axios';
import {LoginResponseData} from './basicLogin.ts';

// 소셜 로그인 공통 함수
const loginSocial = async (
  type: string,
  token: string,
): Promise<CommonResponse<LoginResponseData>> => {
  try {
    const response = await axios.post<CommonResponse<LoginResponseData>>(
      `${Config.API_URL}/api/v1/auth/login/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Server response:', response.data);

    if (response.data.success) {
      console.log(`${type} login success`);

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
    console.log(`${type} login error:`, error);
    // 네트워크 에러 또는 기타 예외 처리
    return {
      success: false,
      error: {
        code: 'NetworkError',
        message: 'Network error occurred',
      },
    };
  }
};

export default loginSocial;
