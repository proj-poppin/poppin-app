import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import MainTitle from '../../components/MainTitle';
import SocialLoginButtonRow from '../../utils/function/SocialLoginButtonRow.tsx';
import {useKakaoLogin} from '../../hooks/useKakaoLogin.tsx';
import {useGoogleLogin} from '../../hooks/useGoogleLogin.tsx';
import {useNaverLogin} from '../../hooks/useNaverLogin.tsx';
import {useAppleLogin} from '../../hooks/useAppleLogin.tsx';
import KakaoLoginButton from '../../assets/icons/social_login/kakaoLoginButton.svg';
import SvgImgButton from '../../components/atoms/button/SvgPressableImageButton.tsx';
import BasicLoginButton from '../../assets/icons/social_login/basicLoginButton.svg';
import ToSignUpTextLine from '../../components/molecules/pressable_text/ToSignUpTextLine.tsx';
import TermsAndPrivacyPolicyAgreement from '../../components/molecules/pressable_text/PressableUnderlineText.tsx';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type EntryScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'Entry'
>;

function EntryScreen() {
  const navigation = useNavigation<EntryScreenNavigationProp>();

  const {signInWithKakao} = useKakaoLogin();
  const {signInWithGoogle} = useGoogleLogin();
  const {login: signInWithNaver} = useNaverLogin();
  const {signInWithApple} = useAppleLogin();

  const goBasicLogin = () => {
    navigation.navigate('BasicLogin');
  };

  return (
    <View style={styles.container}>
      <MainTitle
        text1="내 취향을 기반으로"
        text2="팝업스토어를 관리하고 저장해요"
      />
      <View style={{paddingBottom: 25}}>
        <SvgImgButton SvgComponent={BasicLoginButton} onPress={goBasicLogin} />
      </View>
      <SvgImgButton SvgComponent={KakaoLoginButton} onPress={signInWithKakao} />
      <ToSignUpTextLine onPress={() => navigation.navigate('SignUp')} />
      <View style={{paddingTop: 80}}>
        <Text style={styles.snsLoginText}>다른 방법으로 로그인하기</Text>
        <SocialLoginButtonRow
          onPressNaver={signInWithNaver}
          onPressGoogle={signInWithGoogle}
          onPressApple={Platform.OS === 'ios' ? signInWithApple : undefined}
        />
      </View>
      <TermsAndPrivacyPolicyAgreement
        onPrivacyPolicyPress={() => navigation.navigate('PrivacyPolicy')}
        onTermsOfServicePress={() => navigation.navigate('TermsOfService')}
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
