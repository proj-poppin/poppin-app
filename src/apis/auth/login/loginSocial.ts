import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';

// 소셜 로그인 공통 함수
const loginSocial = async (type, token) => {
  try {
    const response = await axios.post(
      `${Config.API_URL}/api/v1/auth/login/${type}`,
      {}, // 요청 본문(Body). 여기서는 비어 있음
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Server response:', response.data);

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
