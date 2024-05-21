import EncryptedStorage from 'react-native-encrypted-storage';
import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

// 로그아웃 처리 함수
const logout = async () => {
  try {
    // 서버에 로그아웃 요청을 보냄
    const response = await nonPublicApiInstance.post('/api/v1/auth/sign-out');

    // 서버 응답 확인
    if (response.data.success) {
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return {success: true, error: null};
    }
  } catch (error) {
    // HTTP 에러 처리
    return {success: false, error: null};
  }
};

export default logout;
