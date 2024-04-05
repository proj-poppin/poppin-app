import {useState} from 'react';
import Config from 'react-native-config';
import {useAppDispatch} from '../redux/stores';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../redux/slices/user.ts';
import NaverLogin from '@react-native-seoul/naver-login';
import loginSocial from '../apis/auth/loginSocial.ts';

const consumerKey = Config.NAVER_CONSUMER_KEY ?? '';
const consumerSecret = Config.NAVER_SECRECT_KEY ?? '';
const appName = '팝핀';
const serviceUrlScheme = Config.NAVER_URL;

export const useNaverLogin = () => {
  const dispatch = useAppDispatch();
  const [naverLoginStatus, setNaverLoginStatus] = useState({
    newUser: false,
  });
  const signInWithNaver = async () => {
    try {
      const {failureResponse, successResponse} = await NaverLogin.login({
        appName,
        consumerKey,
        consumerSecret,
        serviceUrlScheme,
      });

      console.log('successResponse', successResponse);
      console.log('failureResponse', failureResponse);

      if (successResponse) {
        const loginResult = await loginSocial(
          'naver',
          successResponse.accessToken,
        );
        console.log('Naver loginResult:', loginResult);

        if (loginResult.success && loginResult.data?.refreshToken) {
          const {accessToken, refreshToken} = loginResult.data;
          await EncryptedStorage.setItem('accessToken', accessToken);
          await EncryptedStorage.setItem('refreshToken', refreshToken);
          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
          dispatch(userSlice.actions.setAccessToken(accessToken));
        } else {
          // 신규 유저라면 닉네입 입력 화면으로 이동
          setNaverLoginStatus({newUser: true});
          const accessToken = loginResult.data!.accessToken;
          console.log('naya');
          await EncryptedStorage.setItem('accessToken', accessToken);
          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
          dispatch(userSlice.actions.setAccessToken(accessToken));
        }
      } else if (failureResponse) {
        throw new Error('Naver login failed.');
      }
    } catch (error: any) {
      console.error('Failed to login with Naver:', error);
    }
  };

  return {signInWithNaver: signInWithNaver, naverLoginStatus: naverLoginStatus};
};
