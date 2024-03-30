// SignInEmailScreen.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert, Platform} from 'react-native';
import CompleteButton from '../../components/CompleteButton.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import RoundRightSvg from '../../assets/icons/roundRight.svg';
import KakaoSvg from '../../assets/icons/social_login/kakao.svg';
import AppleSvg from '../../assets/icons/social_login/apple.svg';
import NaverSvg from '../../assets/icons/social_login/naver.svg';
import GoogleSvg from '../../assets/icons/social_login/google.svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {getAccessToken} from '@react-native-seoul/kakao-login';
import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import axios from 'axios';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

async function onAppleButtonPress() {
  if (Platform.OS === 'android') {
    console.log('android');
    return Alert.alert('안내', 'iOS 기기에서만 사용 가능합니다.');
  }

  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  console.log('appleAuthRequestResponse', appleAuthRequestResponse);
  console.log('appleAuthUser', appleAuthRequestResponse.user);
  console.log('appleAuthEmail', appleAuthRequestResponse.email);
  console.log('appleAuthResponse', appleAuthRequestResponse.fullName);
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    console.log('user is authenticated!!!');
  } else {
    console.log('user is not authenticated :(');
  }
}

const consumerKey = Config.NAVER_CONSUMER_KEY;
const consumerSecret = Config.NAVER_SECRECT_KEY;
const appName = '팝핀';
const serviceUrlScheme = Config.NAVER_URL;

GoogleSignin.configure({
  webClientId: Config.GOOGLE_API_KEY,
});

async function onGoogleButtonPress() {
  console.log('onGoogleButtonPress 시작');

  // Google Play 서비스 지원 여부 확인
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();

  const result = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: JSON.stringify({
      code: userInfo.serverAuthCode,
      client_id: Config.GOOGLE_WEB_CLIENT_ID,
      client_secret: Config.GOOGLE_WEB_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: Config.REDIRECT_URI,
    }),
  }).then(res => {
    return res.json();
  });
  console.log(result);
}

function SignInEmailScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(true); // 사용자가 입력 필드를 수정했는지 추적
  const [result, setResult] = useState<string>('');

  //naver
  const [success, setSuccessResponse] =
    useState<NaverLoginResponse['successResponse']>();
  const [failure, setFailureResponse] =
    useState<NaverLoginResponse['failureResponse']>();
  const [, setGetProfileRes] = useState<GetProfileResponse>();
  const isAppleAuthSupported = Platform.OS === 'ios' && appleAuth.isSupported;
  console.log(Platform.OS);
  const loginInNaver = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    // 토큰 확인 디버깅 코드
    console.log('successResponse', successResponse);
    console.log('failureResponse', failureResponse);
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);
    try {
      console.log(success!.accessToken);
      const profileResult = await NaverLogin.getProfile(success!.accessToken);
      console.log('profileResult', profileResult);
      setGetProfileRes(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
    }
  };

  const logout = async () => {
    try {
      await NaverLogin.logout();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
      setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const getProfile = async () => {
    try {
      const profileResult = await NaverLogin.getProfile(success!.accessToken);
      setGetProfileRes(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
    }
  };

  const deleteToken = async () => {
    try {
      await NaverLogin.deleteToken();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
      setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  // 이메일 입력 필드 변경 핸들러
  const handleChangeEmail = (text: React.SetStateAction<string>) => {
    setEmail(text);
    setError(''); // 입력이 변경될 때마다 에러 메시지 초기화
    console.log('input changed');
    if (typeof text === 'string') {
      /\S+@\S+\.\S+/.test(text);
    }
    setError('');
  };
  const signInWithKakao = async (): Promise<void> => {
    const token = await getAccessToken();
    console.log(token.accessToken);
    console.log(token);
    setResult(JSON.stringify(token));
  };

  const handlePress = async () => {
    setTouched(true);
    console.log('touched');

    // Validate email with your existing logic
    const isValidEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+(com|co\.kr|net)$/i.test(
        email,
      );
    if (!isValidEmail) {
      setError('잘못된 이메일 주소입니다');
      console.log('touched2');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', 'childless123!');

    // Perform POST request
    try {
      const response = await axios({
        method: 'post',
        url: Config.API_URL + '/auth/login',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log('Response:', response.data);
      // Handle response data or navigate
      navigation.navigate('SignInPassword'); // Or handle based on response
    } catch (error) {
      console.error(
        'Error during Axios request:',
        error.response ? error.response.data : error.message,
      );
      setError('로그인 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, backgroundColor: globalColors.white}}>
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
          <Text style={[Text14R.text, styles.infoText]}>
            아직 POPPIN회원이 아니신가요?
          </Text>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
            style={{padding: 10}}>
            <RoundRightSvg />
          </Pressable>
        </View>
        <Text style={[Text14B.text, styles.snsLoginText]}>
          SNS계정으로 간편 로그인
        </Text>
        <View style={styles.snsIconsContainer}>
          <Pressable onPress={loginInNaver}>
            <NaverSvg style={styles.snsIcon} />
          </Pressable>
          <Pressable onPress={signInWithKakao}>
            <KakaoSvg style={styles.snsIcon} />
          </Pressable>
          <Pressable
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }>
            <GoogleSvg style={styles.snsIcon} />
          </Pressable>
          {isAppleAuthSupported && (
            <Pressable onPress={onAppleButtonPress}>
              <AppleSvg style={styles.snsIcon} />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
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
    marginRight: 5,
    alignSelf: 'center',
  },
  snsLoginText: {
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  infoText: {
    marginRight: 10,
    color: globalColors.font,
  },
  snsIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 60,
  },
  snsIcon: {
    width: 24,
    height: 24,
  },
});

export default SignInEmailScreen;
