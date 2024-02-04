import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import RoundRightSvg from '../../assets/icons/roundRight.svg';

function SignInPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [touched, setTouched] = useState(false); // 사용자가 입력 필드를 수정했는지 추적
  const handleChangePassword = text => {
    setPassword(text);
  };
  const handlePress = () => {
    setTouched(true);

    // 에러가 없고, 입력이 유효한 경우 로그인 시도 로직 실행
    console.log('로그인 시도부분');
    navigation.navigate('Home'); // 여기로 이동
  };
  return (
    <View style={styles.container}>
      <MainTitle text1="POPPIN에" text2="돌아오셧군요!" />
      <LabelAndInput
        onChangeText={handleChangePassword}
        placeholder="영문,숫자,특수문자 8자 이상"
        keyboardType="email-address"
        labelText={'비밀번호'}
      />
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!password}
        alwaysActive={false}
      />
      <View style={styles.memberInfoContainer}>
        <Text style={[globalStyles.bodyMediumSub, styles.infoText]}>
          비밀번호를 잊으셨나요?
        </Text>
        <Pressable onPress={() => navigation.navigate('PasswordFind')}>
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
    color: primaryColors.font,
  },
});
export default SignInPasswordScreen;
