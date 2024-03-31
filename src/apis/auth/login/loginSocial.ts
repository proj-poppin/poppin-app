import EncryptedStorage from 'react-native-encrypted-storage';
import apiInstance from '../../axios.ts';

// 소셜 로그인 공통 함수
const loginSocial = async (type, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiInstance.post(
      `/api/v1/auth/login/${type}`,
      {},
      config,
    );

    if (response.data.success) {
      console.log(`${type} login success`);
      const {accessToken, refreshToken} = response.data.data;
      console.log('naver login accessToken:', accessToken);
      await EncryptedStorage.setItem('accessToken', accessToken);
      await EncryptedStorage.setItem('refreshToken', refreshToken);
      console.log('refreshToken: ', refreshToken);
      console.log('accessToken: ', accessToken);
    } else {
      throw new Error(`${type} login failed`);
    }
  } catch (error) {
    console.error(`${type} login error:`, error);
    throw error;
  }
};

export default loginSocial;
