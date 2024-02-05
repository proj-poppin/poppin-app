import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';

function NickNameSettingScreen({navigation}) {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const handleChangeNickname = text => {
    setNickname(text);
    const isValidNickname = /^[a-zA-Z가-힣\s]{1,10}$/.test(text);
    setIsNicknameValid(isValidNickname);
    console.log(isValidNickname);
  };

  const handlePress = () => {
    console.log('touched');
    navigation.navigate('SignUpSucceed', {nickname}); // Pass nickname as a parameter
  };

  return (
    <View style={styles.container}>
      <MainTitle text1="POPPIN에서" text2="사용 할 닉네임을 알려주세요" />
      <LabelAndInput
        onChangeText={handleChangeNickname} // Pass the function reference directly
        placeholder="한글/영 10자 이하(공백포함)"
        keyboardType="default"
        labelText={'닉네임'}
      />
      <CompleteButton
        title="완료"
        onPress={handlePress}
        loading={false}
        disabled={!isNicknameValid} // 버튼 활성화 조건 수정
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
    marginRight: 10, // 여기서 거리 조정
    color: primaryColors.font,
  },
});

export default NickNameSettingScreen;
