import {Alert, StyleSheet, View} from 'react-native';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import ResendButton from '../../components/molecules/pressable_text/ResendButton.tsx';
import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import AuthCodeTextFormField from '../../components/molecules/form_field/AuthCodeTextFormField.tsx';
import useAuthCode from '../../hooks/useAuthCode.tsx';
import useEmailVerification from '../../hooks/useEmailVerification.tsx';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

function SignUpAuthScreen({navigation, route}) {
  const {code, setCode, countdown, resetCountdown} = useAuthCode();
  const {email} = useSelector(state => state.user);
  const {authCode, setAuthCode, verifyEmail} = useEmailVerification(email); // 수정된 부분

  useEffect(() => {
    setAuthCode(route.params.authCode);
    resetCountdown();
  }, [route.params, setAuthCode, resetCountdown]);

  const handleResendPress = () => {
    verifyEmail().then();
    resetCountdown();
  };

  const handlePress = () => {
    if (code === authCode) {
      navigation.navigate('SignUpNickName');
    } else {
      Alert.alert('인증 코드가 일치하지 않습니다.');
    }
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <SignUpOrderHeader currentStep="SignUpAuthCode" />
        <MainTitle text1="회원님의 이메일로" text2="확인 코드를 전송했어요" />
        <ResendButton onPressed={handleResendPress} />
        <View style={{height: 120}} />
        <LabelText20B text="확인 코드 입력" />
        <AuthCodeTextFormField
          code={code}
          setCode={setCode}
          countdown={countdown}
        />
        <CompleteButton
          onPress={handlePress}
          title="완료"
          disabled={code.length === 0}
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

export default SignUpAuthScreen;
