import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {showBlackToast} from 'src/Util';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../Image/FastImage.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosGetSocialAccountStatus} from '../../Axios/User/user.get.axios';
import styled from 'styled-components/native';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

export function GoogleLoginButton({
  loggingIn,
  setLoggingIn,
  onLoginSucceed,
  onSignupRequired,
}: {
  loggingIn: boolean;
  setLoggingIn: (status: boolean) => void;
  onLoginSucceed: () => void;
  onSignupRequired: (param: {email: string}) => void;
  style?: StyleProp<ViewStyle>;
}) {
  /** Handle Google Login */
  async function handleGoogleLogin() {
    try {
      // Google Sign-In
      const googleResponse = await GoogleSignin.signIn();

      if (!googleResponse) {
        return showBlackToast({
          text1: '구글 로그인에 실패했습니다. 다시 시도해주세요.',
        });
      }

      // Extract user profile
      const profile = googleResponse.data?.user;

      if (!profile || !profile.email) {
        return showBlackToast({
          text1: '구글 계정 정보를 가져올 수 없습니다. 다시 시도해주세요.',
        });
      }

      // Fetch accessToken and idToken
      const tokens = await GoogleSignin.getTokens();
      if (!tokens.accessToken) {
        return showBlackToast({
          text1: '구글 액세스 토큰을 가져올 수 없습니다.',
        });
      }

      // Fetch account status
      const googleAccountStatus = await axiosGetSocialAccountStatus({
        email: profile.email,
      });

      if (!googleAccountStatus) {
        return showBlackToast({text1: '구글 계정 조회에 실패했습니다.'});
      }

      // Handle different account statuses
      if (googleAccountStatus.accountStatus === 'LOGIN') {
        const loginResult = await useUserStore.getState().googleLogin({
          token: tokens.accessToken, // accessToken 전달
        });
        if (loginResult.success) {
          showBlackToast({text1: '구글 간편 로그인이 완료되었습니다.'});
          onLoginSucceed();
        } else {
          return showBlackToast({
            text1: '구글 로그인 정보를 가져오지 못했습니다.',
          });
        }
      } else if (googleAccountStatus.accountStatus === 'SIGNUP') {
        onSignupRequired({email: profile.email});
      } else if (googleAccountStatus.accountStatus === 'UNAVAILABLE') {
        return showBlackToast({text1: googleAccountStatus.errorMessage});
      }
    } catch (error) {
      console.log('Google Login Error:', error);
      return showBlackToast({
        text1:
          '구글 계정 연결에 실패했습니다. 잠시 후 다시 시도해주세요.\n문제가 지속되면 고객센터로 문의해 주세요.',
      });
    }
  }
  /** Attempt to Login */
  async function tryGoogleLogin() {
    setLoggingIn(true);
    await handleGoogleLogin();
    setLoggingIn(false);
  }

  return (
    <TouchableContainer onPress={tryGoogleLogin}>
      <FastImageContainer
        style={{
          width: moderateScale(40),
          height: moderateScale(40),
          marginHorizontal: moderateScale(5),
        }}
        source={require('src/Screen/Auth/Landing/Resource/login-google-button-circle.png')}
      />
    </TouchableContainer>
  );
}

const TouchableContainer = styled.TouchableOpacity<{pressed?: boolean}>`
  justify-content: center;
  align-items: center;
  opacity: ${({pressed}) => (pressed ? 0.8 : 1)};
`;
