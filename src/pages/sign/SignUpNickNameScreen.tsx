import {StyleSheet, View} from 'react-native';
import React from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import MainTitle from '../../components/organisms/header/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import useSignUpNickName from '../../hooks/useSignUpNickName.tsx';

function SignUpNickNameScreen({navigation}) {
  const {
    nickname,
    nicknameError,
    birthDate,
    isNicknameValid,
    isBirthDateValid,
    handleChangeNickname,
    handleChangeBirthDate,
  } = useSignUpNickName();

  const handlePress = async () => {
    if (!isNicknameValid || !isBirthDateValid) {
      return;
    }
    console.log('birthDate', birthDate);
    console.log('nickname', nickname);
    navigation.navigate('SignUpSucceed', {nickname});
  };

  return (
    <View style={styles.container}>
      <MainTitle text1="POPPIN에서" text2="사용 할 정보를 알려주세요" />
      <LabelAndInput
        onChangeText={handleChangeNickname} // For nickname
        placeholder="한글/영 10자 이하(공백포함)"
        keyboardType="default"
        labelText={'닉네임'}
        errorText={nicknameError} // Pass the error text to the component
      />
      <LabelAndInput
        onChangeText={handleChangeBirthDate} // For birth date, use the new handler
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
