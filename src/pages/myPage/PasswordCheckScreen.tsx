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
import useConfirmPassword from '../../hooks/myPage/useConfirmPassword.tsx';

function PasswordCheckScreen({ navigation }: any) {
  const { data: userData } = useGetUserSetting()

  const [password, setPassword] = useState('');
  
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const {confirmPassword,...confirmPasswordState}=useConfirmPassword()


  const handleChangePassword = (text:string) => {
    setPassword(text);
    // 비밀번호 유효성 검사
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        text,
      );
    setIsPasswordValid(isValidPassword);
    // 비밀번호 확인 필드와의 일치 여부 검사
    // checkPasswordMatch(text, passwordConfirm);
  };

  // const handleSamePassword = (text: React.SetStateAction<string>) => {
  //   setPasswordConfirm(text);
  //   // 비밀번호 필드와의 일치 여부 검사
  //   // checkPasswordMatch(password, text);
  // };

  // const checkPasswordMatch = (password, passwordConfirm) => {
  //   const isMatch = password === passwordConfirm;
  //   setIsPasswordSame(isMatch);
  //   if (isMatch && isPasswordValid) {
  //     // 비밀번호가 유효하고, 비밀번호와 비밀번호 확인이 일치할 경우 추가 로직 처리
  //     console.log('비밀번호 일치 및 유효성 통과');
  //   }
  // };

  

  const handleSumbit = async() => {

    await confirmPassword(password)
   
  }
  useEffect(() => {
     if (confirmPasswordState.success === true) {
       navigation.navigate('PasswordChange')
       setPassword("")
    }
    
  },[confirmPasswordState])
      
 

  useEffect(() => {
    navigation.setOptions(
      ProfileAppBar({
        navigation,
        appBarTitle: '비밀번호 변경',
        isHeaderRight: false,
      }),
    );
  }, [navigation]);

  const handleForgotPasswordPress = () => {
    // Navigate to your desired screen
    navigation.navigate('ForgotPasswordScreen'); // Replace 'ForgotPasswordScreen' with your actual screen name
  };

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
          value={userData &&userData?.email}
          editable={false} 
        />
      </View>
      <View style={{marginBottom: 20}} />
      <LabelAndInput
        onChangeText={handleChangePassword}
        placeholder="현재 비밀번호"
        keyboardType="default"
        labelText={'비밀번호 설정'}
        isPassword={true}
        isPasswordSetting={true}
        value={password}
        // containerStyle={{marginBottom: 10}}
      />
      {!confirmPasswordState.success && <Text style={{color:"red",marginLeft:10,marginBottom:20}}>{confirmPasswordState.error?.message}</Text>}
      <Pressable onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>
          현재 비밀번호가 기억나지 않으세요?
        </Text>
      </Pressable>
      <Pressable
        disabled={!isPasswordValid}
        onPress={handleSumbit}
        style={{ height: 60, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <View style={{height:"80%",width:"80%",backgroundColor:globalColors.blue,borderRadius:30,display:"flex",justifyContent:"center"}}>
          <Text style={{textAlign:"center",color:"white",fontSize:18}}>다음</Text>
        </View>
      </Pressable>
     
     
    </DismissKeyboardView>
  );
}


export default PasswordCheckScreen;

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
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: globalColors.font,
    marginBottom: 30,
    textAlign:"center"
  },
  emailInput: {
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: globalColors.font,
  },
});
