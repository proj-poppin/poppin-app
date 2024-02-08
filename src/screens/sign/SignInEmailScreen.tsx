// SignInEmailScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import CompleteButton from '../../components/CompleteButton.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import RoundRightSvg from '../../assets/icons/roundRight.svg';
import KakaoSvg from '../../assets/icons/kakao.svg';
import AppleSvg from '../../assets/icons/apple.svg';
import NaverSvg from '../../assets/icons/naver.svg';
import GoogleSvg from '../../assets/icons/google.svg';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';
import Config from 'react-native-config';
function SignInEmailScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(true); // 사용자가 입력 필드를 수정했는지 추적
  const [result, setResult] = useState<string>('');
  // 이메일 입력 필드 변경 핸들러
  const handleChangeEmail = text => {
    setEmail(text);
    setError(''); // 입력이 변경될 때마다 에러 메시지 초기화
    console.log('input changed');
    const isValidEmail = /\S+@\S+\.\S+/.test(text);
    setError('');
  };
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };
  // 이메일 유효성 검사 함수
  const validateEmail = () => {
    if (!email) {
      setError('✕ 아이디를 입력해주세요');
      return false;
    }
    // 간단한 이메일 유효성 검사 정규식
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError('잘못된 이메일 주소입니다');
      return false;
    }
    setError(''); // 에러 메시지 초기화
    return true;
  };

  // 계속하기 버튼 클릭 핸들러
  const handlePress = () => {
    setTouched(true);
    console.log('touched');

    // 이메일 주소가 .com, .co.kr, .net으로 끝나는지 확인
    const isValidEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+(com|co\.kr|net)$/i.test(
        email,
      );
    if (!isValidEmail) {
      setError('잘못된 이메일 주소입니다');
      console.log('touched2');
      return;
    }

    // 에러가 없고, 입력이 유효한 경우 로그인 시도 로직 실행
    console.log('로그인 시도 가능');
    navigation.navigate('SignInPassword'); // 여기로 이동
  };

  return (
    <View style={styles.container}>
      <MainTitle
        text1="내 취향을 기반으로"
        text2="팝업스토어를 관리하고 저장해요"
      />
      <LabelAndInput
        onChangeText={handleChangeEmail}
        placeholder="이메일 주소를 입력해주세요."
        keyboardType="email-address"
        errorText={touched && error ? error : ''}
        labelText={'이메일'}
      />
      <CompleteButton
        title="계속하기"
        onPress={handlePress}
        loading={false}
        disabled={!email}
        alwaysActive={false}
        onDisabledPress={() => setError('✕ 아이디를 입력해주세요')} // 콜백 추가
      />
      <View style={styles.memberInfoContainer}>
        <Text style={[globalStyles.bodyMediumSub, styles.infoText]}>
          아직 POPPIN회원이 아니신가요?
        </Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <RoundRightSvg />
        </Pressable>
      </View>
      <Text style={[globalStyles.bodyMediumPrimary, styles.snsLoginText]}>
        SNS계정으로 간편 로그인
      </Text>
      <View style={styles.snsIconsContainer}>
        <NaverSvg style={styles.snsIcon} />
        <Pressable onPress={signInWithKakao}>
          <KakaoSvg style={styles.snsIcon} />
        </Pressable>
        <GoogleSvg style={styles.snsIcon} />
        <AppleSvg style={styles.snsIcon} />
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
    marginRight: 5, // 우측 여백 조정
    alignSelf: 'center',
  },
  snsLoginText: {
    marginTop: 50,
    marginBottom: 20, // SNS 아이콘과의 간격 조정
    alignSelf: 'center',
  },
  infoText: {
    marginRight: 10, // 여기서 거리 조정
    color: primaryColors.font,
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

export default SignInEmailScreen;
