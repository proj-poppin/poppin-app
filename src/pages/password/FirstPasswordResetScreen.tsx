import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import RedoSvg from '../../assets/icons/redo.svg';
import PrimaryColors from '../../utils/color/globalColors.ts';

function FirstPasswordResetScreen({navigation}) {
  const [countdown, setCountdown] = useState(180); // 3분 카운트다운

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendCode = () => {
    // TODO: 인증번호 재전송 API 호출
    console.log('인증번호 재전송');
    // 카운트다운 재설정
    setCountdown(180);
  };

  return (
    <View style={styles.container}>
      <MainTitle text1="회원님의 이메일로" text2="확인 코드를 전송했어요!" />
      <View style={styles.resendContainer}>
        <Pressable onPress={handleResendCode} style={styles.resendButton}>
          <RedoSvg />
          <Text style={styles.resendText}>재전송하기</Text>
        </Pressable>
      </View>
      <LabelAndInput
        onChangeText={() => {}} // onChangeText 핸들러 구현 필요
        placeholder="코드를 입력해주세요"
        keyboardType="default"
        labelText={'확인 코드 입력'}
        isPassword={true}
      />
      <CompleteButton
        title="다음"
        onPress={() => navigation.navigate('SecondPasswordReset')}
        loading={false}
        disabled={false} // 실제 로직에 따라 변경 필요
        alwaysActive={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    marginLeft: 10,
    color: PrimaryColors.blue,
  },
  countdownText: {
    color: PrimaryColors.blue,
  },
});

export default FirstPasswordResetScreen;
