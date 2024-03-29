import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import primaryColors from '../../style/primaryColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import React, {useEffect, useState} from 'react';
import ProfileAppBar from '../../components/ProfileAppBar.tsx';
import KakaoSvg from '../../assets/icons/social_login/kakao.svg';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import PasswordInput from '../../components/PasswordInput.tsx';
import WatchSvg from '../../assets/icons/watch.svg';
import WatchFilledSvg from '../../assets/icons/watchFilled.svg';

function PasswordChangeScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(true); // 사용자가 입력 필드를 수정했는지 추적
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState(false); // 비밀번호 일치 상태
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태

  const canGoNext = isEmailValid && isPasswordValid && isPasswordSame;

  // 이메일 입력 필드 변경 핸들러
  const handleChangeEmail = text => {
    setEmail(text);
    setError(''); // 입력이 변경될 때마다 에러 메시지 초기화
    console.log('input changed');
    const isValidEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+(com|co\.kr|net)$/i.test(
        text,
      );
    if (isValidEmail) {
      console.log('이메일 유효성 통과');
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }

    setError('');
  };

  const handleChangePassword = text => {
    setPassword(text);
    // 비밀번호 유효성 검사
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        text,
      );
    setIsPasswordValid(isValidPassword);
    // 비밀번호 확인 필드와의 일치 여부 검사
    checkPasswordMatch(text, passwordConfirm);
  };

  const handleSamePassword = text => {
    setPasswordConfirm(text);
    // 비밀번호 필드와의 일치 여부 검사
    checkPasswordMatch(password, text);
  };

  const checkPasswordMatch = (password, passwordConfirm) => {
    const isMatch = password === passwordConfirm;
    setIsPasswordSame(isMatch);
    if (isMatch && isPasswordValid) {
      // 비밀번호가 유효하고, 비밀번호와 비밀번호 확인이 일치할 경우 추가 로직 처리
      console.log('비밀번호 일치 및 유효성 통과');
    }
  };

  const handlePress = () => {
    setTouched(true);
    if (isPasswordValid) {
      // 비밀번호 유효성이 확인되면 로그인 시도 로직 실행
      console.log('로그인 시도부분2');
    }

    // 이메일 주소가 .com, .co.kr, .net으로 끝나는지 확인
    const isValidEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+(com|co\.kr|net)$/i.test(
        email,
      );
    if (!isValidEmail) {
      setError('잘못된 이메일 주소입니다');
      console.log('touched2');
      console.log('touched3');
      return;
    }

    // 에러가 없고, 입력이 유효한 경우 로그인 시도 로직 실행
    console.log('로그인 시도 가능');
    navigation.navigate(''); // 여기로 이동
  };
  useEffect(() => {
    navigation.setOptions(
      ProfileAppBar({
        navigation,
        appBarTitle: '비밀번호 변경',
        isHeaderRight: false,
      }),
    );
  }, [navigation]);

  const handleForgotPasswordPress = () => {
    // Navigate to your desired screen
    navigation.navigate('ForgotPasswordScreen'); // Replace 'ForgotPasswordScreen' with your actual screen name
  };

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={[globalStyles.title, {marginTop: 40, marginBottom: 10}]}>
        {'POPPIN 계정의\n'}
        {'비밀번호를 변경해주세요'}
      </Text>
      <Text style={{marginTop: 25, marginBottom: 10}}>{'아이디'}</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          style={styles.emailInput}
          value={'poppin2024@naver.com'}
          editable={false} // 편집 불가능하게 설정
        />
      </View>
      <View style={{marginBottom: 20}} />
      <PasswordInput
        onChangeText={handleChangePassword}
        placeholder="현재 비밀번호"
        keyboardType="default"
        labelText={'비밀번호 설정'}
        isPassword={true}
        isPasswordSetting={false}
        containerStyle={{marginBottom: 10}}
      />
      <Pressable onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>
          현재 비밀번호가 기억나지 않으세요?
        </Text>
      </Pressable>
      <PasswordInput
        onChangeText={handleChangePassword}
        placeholder="새 비밀번호"
        keyboardType="default"
        labelText={'비밀번호 설정'}
        isPassword={true}
        isPasswordSetting={true}
        containerStyle={{marginBottom: 20}}
      />
      <PasswordInput
        onChangeText={handleSamePassword}
        placeholder="새 비밀번호 확인"
        keyboardType="default"
        labelText={'비밀번호 확인'}
        isPassword={true}
        isPasswordSame={isPasswordSame}
        isPasswordSameSetting={true}
      />
      <Text style={[globalStyles.labelSubGray, {paddingVertical: 20}]}>
        • 개인정보(연락처/생일)와 관련된 숫자 등 다른 사람이 알아낼 수 있는
        비밀번호는 사용하지 마세요.
      </Text>
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!canGoNext}
        alwaysActive={false}
        onDisabledPress={() => setError('✕ 아이디를 입력해주세요')}
      />
    </DismissKeyboardView>
  );
}

export default PasswordChangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColors.white,
    paddingHorizontal: 15,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColors.component,
    borderRadius: 30,
    padding: 10,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: 'black',
    marginBottom: 30,
  },
  emailInput: {
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: primaryColors.font,
  },
});
