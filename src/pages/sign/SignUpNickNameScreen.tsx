import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import useSignUpNickName from '../../hooks/useSignUpNickName.tsx';
import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from '../../redux/slices/user.ts';
import useSignUp from '../../hooks/useSignUp.tsx';

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
  } = useSignUpNickName();
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (signUpStatus.success) {
      navigation.navigate('SignUpSucceed', {nickname: nickname});
    }
    dispatch(
      userSlice.actions.setSignUpNickNameScreen({
        nickname: nickname,
        birthDate: birthDate,
      }),
    );
  }, [signUpStatus.success, navigation, nickname, dispatch, birthDate]);

  const handlePress = async () => {
    dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));

    console.log('email:', user.email);
    console.log('nickname:', nickname);
    console.log('password:', user.password);
    console.log('Signing up...');
    await handleSignUp();
  };

  return (
    <View style={styles.container}>
      <SignUpOrderHeader currentStep="SignUpNickName" />
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
      <LabelAndInput
        onChangeText={handleChangeNickname}
        placeholder="한글/영 10자 이하(공백포함)"
        keyboardType="default"
        labelText={'닉네임'}
        errorText={nicknameError}
      />
      <LabelAndInput
        onChangeText={handleChangeBirthDate}
        placeholder="YYYY.MM.DD"
        keyboardType="default"
        labelText={'생년월일'}
      />
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!isNicknameValid || !isBirthDateValid} // Update condition to check both nickname and birth date
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

export default SignUpNickNameScreen;
