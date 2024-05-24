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

function SignUpNickNameScreen({navigation}) {
  const dispatch = useDispatch();
  const {handleSignUp, signUpStatus} = useSignUp();
  const {
    nickname,
    nicknameError,
    birthDate,
    isNicknameValid,
    isBirthDateValid,
    handleChangeNickname,
    handleChangeBirthDate,
    setNickname,
  } = useSignUpNickName();

  const {nickname: randomNickname, loading: nicknameLoading} =
    useRandomNickname();

  useEffect(() => {
    if (randomNickname) {
      console.log('randomNickname', randomNickname);
      setNickname(randomNickname);
    }
  }, [randomNickname, setNickname]);

  useEffect(() => {
    if (signUpStatus.success) {
      navigation.navigate('SignUpSucceed', {nickname: nickname});
    }
    console.log('valid:', isNicknameValid, isBirthDateValid);
    dispatch(
      userSlice.actions.setSignUpNickNameScreen({
        nickname: nickname,
        birthDate: birthDate,
      }),
    );
  }, [
    signUpStatus.success,
    navigation,
    nickname,
    dispatch,
    birthDate,
    isNicknameValid,
    isBirthDateValid,
  ]);

  const handlePress = async () => {
    dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
    await handleSignUp();
  };

  const handleBirthDateChange = text => {
    // Automatically format birthdate
    let formattedText = text.replace(/[^0-9]/g, '');

    if (formattedText.length > 3) {
      formattedText = formattedText.slice(0, 4) + '.' + formattedText.slice(4);
    }
    if (formattedText.length > 6) {
      formattedText = formattedText.slice(0, 7) + '.' + formattedText.slice(7);
    }

    handleChangeBirthDate(formattedText);
  };

  return (
    <View style={styles.container}>
      <SignUpOrderHeader currentStep="SignUpNickName" />
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
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
      <LabelAndInput
        onChangeText={handleBirthDateChange}
        value={birthDate}
        placeholder="YYYY.MM.DD"
        keyboardType="default"
        labelText={'생년월일'}
      />
      <Text style={styles.helperText}>
        .은 자동 기입됩니다. 숫자만 입력해주세요!
      </Text>
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={signUpStatus.loading}
        disabled={!isNicknameValid || !isBirthDateValid || nicknameLoading}
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
