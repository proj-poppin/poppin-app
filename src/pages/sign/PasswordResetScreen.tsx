import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
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

function PasswordResetScreen({navigation}) {
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

  const {code, setCode, countdown, resetCountdown, startTheCountdown} =
    useAuthCode();

  const [pageIndex, setPageIndex] = useState(1);

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
              onChangeText={text => handleChangeEmail(text)}
              onEndEditing={() => {}}
              placeholder="이메일 주소를 입력해주세요."
              keyboardType="email-address"
              errorText={emailError}
            />
            <CompleteButton
              onPress={() => {
                startTheCountdown();
                setPageIndex(2);
              }}
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
              onPress={() => setPageIndex(3)}
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
              onPress={() => {
                navigation.navigate('BasicLogin');
              }}
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
