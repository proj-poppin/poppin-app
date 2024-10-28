import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {showBlackToast} from 'src/Util';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../Image/FastImage.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosGetKakaoAccountStatus} from '../../Axios/User/user.get.axios';
import {login, getProfile, KakaoProfile} from '@react-native-seoul/kakao-login';
import styled from 'styled-components/native';

export function KakaoLoginButton({
  loggingIn,
  setLoggingIn,
  onLoginSucceed,
  onSignupRequired,
  style,
}: {
  loggingIn: boolean;
  setLoggingIn: (status: boolean) => void;
  onLoginSucceed: () => void;
  onSignupRequired: (param: {email: string}) => void;
  style?: StyleProp<ViewStyle>;
}) {
  /** Handle Kakao Login */
  async function handleKakaoLogin() {
    let profile: KakaoProfile | undefined = undefined;
    try {
      await login();
      profile = await getProfile();
    } catch (error) {
      return showBlackToast({
        text1:
          '카카오톡 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }

    if (!profile) {
      return showBlackToast({
        text1:
          '카카오톡 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }

    const kakaoAccountStatus = await axiosGetKakaoAccountStatus({
      email: profile.email,
    });

    if (kakaoAccountStatus === null) {
      return showBlackToast({text1: '카카오톡 계정 조회에 실패했습니다.'});
    } else if (kakaoAccountStatus.action === 'LOGIN') {
      //* Existing Kakao login account
      const loginResult = await useUserStore.getState().kakaoLogin({
        email: profile.email,
      });
      if (loginResult.success) {
        showBlackToast({text1: '카카오 간편 로그인 되었습니다.'});
        onLoginSucceed();
      } else {
        return showBlackToast({
          text1: '카카오톡 로그인 정보를 가져오지 못했습니다.',
        });
      }
    } else if (kakaoAccountStatus.action === 'SIGNUP') {
      onSignupRequired({email: profile.email});
    } else if (kakaoAccountStatus.action === 'UNAVAILABLE') {
      showBlackToast({text1: kakaoAccountStatus.errorMessage});
    }
  }

  /** Attempt to Login */
  async function tryKakaoLogin() {
    setLoggingIn(true);
    await handleKakaoLogin();
    setLoggingIn(false);
  }

  return (
    <TouchableContainer onPress={tryKakaoLogin} style={style}>
      {loggingIn ? (
        <ActivityIndicator color="yellow" />
      ) : (
        <FastImageContainer
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            marginHorizontal: moderateScale(5),
          }}
          source={require('src/Screen/Auth/Landing/Resource/login-kakao-button-circle.png')}
        />
      )}
    </TouchableContainer>
  );
}

const TouchableContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  opacity: ${({pressed}) => (pressed ? 0.8 : 1)};
`;
