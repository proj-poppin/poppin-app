import {useState} from 'react';
import {getAccessToken, login} from '@react-native-seoul/kakao-login';
import loginSocial from '../../apis/auth/loginSocial.ts';
import {useAppDispatch} from '../../redux/stores';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../redux/slices/user.ts';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

// useKakaoLogin 커스텀 훅 수정
export const useKakaoLogin = () => {
  const [kakaoLoginStatus, setKakaoLoginStatus] = useState({
    newUser: false,
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const setTokens = useSetAccessTokenAndRefreshToken(); // 커스텀 훅 호출

  const signInWithKakao = async () => {
    try {
      const tokenResult = await login();
      const loginResult = await loginSocial('kakao', tokenResult.accessToken);

      // 기존 유저라면 로그인
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
          // 신규 유저라면 닉네입 입력 화면으로 이동
          setKakaoLoginStatus({newUser: true});
          const accessToken = loginResult.data!.accessToken;
          await EncryptedStorage.setItem('accessToken', accessToken);
          dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
          dispatch(userSlice.actions.setAccessToken(accessToken));
        }
      }
    } catch (err) {}
  };

  return {signInWithKakao, kakaoLoginStatus: kakaoLoginStatus};
};
