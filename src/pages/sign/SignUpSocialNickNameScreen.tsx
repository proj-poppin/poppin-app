import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import useSignUpNickName from '../../hooks/signUp/useSignUpNickName.tsx';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import useSocialSignUp from '../../hooks/login/useSocialSignUp.tsx';
type SignUpSocialNickNameScreenRouteParams = {
  type: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE';
};
function SignUpSocialNickNameScreen({navigation, route}) {
  const {
    nickname,
    nicknameError,
    birthDate,
    isNicknameValid,
    isBirthDateValid,
    handleChangeNickname,
    handleChangeBirthDate,
  } = useSignUpNickName();
  const {signUpWithSocial, signUpStatus} = useSocialSignUp();
  useEffect(() => {
    if (signUpStatus.success) {
      navigation.navigate('SignUpSucceed', {nickname: nickname});
    }
  }, [signUpStatus.success, navigation, nickname]);
  const {type} = route.params as SignUpSocialNickNameScreenRouteParams;
  console.log(type);
  const handlePress = async () => {
    if (!isNicknameValid || !isBirthDateValid) {
      Alert.alert('오류', '닉네임 또는 생년월일이 유효하지 않습니다.');
      return;
    }
    await signUpWithSocial(type, nickname, birthDate);
    console.log('type: ', type);
    console.log('nickname: ', nickname);
    console.log('birthDate: ', birthDate);
  };

  return (
    <View style={styles.container}>
      <SignUpOrderHeader currentStep="SignUpNickName" />
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
      <LabelAndInput
        onChangeText={handleChangeNickname} // For nickname
        placeholder="한글/영 10자 이하(공백포함)"
        keyboardType="default"
        labelText={'닉네임'}
        errorText={nicknameError}
        value={nickname} // Add value prop here
      />
      <LabelAndInput
        onChangeText={handleChangeBirthDate}
        placeholder="YYYY.MM.DD"
        keyboardType="default"
        labelText={'생년월일'}
        value={birthDate} // Add value prop here
      />
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!isNicknameValid || !isBirthDateValid}
        alwaysActive={false}
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
  memberInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  infoText: {
    marginRight: 10, // Adjust distance here
    color: globalColors.font,
  },
});

export default SignUpSocialNickNameScreen;
