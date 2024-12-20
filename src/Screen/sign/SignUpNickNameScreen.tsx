import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import useSignUpNickName from '../../hooks/signUp/useSignUpNickName.tsx';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user.ts';
import useSignUp from '../../hooks/signUp/useSignUp.tsx';
import useRandomNickname from '../../hooks/signUp/useRandomNickname.tsx';
import Text12R from '../../styles/texts/label/Text12R.ts';

function SignUpNickNameScreen({navigation}) {
  const dispatch = useDispatch();
  const {handleSignUp, signUpStatus} = useSignUp();
  const {
    nickname,
    nicknameError,
    isNicknameValid,
    handleChangeNickname,
    setNickname,
  } = useSignUpNickName();

  const {nickname: randomNickname, loading: nicknameLoading} =
    useRandomNickname();

  useEffect(() => {
    if (randomNickname) {
      setNickname(randomNickname);
    }
  }, [randomNickname, setNickname]);

  useEffect(() => {
    if (signUpStatus.success) {
      navigation.navigate('SignUpSucceed', {nickname: nickname});
    }
    dispatch(
      userSlice.actions.setSignUpNickNameScreen({
        nickname: nickname,
      }),
    );
  }, [signUpStatus.success, navigation, nickname, dispatch, isNicknameValid]);

  const handlePress = async () => {
    dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
    await handleSignUp();
  };

  return (
    <View style={styles.container}>
      <SignUpOrderHeader currentStep="SignUpNickName" />
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
      <Text
        style={[
          Text12R.text,
          {color: globalColors.font},
          {position: 'absolute', top: 140, left: 20},
        ]}>
        *부적절한 닉네임은 제재를 받을 수 있으며 {'\n'} 초기 닉네임은 랜덤으로
        설정됩니다
      </Text>
      {nicknameLoading ? (
        <ActivityIndicator size="large" color={globalColors.purple} />
      ) : (
        <LabelAndInput
          onChangeText={handleChangeNickname}
          value={nickname}
          placeholder="한글/영 10자 이하(공백포함)"
          keyboardType="default"
          labelText={'닉네임'}
          errorText={nicknameError}
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
  helperText: {
    color: globalColors.font,
    fontSize: 12,
    marginBottom: 20,
  },
});

export default SignUpNickNameScreen;
