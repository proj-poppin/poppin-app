import {Alert, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import useSignUpNickName from '../../hooks/signUp/useSignUpNickName.tsx';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import useSocialSignUp from '../../hooks/login/useSocialSignUp.tsx';
import useRandomNickname from '../../hooks/signUp/useRandomNickname.tsx';
import Text12R from '../../styles/texts/label/Text12R.ts';

type SignUpSocialNickNameScreenRouteParams = {
  type: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE';
};

function SignUpSocialNickNameScreen({navigation, route}) {
  const {
    nickname,
    nicknameError,
    isNicknameValid,
    handleChangeNickname,
    setNickname,
  } = useSignUpNickName();

  const {signUpWithSocial, signUpStatus} = useSocialSignUp();
  const {nickname: randomNickname, loading: nicknameLoading} =
    useRandomNickname();

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (randomNickname) {
      setNickname(randomNickname);
    }
  }, [randomNickname, setNickname]);

  useEffect(() => {
    if (signUpStatus.success) {
      navigation.navigate('SignUpSucceed', {nickname: nickname});
    }
  }, [signUpStatus.success, navigation, nickname]);

  const {type} = route.params as SignUpSocialNickNameScreenRouteParams;

  const handlePress = async () => {
    if (!isNicknameValid) {
      Alert.alert('오류', '닉네임이 유효하지 않습니다.');
      return;
    }
    await signUpWithSocial(type, nickname);
  };

  return (
    <View style={styles.container}>
      <SignUpOrderHeader currentStep="SignUpNickName" />
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
      <Text
        style={[
          Text12R.text,
          {color: globalColors.red},
          {position: 'absolute', top: 140, left: 20},
        ]}>
        *부적절한 닉네임은 제재를 받을 수 있습니다. {'\n'}
      </Text>
      {nicknameLoading ? (
        <ActivityIndicator size="large" color={globalColors.purple} />
      ) : (
        <LabelAndInput
          onChangeText={handleChangeNickname}
          placeholder="한글/영 10자 이하(공백포함)"
          keyboardType="default"
          labelText={'닉네임'}
          errorText={nicknameError}
          value={nickname}
        />
      )}
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={signUpStatus.loading}
        disabled={!isNicknameValid || nicknameLoading}
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
    marginRight: 10,
    color: globalColors.font,
  },
});

export default SignUpSocialNickNameScreen;
