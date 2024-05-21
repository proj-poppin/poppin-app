import {useState} from 'react';
import Config from 'react-native-config';
import {useAppDispatch} from '../../redux/stores';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../redux/slices/user.ts';
import NaverLogin from '@react-native-seoul/naver-login';
import loginSocial from '../../apis/auth/loginSocial.ts';
import {useNavigation} from '@react-navigation/native';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';

const consumerKey = Config.NAVER_CONSUMER_KEY ?? '';
const consumerSecret = Config.NAVER_SECRECT_KEY ?? '';
const appName = '팝핀';
const serviceUrlScheme = Config.NAVER_URL;

export const useNaverLogin = () => {
  const [naverLoginStatus, setNaverLoginStatus] = useState({
    newUser: false,
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const setTokens = useSetAccessTokenAndRefreshToken();

  const signInWithNaver = async () => {
    try {
      const {failureResponse, successResponse} = await NaverLogin.login({
        appName,
        consumerKey,
        consumerSecret,
        serviceUrlScheme,
      });

      if (successResponse) {
        const loginResult = await loginSocial(
          'naver',
          successResponse.accessToken,
        );

        if (loginResult.success && loginResult.data?.refreshToken) {
          const {accessToken, refreshToken} = loginResult.data;
          await setTokens({accessToken, refreshToken});

          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
          navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
        } else {
          // 신규 유저라면 닉네입 입력 화면으로 이동
          setNaverLoginStatus({newUser: true});
          const accessToken = loginResult.data!.accessToken;
          await EncryptedStorage.setItem('accessToken', accessToken);
          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
          dispatch(userSlice.actions.setAccessToken(accessToken));
        }
      }
    } catch (err) {
      console.log('Failed to login with Kakao:', err);
    }
  };

  return {signInWithNaver: signInWithNaver, naverLoginStatus: naverLoginStatus};
};
