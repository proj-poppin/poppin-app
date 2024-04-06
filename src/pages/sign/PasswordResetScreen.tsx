import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
import CommonTextFormField from '../../components/molecules/form_field/CommonTextFormField.tsx';
import AuthCodeTextFormField from '../../components/molecules/form_field/AuthCodeTextFormField.tsx';
import PasswordCheckTextFormField from '../../components/molecules/form_field/PasswordCheckTextFormField.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import ResendButton from '../../components/molecules/pressable_text/ResendButton.tsx';
import useAuthCode from '../../hooks/useAuthCode.tsx';
import useSignUpEmail from '../../hooks/useSignUpEmail.tsx';
import useResetPassword from '../../hooks/useResetPassword.tsx';
import usePasswordEmailVerification from '../../hooks/usePasswordEmailVerification.tsx';

type PasswordResetScreenProps = {
  navigation: any;
};

function PasswordResetScreen({navigation}: PasswordResetScreenProps) {
  const {
    email,
    password,
    passwordConfirm,
    emailError,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirm,
    isValidLength,
    containsNumAndLetter,
    containsSpecialChar,
    isPasswordSame,
  } = useSignUpEmail();

  const {code, setCode, countdown, resetCountdown} = useAuthCode();

  const {authCode, verifyEmail} = usePasswordEmailVerification(email);

  const {resetUserPassword, resetPasswordStatus} = useResetPassword();

  const [pageIndex, setPageIndex] = useState(1);

  const handlePress = () => {
    verifyEmail()
      .then(() => setPageIndex(2))
      .catch(error =>
        Alert.alert(
          'Error',
          error.message || '이메일 인증 중 알 수 없는 오류가 발생했습니다.',
        ),
      );
  };

  const handlePressAuthCode = () => {
    if (code === authCode) {
      setPageIndex(3);
    } else {
      Alert.alert('인증 코드가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    if (resetPasswordStatus.success) {
      Alert.alert(
        '비밀번호 변경 성공',
        '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.',
      );
      navigation.navigate('BasicLogin');
    }
  }, [resetPasswordStatus.success, navigation]);

  const handleResetPassword = () => {
    if (
      isPasswordSame &&
      isValidLength &&
      containsNumAndLetter &&
      containsSpecialChar
    ) {
      resetUserPassword(password, passwordConfirm).then();
    } else {
      Alert.alert('Error', 'Passwords do not match or meet the criteria.');
    }
  };

  useEffect(() => {
    if (pageIndex === 2) {
      resetCountdown();
    }
  }, [pageIndex, resetCountdown]);

  const renderStepContent = () => {
    switch (pageIndex) {
      case 1:
        return (
          <>
            <MainTitle
              text1="회원님의 이메일로"
              text2="확인 코드를 전송할게요"
              isPoppinLogo={true}
            />
            <LabelText20B text="이메일" />
            <CommonTextFormField
              onChangeText={handleChangeEmail}
              onEndEditing={() => {}}
              placeholder="이메일 주소를 입력해주세요."
              keyboardType="email-address"
              errorText={emailError}
            />
            <CompleteButton
              onPress={handlePress}
              title="다음"
              disabled={!email}
            />
          </>
        );
      case 2:
        return (
          <>
            <MainTitle
              text1="회원님의 이메일로"
              text2="확인 코드를 전송했어요"
              isPoppinLogo={true}
            />
            <ResendButton onPressed={resetCountdown} />
            <AuthCodeTextFormField
              code={code}
              setCode={setCode}
              countdown={countdown}
            />
            <CompleteButton
              onPress={handlePressAuthCode}
              title="다음"
              disabled={!code}
            />
          </>
        );
      case 3:
        return (
          <>
            <MainTitle
              text1="새로운 비밀번호를"
              text2="설정해주세요"
              isPoppinLogo={true}
            />
            <LabelText20B text="비밀번호 설정" />
            <PasswordCheckTextFormField
              onChangeText={handleChangePassword}
              placeholder="영문,숫자,특수문자 포함 8자 이상"
              isValidLength={isValidLength}
              containsNumAndLetter={containsNumAndLetter}
              containsSpecialChar={containsSpecialChar}
            />
            <LabelText20B text={'비밀번호 확인'} />
            <PasswordCheckTextFormField
              onChangeText={handleChangePasswordConfirm}
              placeholder="다시 한 번 입력해주세요"
              isValidLength={isValidLength}
              containsNumAndLetter={containsNumAndLetter}
              containsSpecialChar={containsSpecialChar}
              isPasswordSame={isPasswordSame}
              isPasswordSetting={true}
            />
            <CompleteButton
              onPress={handleResetPassword}
              title="완료"
              disabled={
                !password || !passwordConfirm || password !== passwordConfirm
              }
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>{renderStepContent()}</View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});

export default PasswordResetScreen;
