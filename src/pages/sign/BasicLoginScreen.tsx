import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
import CommonTextFormField from '../../components/molecules/form_field/CommonTextFormField.tsx';
import React from 'react';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import useBasicLogin from '../../hooks/login/useBasicLogin.tsx';
import {StyleSheet, View} from 'react-native';
import PressableGreyTextWord from '../../components/molecules/pressable_text/PressableGreyTextWord.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {useNavigation} from '@react-navigation/native';

type BasicLoginScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'BasicLogin'
>;

function BasicLoginScreen() {
  const {
    email,
    password,
    emailError,
    passwordError,
    isLoginButtonEnabled,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
  } = useBasicLogin();

  const navigation = useNavigation<BasicLoginScreenNavigationProp>();

  console.log(email, password, emailError, passwordError, isLoginButtonEnabled);

  const navigateToSignUpEmail = () => {
    navigation.navigate('SignUpEmail');
  };

  const navigateToPasswordReset = () => {
    navigation.navigate('PasswordReset');
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <MainTitle
          text1="내 취향을 기반으로"
          text2="팝업 스토어를 관리하고 저장해요"
          isPoppinLogo={true}
        />
        <LabelText20B text={'아이디'} />
        <CommonTextFormField
          onChangeText={handleChangeEmail}
          onEndEditing={() => {}}
          placeholder="이메일 주소를 입력해주세요."
          keyboardType="email-address"
          errorText={emailError}
        />
        <LabelText20B text={'비밀번호'} />
        <CommonTextFormField
          onChangeText={handleChangePassword}
          placeholder="영문,숫자,특수문자 포함 8자 이상"
          errorText={passwordError}
          secureTextEntry={true}
          isWatchNeed={true}
        />
        <CompleteButton
          onPress={handleLogin}
          title={'로그인'}
          disabled={!isLoginButtonEnabled}
        />
        <View style={styles.rowContainer}>
          <PressableGreyTextWord
            onPressed={navigateToPasswordReset}
            text="비밀번호 재설정"
          />
          <PressableGreyTextWord
            onPressed={navigateToPasswordReset}
            text=" | "
          />
          <PressableGreyTextWord
            onPressed={navigateToSignUpEmail}
            text="회원 가입"
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default BasicLoginScreen;
