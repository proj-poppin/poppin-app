import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {showBlackToast} from 'src/Util';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../Image/FastImage.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosGetSocialAccountStatus} from '../../Axios/User/user.get.axios';
import styled from 'styled-components/native';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {GetTokensResponse} from '@react-native-google-signin/google-signin/src/types';
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
  /** Handle Kakao Login */
  async function handleGoogleLogin() {
    let profile: User | null;
    let googleResponse: GetTokensResponse | undefined;
    try {
      googleResponse = await GoogleSignin.signIn();
      profile = await GoogleSignin.getCurrentUser();
    } catch (error) {
      console.log('Kakao Login Error!:', error);
      return showBlackToast({
        text1:
          '구글 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }
    if (!profile) {
      return showBlackToast({
        text1:
          '구글 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }

    const kakaoAccountStatus = await axiosGetSocialAccountStatus({
      email: profile.user.email,
    });

    console.log('debug kakaoAccountStatus: ', kakaoAccountStatus);

    if (kakaoAccountStatus === null) {
      return showBlackToast({text1: '카카오톡 계정 조회에 실패했습니다.'});
    } else if (kakaoAccountStatus.accountStatus === 'LOGIN') {
      console.log(`kakaoaccessToken: ${googleResponse?.accessToken}`);
      //* 1) 카카오톡 간편 로그인을 진행했던 경우
      const loginResult = await useUserStore.getState().kakaoLogin({
        token: googleResponse?.accessToken!,
      });
      if (loginResult.success) {
        showBlackToast({text1: '카카오 간편 로그인 되었습니다.'});
        onLoginSucceed();
      } else {
        return showBlackToast({
          text1: '카카오톡 로그인 정보를 가져오지 못했습니다.',
        });
      }
    } else if (kakaoAccountStatus.accountStatus === 'SIGNUP') {
      //* 2) 카카오톡 간편 회원가입을 진행했던 경우
      onSignupRequired({email: profile.user.email});
    } else if (kakaoAccountStatus.accountStatus === 'UNAVAILABLE') {
      //* 3) 카카오톡 계정 이메일로 이미 이메일 회원가입을 진행했던 경우
      return showBlackToast({text1: kakaoAccountStatus.errorMessage});
    }
  }

  /** Attempt to Login */
  async function tryGoogleLogin() {
    setLoggingIn(true);
    const result = await handleGoogleLogin();
    setLoggingIn(false);
    return result;
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
