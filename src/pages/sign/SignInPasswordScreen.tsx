import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import RoundRightSvg from '../../assets/icons/roundRight.svg';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';

function SignInPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const handleChangePassword = (text: React.SetStateAction<string>) => {
    setPassword(text);
    if (typeof text === 'string') {
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        text,
      );
    }
    let isValidPassword = false;
    setIsPasswordValid(isValidPassword); // 비밀번호 유효성 상태 업데이트
  };
  const handlePress = () => {
    setTouched(true);
    if (isPasswordValid) {
      // 비밀번호 유효성이 확인되면 로그인 시도 로직 실행
      console.log('로그인 시도부분2');
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <MainTitle text1="POPPIN에" text2="돌아오셧군요!" />
      <LabelAndInput
        onChangeText={handleChangePassword}
        placeholder="영문,숫자,특수문자 8자 이상"
        keyboardType="default"
        labelText={'비밀번호'}
        isPassword={true}
      />
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!isPasswordValid} // 버튼 활성화 조건 수정
        alwaysActive={false}
      />
      <View style={styles.memberInfoContainer}>
        <Text style={[Text14R.text, styles.infoText]}>
          비밀번호를 잊으셨나요?
        </Text>
        <Pressable onPress={() => navigation.navigate('FirstPasswordReset')}>
          <RoundRightSvg />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  memberInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  infoText: {
    marginRight: 10, // 여기서 거리 조정
    color: globalColors.font,
  },
});
export default SignInPasswordScreen;
