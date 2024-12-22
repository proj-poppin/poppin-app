import React, {useState} from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {showBlackToast} from 'src/Util';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../Image/FastImage.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosGetSocialAccountStatus} from '../../Axios/User/user.get.axios';
import styled from 'styled-components/native';
import NaverLogin, {
  GetProfileResponse,
  NaverLoginResponse,
} from '@react-native-seoul/naver-login';

export function NaverLoginButton({
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
  const [success, setSuccessResponse] =
    useState<NaverLoginResponse['successResponse']>();

  const [failure, setFailureResponse] =
    useState<NaverLoginResponse['failureResponse']>();
  const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();
  /** Handle Naver Login */
  async function handleNaverLogin() {
    let profile: GetProfileResponse | undefined;
    let naverResponse: NaverLoginResponse | undefined;
    let naverAccessToken: string | undefined;
    try {
      naverResponse = await NaverLogin.login();
      naverAccessToken = naverResponse.successResponse!.accessToken;
      profile = await NaverLogin.getProfile(
        naverResponse.successResponse!.accessToken,
      );
    } catch (error) {
      return showBlackToast({
        text1:
          '네이버 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }
    if (!profile) {
      return showBlackToast({
        text1:
          '네이버 계정 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터로 문의해 주세요.',
      });
    }

    const naverAccountStatus = await axiosGetSocialAccountStatus({
      email: profile.response.email,
    });

    console.log('debug naverAccountStatus:', naverAccountStatus);

    if (naverAccountStatus === null) {
      return showBlackToast({text1: '네이버 계정 조회에 실패했습니다.'});
    } else if (naverAccountStatus.accountStatus === 'LOGIN') {
      console.log(
        `naveraccessToken: ${naverResponse.successResponse!.accessToken}`,
      );
      //* 1) 네이버 간편 로그인을 진행했던 경우
      const loginResult = await useUserStore.getState().naverLogin({
        token: naverAccessToken,
      });
      console.log('naverAccessToken: ', naverAccessToken);
      if (loginResult.success) {
        showBlackToast({text1: '네이버 간편 로그인 되었습니다.'});
        onLoginSucceed();
      } else {
        console.log('SibaL loginResult:', loginResult);
        return showBlackToast({
          text1: '네이버 로그인 정보를 가져오지 못했습니다.',
        });
      }
    } else if (naverAccountStatus.accountStatus === 'SIGNUP') {
      //* 2) 네이버 간편 회원가입을 진행했던 경우
      onSignupRequired({email: profile.response.email});
    } else if (naverAccountStatus.accountStatus === 'UNAVAILABLE') {
      console.log('SibaL naverAccountStatus.errorMessage:', naverAccountStatus);
      //* 3) 네이버 계정 이메일로 이미 이메일 회원가입을 진행했던 경우
      return showBlackToast({text1: naverAccountStatus.errorMessage});
    } else {
      return showBlackToast({text1: '네이버 계정 조회에 실패했습니다.'});
    }
  }

  /** Attempt to Login */
  async function tryNaverLogin() {
    setLoggingIn(true);
    const result = await handleNaverLogin();
    setLoggingIn(false);
    return result;
  }

  return (
    <TouchableContainer onPress={tryNaverLogin}>
      <FastImageContainer
        style={{
          width: moderateScale(40),
          height: moderateScale(40),
          marginHorizontal: moderateScale(5),
        }}
        source={require('src/Screen/Auth/Landing/Resource/login-naver-button-circle.png')}
      />
    </TouchableContainer>
    // <TouchableContainer onPress={tryNaverLogin}>
    //   {loggingIn ? (
    //     <ActivityIndicator color="yellow" />
    //   ) : (
    //     <FastImageContainer
    //       style={{
    //         width: moderateScale(40),
    //         height: moderateScale(40),
    //         marginHorizontal: moderateScale(5),
    //       }}
    //       source={require('src/Screen/Auth/Landing/Resource/login-naver-button-circle.png')}
    //     />
    //   )}
    // </TouchableContainer>
  );
}

const TouchableContainer = styled.TouchableOpacity<{pressed?: boolean}>`
  justify-content: center;
  align-items: center;
  opacity: ${({pressed}) => (pressed ? 0.8 : 1)};
`;
