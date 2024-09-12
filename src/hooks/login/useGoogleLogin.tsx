import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import loginSocial from '../../apis/auth/loginSocial.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../redux/slices/user.ts';
import {useAppDispatch} from '../../redux/stores';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

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
  const navigation = useNavigation();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      const loginResult = await loginSocial('google', accessToken);
      if (loginResult.success && loginResult.data?.refreshToken) {
        const {accessToken, refreshToken} = loginResult.data;
        await setTokens({accessToken, refreshToken});
        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
        navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
      } else {
        if (
          loginResult.error?.code === '40024' ||
          loginResult.error?.code === '40026'
        ) {
          Alert.alert('안내', loginResult.error.message);
        } else {
          // 신규 유저라면 닉네임 입력 화면으로 이동
          setGoogleLoginStatus({newUser: true});
          const accessToken = loginResult.data!.accessToken;
          await EncryptedStorage.setItem('accessToken', accessToken);
          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
          dispatch(userSlice.actions.setAccessToken(accessToken));
        }
      }
    } catch (err) {}
  };

  return {signInWithGoogle, googleLoginStatus: googleLoginStatus};
};
