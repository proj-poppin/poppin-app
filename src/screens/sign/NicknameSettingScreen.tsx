import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import axios from 'axios';
import Config from 'react-native-config';

function NickNameSettingScreen({route, navigation}) {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);

  const {email, password, passwordConfirm} = route.params;

  const handleChangeNickname = text => {
    setNickname(text);
    if (text.length > 10) {
      setNicknameError('10자 이하로 입력해 주세요.');
    } else {
      setNicknameError(''); // Reset error message when condition is met
    }
    const isValidNickname = /^[a-zA-Z가-힣\s]{1,10}$/.test(text);
    setIsNicknameValid(isValidNickname && text.length <= 10);
  };

  const handleChangeBirthDate = text => {
    setBirthDate(text);
    console.log(text);
    const isValidBirthDate = /^\d{4}.\d{2}.\d{2}$/.test(text); // Validates YYYY.MM.DD format
    console.log(isValidBirthDate);
    setIsBirthDateValid(isValidBirthDate);
  };

  const handlePress = async () => {
    // 유효성 검사 등의 로직 후 회원가입 요청
    if (!isNicknameValid || !isBirthDateValid) {
      console.log('유효성 검사 실패');
      return;
    }
    try {
      console.log('회원가입 요청 시작');
      const response = await axios.post(
        `${Config.API_URL}/api/v1/sign-in`,
        {
          email: email,
          password: password,
          name: nickname,
          birthDate: birthDate,
          agreedToPrivacyPolicy: true,
          agreedToServiceTerms: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('회원가입 성공:', response.data);
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('회원가입 실패:', error);
    }
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
    color: primaryColors.font,
  },
});

export default NickNameSettingScreen;
