import {useState} from 'react';
import appleAuth from '@invertase/react-native-apple-authentication';
import {Alert, Platform} from 'react-native';
import loginSocial from '../../apis/auth/loginSocial.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../redux/slices/user.ts';
import {useAppDispatch} from '../../redux/stores';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';
import {useNavigation} from '@react-navigation/native';

export const useAppleLogin = () => {
  const dispatch = useAppDispatch();
  const [appleLoginStatus, setAppleLoginStatus] = useState({
    newUser: false,
  });
  const setTokens = useSetAccessTokenAndRefreshToken();
  const navigation = useNavigation();
  const signInWithApple = async () => {
    // Android 기기에서의 사용을 방지
    if (Platform.OS === 'android') {
      Alert.alert('안내', 'iOS 기기에서만 사용 가능합니다.');
      return;
    }

    try {
      // Apple 로그인 요청 수행
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // 사용자의 credential 상태 확인
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // 인증 상태가 AUTHORIZED인 경우
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken} = appleAuthRequestResponse;
        if (identityToken) {
          const loginResult = await loginSocial('apple', identityToken);

          if (loginResult.success && loginResult.data?.refreshToken) {
            const {accessToken, refreshToken} = loginResult.data;
            await setTokens({accessToken, refreshToken});
            dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
            navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
          } else {
            if (
              loginResult.error?.code === '40026' ||
              loginResult.error?.code === '40024'
            ) {
              Alert.alert('안내', loginResult.error.message);
            } else {
              // 신규 유저라면 닉네임 입력 화면으로 이동
              setAppleLoginStatus({newUser: true});
              const accessToken = loginResult.data!.accessToken;
              await EncryptedStorage.setItem('accessToken', accessToken);
              dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
              dispatch(userSlice.actions.setAccessToken(accessToken));
            }
          }
        } else {
          throw new Error("Apple login didn't provide an identityToken.");
        }
      } else {
      }
    } catch (err) {}
  };

  return {signInWithApple, appleLoginStatus: appleLoginStatus};
};
