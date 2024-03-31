import {useState} from 'react';
import appleAuth from '@invertase/react-native-apple-authentication';
import {Alert, Platform} from 'react-native';
import loginSocial from '../apis/auth/login/loginSocial';

export const useAppleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const signInWithApple = async () => {
    // Android 기기에서의 접근 방지
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

      // 인증 상태 확인
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // 사용자가 인증된 경우
        setUserInfo(appleAuthRequestResponse);

        console.log('appleAuthRequestResponse:', appleAuthRequestResponse);

        // 서버에 인증 정보 보내기
        // Apple 로그인에서는 identityToken 또는 authorizationCode 중 하나를 사용
        const identityToken = appleAuthRequestResponse.identityToken;
        if (identityToken) {
          await loginSocial('apple', identityToken);
        } else {
          throw new Error("Apple login didn't provide an identityToken.");
        }
      } else {
        // 사용자가 인증되지 않은 경우
        setError('User is not authenticated.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {signInWithApple, userInfo, error};
};
