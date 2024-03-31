import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import loginSocial from '../apis/auth/login/loginSocial.ts';
import {getAccessToken} from '@react-native-seoul/kakao-login';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const useGoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      console.log('fuck');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.getTokens().then(getAccessToken);
      console.log('Google login userInfo:', userInfo);
      setUserInfo(userInfo.accessToken);

      console.log('Google login userInfo:', userInfo);
      await loginSocial('google', userInfo.accessToken);
    } catch (err) {
      console.error('Failed to login with Google:', err);
    }
  };

  return {signInWithGoogle, userInfo, error};
};
