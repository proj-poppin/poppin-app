import EncryptedStorage from 'react-native-encrypted-storage';
import apiInstance from '../axios.ts';

// 로그아웃 처리 함수
const logout = async () => {
  try {
    // 서버에 로그아웃 요청을 보냄
    const response = await apiInstance.post('/api/v1/auth/sign-out');

    // 서버 응답 확인
    if (response.data.success) {
      console.log('Logout successful');
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    // HTTP 에러 처리
    console.error('Logout error:', error);
  }
};

export default logout;
