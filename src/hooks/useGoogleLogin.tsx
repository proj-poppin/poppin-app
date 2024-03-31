import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import loginSocial from '../apis/auth/login/loginSocial.ts';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true, // 오프라인 액세스를 위한 구성
});

export const useGoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Google Play 서비스 사용 가능 여부 확인
      const {user} = await GoogleSignin.signIn(); // Google 로그인
      console.log('Google login user:', user);
      setUserInfo(user); // 사용자 정보 상태 업데이트

      const {accessToken} = await GoogleSignin.getTokens(); // 액세스 토큰 받아오기
      console.log('Google login accessToken:', accessToken);
      await loginSocial('google', accessToken); // 서버에 로그인 정보 전송
    } catch (err) {
      console.error('Failed to login with Google:', err);
      setError(err.toString()); // 에러 상태 업데이트
    }
  };

  return {signInWithGoogle, userInfo, error};
};
