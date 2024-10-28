// LoginScreen.tsx
import React from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {FullViewPage} from '../../../Component/Page';
import {ScreenHeader} from '../../../Component/View';
import {moderateScale} from '../../../Util';
import AppLogoIcon from 'src/Resource/svg/app-logo-p-icon.svg';
import {SectionContainer} from '../../../Unit/View';
import CommonTextFormField from '../../../Component/CommonTextFormField';
import CommonCompleteButton from '../../Popup/Landing/common.complete.button';
import {AuthLoginProvider, useAuthLoginContext} from './Auth.login.provider';
import {View} from 'react-native';

export type LoginScreenProps = {
  popWhenSucceed?: number;
};

function LoginScreenContainer({
  navigation,
}: NativeStackScreenProps<AppStackProps, 'LoginScreen'>) {
  const {inputs, setInputs, emailError, passwordError, isLoading, tryLogin} =
    useAuthLoginContext();

  const handleEmailChange = (input: string) => {
    setInputs({email: input});
  };

  const handlePasswordChange = (input: string) => {
    setInputs({password: input});
  };

  const loginable =
    inputs.email.length > 0 && inputs.password.length > 0 && !isLoading;

  const handleLogin = async () => {
    const success = await tryLogin();
    if (success) {
      navigation.replace('LandingBottomTabNavigator', {
        HomeLandingScreen: {},
        PopupLandingScreen: {},
        PopupLikesLandingScreen: {},
        MyPageLandingScreen: {},
      });
    }
  };

  return (
    <FullViewPage
      PageContent={
        <>
          <ScreenHeader LeftComponents={'BACK_BUTTON'} title="로그인" />
          <SectionContainer
            style={{
              marginTop: 30,
              justifyContent: 'flex-start',
              paddingBottom: moderateScale(20),
            }}>
            <AppLogoIcon />

            <TitleText>내 취향을 기반으로</TitleText>
            <TitleText>팝업스토어를 관리하고 저장해요</TitleText>
            <View style={{height: 60}} />
            <LabelText>이메일</LabelText>
            <CommonTextFormField
              onChangeText={handleEmailChange}
              placeholder="이메일 주소를 입력해주세요."
              keyboardType="email-address"
              errorText={emailError}
            />
            <LabelText>비밀번호 설정</LabelText>
            <CommonTextFormField
              isPasswordType={true}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              errorText={passwordError}
            />
          </SectionContainer>
          <CommonCompleteButton
            onPress={handleLogin}
            title="로그인"
            isDisabled={!loginable}
            loading={isLoading}
          />
        </>
      }
    />
  );
}

export const LoginScreen = (
  props: NativeStackScreenProps<AppStackProps, 'LoginScreen'>,
) => (
  <AuthLoginProvider>
    <LoginScreenContainer {...props} />
  </AuthLoginProvider>
);

const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
`;

const LabelText = styled.Text`
  color: black;
  font-size: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
`;
