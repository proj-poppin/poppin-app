import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import React, {useEffect, useState} from 'react';
import ProfileAppBar from '../../components/ProfileAppBar.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import PasswordCheckTextFormField from '../../components/molecules/form_field/PasswordCheckTextFormField.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import useResetPassword from '../../hooks/password/useResetPassword.tsx';
import { useSelector } from 'react-redux';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import useGetUserSetting from '../../hooks/myPage/useGetUserSetting.tsx';

function PasswordChangeScreen({ navigation }: any) {
    const { data: userData } = useGetUserSetting()
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState(user.email || 'poppin@gmail.com'); 
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState(false);


  const canGoNext = isPasswordValid && isPasswordSame;

   const {resetUserPassword, resetPasswordStatus} = useResetPassword();

 

  const handleChangePassword = text => {
    setPassword(text);
    // 비밀번호 유효성 검사
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        text,
      );
    setIsPasswordValid(isValidPassword);
    // 비밀번호 확인 필드와의 일치 여부 검사
    checkPasswordMatch(text, passwordConfirm);
  };

  const handleSamePassword = (text: React.SetStateAction<string>) => {
    setPasswordConfirm(text);
    // 비밀번호 필드와의 일치 여부 검사
    checkPasswordMatch(password, text);
  };

  const checkPasswordMatch = (password, passwordConfirm) => {
    const isMatch = password === passwordConfirm;
    setIsPasswordSame(isMatch);
    if (isMatch && isPasswordValid) {
      // 비밀번호가 유효하고, 비밀번호와 비밀번호 확인이 일치할 경우 추가 로직 처리
      console.log('비밀번호 일치 및 유효성 통과');
    }
  };

  const handleSumbit = async () => {
    if (
      isPasswordSame 
    ) {
      
     await resetUserPassword(password, passwordConfirm).then();
    } else {
      Alert.alert('Error', 'Passwords do not match or meet the criteria.');
    }
  };

  
  useEffect(() => {
    navigation.setOptions(
      ProfileAppBar({
        navigation,
        appBarTitle: '비밀번호 변경',
        isHeaderRight: false,
      }),
    );
  }, [navigation]);

 useEffect(() => {
    if (resetPasswordStatus.success === true) {
       
       navigation.navigate('MyPage')
      setPassword("")
      setIsPasswordValid(false)
    }
    
  },[resetPasswordStatus])
  
  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
        {'POPPIN 계정의\n'}
        {'비밀번호를 변경해주세요'}
      </Text>
      <Text style={{marginTop: 25, marginBottom: 10}}>{'아이디'}</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          style={styles.emailInput}
          value={userData&&userData.email}
          editable={false} 
        />
      </View>
      <LabelAndInput
        onChangeText={handleChangePassword}
        placeholder="새 비밀번호"
        labelText={'비밀번호 설정'}
        isPassword={true}
        containerStyle={{marginBottom: 20}}
      />
      <LabelAndInput
        onChangeText={handleSamePassword}
        placeholder="새 비밀번호 확인"
        labelText={'비밀번호 확인'}
        isPassword={true}
        isPasswordSame={isPasswordSame}
        isPasswordSameSetting={true}
      />
      <Text
        style={[
          Text12R.text,
          {color: globalColors.font},
          {paddingVertical: 20},
        ]}>
        • 개인정보(연락처/생일)와 관련된 숫자 등 다른 사람이 알아낼 수 있는
        비밀번호는 사용하지 마세요.
      </Text>
      <CompleteButton
        title="완료"
        onPress={handleSumbit}
        loading={false}
        disabled={!canGoNext}
        alwaysActive={false}
        // onDisabledPress={() => setError('✕ 아이디를 입력해주세요')}
      />
    </DismissKeyboardView>
  );
}

export default PasswordChangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 15,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.component,
    borderRadius: 30,
    padding: 10,
    marginBottom:20
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: 'black',
    marginBottom: 30,
  },
  emailInput: {
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: globalColors.font,
  },
});
