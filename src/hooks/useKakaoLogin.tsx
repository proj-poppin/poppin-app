import {useState} from 'react';
import {getAccessToken} from '@react-native-seoul/kakao-login';
import loginSocial from '../apis/auth/login/loginSocial.ts';

export const useKakaoLogin = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const signInWithKakao = async () => {
    try {
      const tokenResult = await getAccessToken();
      console.log('Kakao login tokenResult:', tokenResult);
      console.log('Kakao login accessToken:', tokenResult.accessToken);
      setToken(tokenResult);

      // 카카오 로그인 후 서버에 인증 정보 보내기
      await loginSocial('kakao', tokenResult.accessToken);
    } catch (err) {
      console.error('Failed to login with Kakao:', err);
      setError(err.message);
    }
  };

  return {signInWithKakao, token, error};
};
