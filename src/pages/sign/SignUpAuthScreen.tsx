import {StyleSheet, View} from 'react-native';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import ResendButton from '../../components/molecules/pressable_text/ResendButton.tsx';
import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import AuthCodeTextFormField from '../../components/molecules/form_field/AuthCodeTextFormField.tsx';
import useAuthCode from '../../hooks/useAuthCode.tsx';

function SignUpAuthScreen({navigation}) {
  const {code, setCode, countdown, resetCountdown, startTheCountdown} =
    useAuthCode();

  const handlePress = () => {
    navigation.navigate('SignUpNickName');
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <SignUpOrderHeader currentStep="SignUpAuthCode" />
        <MainTitle text1="회원님의 이메일로" text2="확인 코드를 전송해주세요" />
        <ResendButton onPressed={resetCountdown} />
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
