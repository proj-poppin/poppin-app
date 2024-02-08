// SignInEmailScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import CompleteButton from '../../components/CompleteButton.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';

function SignUpScreen({navigation}) {
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
    navigation.navigate('NicknameSetting'); // 여기로 이동
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <MainTitle
          text1="POPPIN의 회원이 되어"
          text2="맞춤 팝업을 추천받아보세요!"
        />
        <LabelAndInput
          onChangeText={handleChangeEmail}
          placeholder="이메일 주소를 입력해주세요."
          keyboardType="email-address"
          errorText={touched && error ? error : ''}
          labelText={'이메일'}
        />
        <LabelAndInput
          onChangeText={handleChangePassword}
          placeholder="영문,숫자,특수문자 8자 이상"
          keyboardType="default"
          labelText={'비밀번호 설정'}
          isPassword={true}
          isPasswordSetting={true}
        />
        <LabelAndInput
          onChangeText={handleSamePassword}
          placeholder="다시 한 번 입력해주세요"
          keyboardType="default"
          labelText={'비밀번호 확인'}
          isPassword={true}
          isPasswordSame={isPasswordSame}
          isPasswordSameSetting={true}
        />
        <CompleteButton
          title="완료"
          onPress={handlePress}
          loading={false}
          disabled={!canGoNext}
          alwaysActive={false}
          onDisabledPress={() => setError('✕ 아이디를 입력해주세요')} // 콜백 추가
        />
        <View style={styles.pageContainer}>
          <Text style={[globalStyles.bodyMediumSub, styles.infoText]}>
            회원가입을 완료할 시,
          </Text>
          <Text style={[globalStyles.bodyMediumSub, styles.infoText]}>
            팝핀의{' '}
            <Text
              style={styles.pageInfoText}
              onPress={() => navigation.navigate('ServiceInfo')}>
              서비스 이용약관
            </Text>
            과
            <Text
              style={styles.pageLinkText}
              onPress={() => navigation.navigate('ProtectInfo')}>
              {' '}
              개인정보 보호정책
            </Text>
            에 동의하게 됩니다.
          </Text>
        </View>
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
  memberInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginRight: 5, // 우측 여백 조정
    alignSelf: 'center',
  },
  snsLoginText: {
    marginTop: 50,
    marginBottom: 20, // SNS 아이콘과의 간격 조정
    alignSelf: 'center',
  },
  pageContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  pageInfoText: {
    color: primaryColors.font,
    textDecorationLine: 'underline', // 링크에 밑줄 스타일 적용
    fontSize: 12,
  },
  pageLinkText: {
    textDecorationLine: 'underline', // 링크에 밑줄 스타일 적용
    color: primaryColors.font,
    fontSize: 12,
  },
  infoText: {
    marginRight: 10, // 여기서 거리 조정
    color: primaryColors.font,
    fontSize: 12,
  },
  snsIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 간격 조정
    alignItems: 'center', // 모든 아이콘을 중앙 정렬
    marginHorizontal: 60, // 컨테이너 양쪽의 여백을 줄여 간격 조정
  },
  snsIcon: {
    width: 24, // 아이콘 너비 설정
    height: 24, // 아이콘 높이 설정, AppleSvg의 높이 문제는 apple.svg 파일을 열어 수정
  },
});

export default SignUpScreen;
