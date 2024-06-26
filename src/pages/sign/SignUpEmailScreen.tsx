import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import PasswordCheckTextFormField from '../../components/molecules/form_field/PasswordCheckTextFormField.tsx';
import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
import CommonTextFormField from '../../components/molecules/form_field/CommonTextFormField.tsx';
import TermsAndPrivacyPolicyAgreement from '../../components/molecules/pressable_text/PressableUnderlineText.tsx';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import useSignUpEmail from '../../hooks/signUp/useSignUpEmail.tsx';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user.ts';
import useEmailVerification from '../../hooks/signUp/useEmailVerification.tsx';

type SignUpEmailScreenProps = {
  navigation: any;
};

function SignUpEmailScreen({navigation}: SignUpEmailScreenProps) {
  const {
    email,
    handleEmailEndEditing,
    password,
    passwordConfirm,
    emailError,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirm,
    canGoNext,
    isValidLength,
    containsNumAndLetter,
    containsSpecialChar,
    isPasswordSame,
  } = useSignUpEmail();

  const dispatch = useDispatch();
  const {verifyEmail} = useEmailVerification(email);
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    verifyEmail()
      .then(receivedAuthCode => {
        dispatch(
          userSlice.actions.setSignUpEmailScreen({
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            agreedToPrivacyPolicy: true,
            agreedToServiceTerms: true,
          }),
        );

        console.log('email', email);
        console.log('authCode', receivedAuthCode);
        navigation.navigate('SignUpAuthCode', {
          fromScreen: 'SignUpEmail',
          authCode: receivedAuthCode,
        });
      })
      .catch(error => {
        const message =
          error.message || '이메일 인증 중 알 수 없는 오류가 발생했습니다.';
        Alert.alert('Error', message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <SignUpOrderHeader currentStep="SignUpEmail" />
        <MainTitle
          text1="POPPIN의 회원이 되어"
          text2="맞춤 팝업을 추천받아보세요!"
        />
        <LabelText20B text={'아이디'} />
        <CommonTextFormField
          onChangeText={handleChangeEmail}
          onEndEditing={handleEmailEndEditing}
          placeholder="이메일 주소를 입력해주세요."
          keyboardType={'email-address'}
          errorText={emailError}
        />
        <LabelText20B text={'비밀번호 설정'} />
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
          title={loading ? '인증번호 발송중...' : '다음'}
          onPress={handlePress}
          loading={loading}
          disabled={!canGoNext || loading}
          alwaysActive={false}
        />
        <TermsAndPrivacyPolicyAgreement
          onPrivacyPolicyPress={() => navigation.navigate('PrivacyPolicy')}
          onTermsOfServicePress={() => navigation.navigate('ServicePolicy')}
        />
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
});

export default SignUpEmailScreen;
