import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FullViewPage} from 'src/Component/Page';
import {ScreenHeader} from 'src/Component/View';
import AppLogoIcon from 'src/Resource/svg/app-logo-p-icon.svg';
import {SectionContainer} from 'src/Unit/View';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import BasicLoginIcon from 'src/Screen/Auth/Landing/Resource/login-basic-button-row-temp.svg';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {DetailText} from 'src/StyledComponents/Text';
import {themeColors} from 'src/Theme/theme';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {BodyMediumText} from '../../../StyledComponents/Text/bodyMedium.component';
import RoundRightIcon from 'src/Resource/svg/right-arrow-circle-icon.svg';
import TermsAndPrivacyPolicyAgreement from 'src/Component/PressableUnderlineText';
import {AppleLoginButton} from 'src/Component/Button/AppleLoginButton';
import {KakaoLoginButton} from '../../../Component/Button/KakaoLoginButton';
import {TouchableOpacity} from 'react-native';
import LoginBasicLetterIcon from 'src/Screen/Auth/Landing/Resource/login-basic-letter-icon.svg';
import CommonCompleteButton from '../../Popup/Landing/common.complete.button';
import Svg, {SvgProps} from 'react-native-svg';

type BasicLoginButtonProps = {
  onPressLogin: () => void;
};

const BasicLoginButton = ({onPressLogin}: BasicLoginButtonProps) => (
  <TouchableOpacity onPress={onPressLogin}>
    <BasicLoginIcon style={{marginTop: moderateScale(20)}} />
  </TouchableOpacity>
);

export type AuthLandingScreenProps = {
  popWhenCanceled?: number;
  popWhenSucceed?: number;
};

export function AuthLandingScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'AuthLandingScreen'>) {
  const [kakaoLoggingIn, setKakaoLoggingIn] = useState<boolean>(false);

  function onLoginSucceed() {
    navigation.replace('LandingBottomTabNavigator', {
      HomeLandingScreen: {},
      PopupLandingScreen: {},
      PopupLikesLandingScreen: {},
      MyPageLandingScreen: {},
    });
  }

  function onPressLogin() {
    if (kakaoLoggingIn) {
      console.log('Already logging in, returning.');
      return;
    }

    console.log('Navigating to LoginScreen...');
    const popWhenSucceed = route.params?.popWhenSucceed ?? 0;
    navigation.navigate('LoginScreen', {
      popWhenSucceed: popWhenSucceed + 1,
    });
  }

  function onPressSignup() {
    navigation.navigate('SignupScreen', {
      initialSignupState: {
        step: 'EMAIL',
      },
      // popWhenCanceled: route.params.popWhenCanceled
      //   ? route.params.popWhenCanceled + 1
      //   : 2,
      // popWhenSucceed: route.params.popWhenSucceed
      //   ? route.params.popWhenSucceed + 1
      //   : 2,
    });
  }

  function onKakaoSignupRequired(param: {email: string}) {
    navigation.navigate('SignupScreen', {
      initialSignupState: {
        step: 'NICKNAME',
        accountType: 'KAKAO',
        email: param.email,
      },
      popWhenCanceled: route.params.popWhenCanceled
        ? route.params.popWhenCanceled + 1
        : 2,
      popWhenSucceed: route.params.popWhenSucceed
        ? route.params.popWhenSucceed + 1
        : 2,
    });
  }

  const onAppleSignUpRequired = async (param: {
    email: string;
    appleUserId: string;
  }) => {
    navigation.navigate('SignupScreen', {
      initialSignupState: {
        step: 'NICKNAME',
        accountType: 'APPLE',
        email: param.email,
        appleUserId: param.appleUserId,
      },
      popWhenCanceled: route.params.popWhenCanceled
        ? route.params.popWhenCanceled + 1
        : 2,
      popWhenSucceed: route.params.popWhenSucceed
        ? route.params.popWhenSucceed + 1
        : 2,
    });
  };

  return (
    <FullViewPage
      PageContent={
        <>
          <ScreenHeader
            LeftComponents="CLOSE_BUTTON"
            leftText="비회원으로 보기"
          />
          <SectionContainer
            style={{
              marginTop: 30,
              justifyContent: 'flex-start',
              paddingBottom: moderateScale(64),
            }}>
            <AppLogoIcon />
            <TitleText>내 취향을 기반으로</TitleText>
            <TitleText>팝업스토어를 관리하고 저장해요</TitleText>
            <LoginButtonsContainer>
              <AppleLoginButton
                isSignIn={false}
                onSignupRequired={onAppleSignUpRequired}
                onLoginSucceed={onLoginSucceed}
              />
              <CommonCompleteButton
                title="이메일로 로그인"
                onPress={onPressLogin}
                style={{marginTop: 20, width: '95%'}}
                textStyle={{fontSize: 18, fontWeight: 'bold'}}
                extraIcon={LoginBasicLetterIcon}
              />
            </LoginButtonsContainer>
            <TouchableOpacity onPress={onPressSignup}>
              <SignupMotivateContainer>
                <SignupMotivateText>
                  아직 POPPIN 회원이 아니신가요?
                </SignupMotivateText>
                <RoundRightIcon style={{marginLeft: 8}} />
              </SignupMotivateContainer>
            </TouchableOpacity>
          </SectionContainer>
          <SectionContainer
            style={{
              alignItems: 'center',
              paddingBottom: moderateScale(64),
            }}>
            <BottomText style={{marginTop: moderateScale(110)}}>
              다른 방법으로 로그인하기
            </BottomText>
            <RowIconsContainer style={{paddingBottom: moderateScale(24)}}>
              <TouchableIconContainer
                onPress={() => console.log('Naver login pressed')}>
                <FastImageContainer
                  style={{
                    width: moderateScale(40),
                    height: moderateScale(40),
                    marginHorizontal: moderateScale(5),
                  }}
                  source={require('./Resource/login-naver-button-circle.png')}
                />
              </TouchableIconContainer>
              <TouchableIconContainer
                onPress={() => console.log('Google login pressed')}>
                <FastImageContainer
                  style={{
                    width: moderateScale(40),
                    height: moderateScale(40),
                    marginHorizontal: moderateScale(5),
                  }}
                  source={require('./Resource/login-google-button-circle.png')}
                />
              </TouchableIconContainer>
              <TouchableIconContainer
                onPress={() => console.log('kakao login pressed')}>
                <KakaoLoginButton
                  loggingIn={kakaoLoggingIn}
                  setLoggingIn={setKakaoLoggingIn}
                  onLoginSucceed={onLoginSucceed}
                  onSignupRequired={onKakaoSignupRequired}
                />
              </TouchableIconContainer>
            </RowIconsContainer>
            <TermsAndPrivacyPolicyAgreement
              onPrivacyPolicyPress={() => {}}
              onTermsOfServicePress={() => {}}
            />
          </SectionContainer>
        </>
      }
    />
  );
}
const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
`;

const BottomText = styled(DetailText)`
  color: #333333;
  font-weight: 700;
  margin-top: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(12)}px;
`;

const RowIconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SignupMotivateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: ${moderateScale(5)}px;
  margin-top: ${moderateScale(32)}px;
`;

const SignupMotivateText = styled(BodyMediumText)`
  color: ${themeColors().grey.main};
  font-weight: 400;
`;

const LoginButtonsContainer = styled.View`
  margin-top: ${moderateScale(54)}px;
  align-items: center;
`;
const TouchableIconContainer = styled(TouchableOpacity)`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  margin-horizontal: ${moderateScale(5)}px;
  justify-content: center;
  align-items: center;
`;
