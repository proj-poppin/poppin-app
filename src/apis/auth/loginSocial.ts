import Config from 'react-native-config';
import axios from 'axios';
import {LoginResponseData} from './basicLogin.ts';

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
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log(`${type} login error:`, error);
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
