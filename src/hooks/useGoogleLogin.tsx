import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import loginSocial from '../apis/auth/loginSocial.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../redux/slices/user.ts';
import {useAppDispatch} from '../redux/stores';
import useSetAccessTokenAndRefreshToken from './useSetAccessTokenAndRefreshToken.ts';

// Google 로그인을 위한 커스텀 훅 설정
GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const useGoogleLogin = () => {
  const dispatch = useAppDispatch();
  const [googleLoginStatus, setGoogleLoginStatus] = useState({
    newUser: false,
  });
  const setTokens = useSetAccessTokenAndRefreshToken();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Google Play 서비스 사용 가능 여부 확인
      const {user} = await GoogleSignin.signIn(); // Google 로그인
      console.log('Google login user:', user);

      const {accessToken} = await GoogleSignin.getTokens(); // 액세스 토큰 받아오기
      console.log('Google login accessToken:', accessToken);

      // 서버에 로그인 정보 전송
      const loginResult = await loginSocial('google', accessToken);
      console.log('Google login loginResult:', loginResult);

      // 기존 유저라면 로그인, 신규 유저라면 닉네임 입력 화면으로 이동
      if (loginResult.success && loginResult.data?.refreshToken) {
        const {accessToken, refreshToken} = loginResult.data;
        // await EncryptedStorage.setItem('refreshToken', refreshToken);
        // await EncryptedStorage.setItem('accessToken', accessToken);
        await setTokens({accessToken, refreshToken});

        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
        // dispatch(userSlice.actions.setAccessToken(accessToken));
      } else {
        // 신규 유저라면 닉네입 입력 화면으로 이동
        setGoogleLoginStatus({newUser: true});
        const accessToken = loginResult.data!.accessToken;
        console.log('naya');
        // TODO 이 부분은 왜 accessToken만 있는지 확인 필요
        await EncryptedStorage.setItem('accessToken', accessToken);
        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
        dispatch(userSlice.actions.setAccessToken(accessToken));
      }
    } catch (err) {
      console.log('Failed to login with Google:', err);
    }
  };

  return {signInWithGoogle, googleLoginStatus: googleLoginStatus};
};
