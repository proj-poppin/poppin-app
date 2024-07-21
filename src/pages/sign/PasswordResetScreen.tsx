import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import MainTitle from '../../components/organisms/header/MainTitle';
import LabelText20B from '../../components/atoms/label/LabelText20B';
import CommonTextFormField from '../../components/molecules/form_field/CommonTextFormField';
import AuthCodeTextFormField from '../../components/molecules/form_field/AuthCodeTextFormField';
import PasswordCheckTextFormField from '../../components/molecules/form_field/PasswordCheckTextFormField';
import CompleteButton from '../../components/atoms/button/CompleteButton';
import ResendButton from '../../components/molecules/pressable_text/ResendButton';
import useAuthCode from '../../hooks/signUp/useAuthCode';
import useSignUpEmail from '../../hooks/signUp/useSignUpEmail';
import useResetPasswordNonPublic from '../../hooks/password/useResetPasswordNonPublic.tsx';
import useResetPasswordPublic from '../../hooks/password/useResetPasswordPublic.tsx';
import usePasswordEmailVerification from '../../hooks/password/usePasswordEmailVerification';
import useGetUser from '../../hooks/auth/useGetUser';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';

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
  const {
    resetUserPasswordNonPublic,
    resetPasswordStatus: resetPasswordStatusNonPublic,
  } = useResetPasswordNonPublic();
  const {
    resetUserPasswordPublic,
    resetPasswordStatus: resetPasswordStatusPublic,
  } = useResetPasswordPublic();
  const {data: user, loading: userLoading, error} = useGetUser();
  const [pageIndex, setPageIndex] = useState(1);
  const isLoggedIn = useIsLoggedIn();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      await verifyEmail();
      setPageIndex(2);
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || '이메일 인증 중 알 수 없는 오류가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePressAuthCode = () => {
    if (code === authCode) {
      setPageIndex(3);
    } else {
      Alert.alert('인증 코드가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    if (
      resetPasswordStatusNonPublic.success ||
      resetPasswordStatusPublic.success
    ) {
      Alert.alert(
        '비밀번호 변경 성공',
        '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.',
      );
      navigation.navigate('BasicLogin');
    }
  }, [
    resetPasswordStatusNonPublic.success,
    resetPasswordStatusPublic.success,
    navigation,
  ]);

  const handleResetPassword = async () => {
    if (
      isPasswordSame &&
      isValidLength &&
      containsNumAndLetter &&
      containsSpecialChar
    ) {
      try {
        if (isLoggedIn) {
          await resetUserPasswordNonPublic(password, passwordConfirm);
        } else {
          await resetUserPasswordPublic(email, password, passwordConfirm);
        }
      } catch (error) {
        Alert.alert('Error', 'Passwords do not match or meet the criteria.');
      }
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
              title={loading ? '인증번호 발송중...' : '다음'}
              loading={loading}
              disabled={!email || loading}
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
