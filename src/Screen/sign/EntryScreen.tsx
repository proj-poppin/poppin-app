import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform, Linking, Alert} from 'react-native';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import SocialLoginButtonRow from '../../Util/function/SocialLoginButtonRow.tsx';
import {useKakaoLogin} from '../../hooks/login/useKakaoLogin.tsx';
import {useGoogleLogin} from '../../hooks/login/useGoogleLogin.tsx';
import {useNaverLogin} from '../../hooks/login/useNaverLogin.tsx';
import {useAppleLogin} from '../../hooks/login/useAppleLogin.tsx';
import BasicLoginButton from 'src/Resource/png/basic-login-button.svg';
import SvgImgButton from '../../components/atoms/button/SvgPressableImageButton.tsx';
import BasicLoginButton from 'src/Resource/png/apple-login-button-row.svg';
import ToSignUpTextLine from '../../components/molecules/pressable_text/ToSignUpTextLine.tsx';
import TermsAndPrivacyPolicyAgreement from '../../components/molecules/pressable_text/PressableUnderlineText.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';

export type EntryScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'Entry'
>;

function EntryScreen() {
  const navigation = useNavigation<EntryScreenNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {signInWithKakao, kakaoLoginStatus} = useKakaoLogin();
  const {signInWithGoogle, googleLoginStatus} = useGoogleLogin();
  const {signInWithNaver, naverLoginStatus} = useNaverLogin();
  const {signInWithApple, appleLoginStatus} = useAppleLogin();

  useEffect(() => {
    let newUserType = null;
    if (kakaoLoginStatus.newUser) {
      newUserType = 'KAKAO';
    } else if (googleLoginStatus.newUser) {
      newUserType = 'GOOGLE';
    } else if (naverLoginStatus.newUser) {
      newUserType = 'NAVER';
    } else if (appleLoginStatus.newUser) {
      newUserType = 'APPLE';
    }

    if (newUserType && !loginError) {
      // @ts-ignore
      navigation.navigate('SignUpNickNameSocial', {type: newUserType});
    }

    if (loginError) {
      Alert.alert('안내', loginError);
      setLoginError(null); // Reset the error after showing the alert
    }
  }, [
    kakaoLoginStatus,
    googleLoginStatus,
    naverLoginStatus,
    appleLoginStatus,
    loginError,
    navigation,
  ]);

  const handleLoginError = (error: any) => {
    if (error?.code === '40400') {
      setIsModalVisible(true);
    }
  };

  const goBasicLogin = () => {
    navigation.navigate('BasicLogin');
  };

  return (
    <View style={styles.container}>
      <MainTitle
        text1="내 취향을 기반으로"
        text2="팝업스토어를 관리하고 저장해요"
        isPoppinLogo={true}
      />
      <View style={{paddingBottom: 25}}>
        <SvgImgButton
          SvgComponent={BasicLoginButton}
          onPress={signInWithApple}
        />
      </View>
      <SvgImgButton SvgComponent={BasicLoginButton} onPress={goBasicLogin} />
      <ToSignUpTextLine
        titleText={'아직 POPPIN회원이 아니신가요?'}
        onPress={() => navigation.navigate('SignUpEmail')}
      />
      <View style={{paddingTop: 80}}>
        <Text style={[styles.snsLoginText, Text14B.text]}>
          다른 방법으로 로그인하기
        </Text>
        <SocialLoginButtonRow
          onPressNaver={signInWithNaver}
          onPressGoogle={signInWithGoogle}
          onPressApple={signInWithKakao}
        />
      </View>
      <TermsAndPrivacyPolicyAgreement
        onLocationPrivacyPolicyPress={() =>
          Linking.openURL(
            'https://translucent-saver-b25.notion.site/592d1e8dbf5749b4abaa93619aa9880f?pvs=258',
          )
        }
        onPrivacyPolicyPress={() =>
          Linking.openURL(
            'https://translucent-saver-b25.notion.site/2-21ver-7f7b0bf6605748c388f2c0484f093808',
          )
        }
        onTermsOfServicePress={() =>
          Linking.openURL(
            'https://translucent-saver-b25.notion.site/2-13ver-fffbe3f598b14e2e9723486c33b38128?pvs=74',
          )
        }
      />

      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        mainTitle="등록되지 않은 사용자에요"
        subTitle="해당 계정은 존재하지 않습니다."
        isAlertSvg={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  snsLoginText: {
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default EntryScreen;
