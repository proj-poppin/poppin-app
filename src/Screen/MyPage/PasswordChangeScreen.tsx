// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import globalColors from '../../styles/color/globalColors.ts';
// import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
// import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
// import Text20B from '../../styles/texts/title/Text20B.ts';
// import Text12R from '../../styles/texts/label/Text12R.ts';
// import LabelAndInput from '../../components/LabelAndInput.tsx';
// import useGetUserSetting from '../../hooks/myPage/useGetUserSetting.tsx';
// import useConfirmPassword from '../../hooks/myPage/useConfirmPassword.tsx';
// import useResetPasswordNonPublic from '../../hooks/password/useResetPasswordNonPublic.tsx';
// import GoBackSvg from 'src/Resource/svg/left-arrow-black-icon.svg';
// import ToSignUpTextLine from '../../components/molecules/pressable_text/ToSignUpTextLine.tsx';
// import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
//
// type PasswordChangeScreenNavigationProp = NativeStackNavigationProp<
//   AppNavigatorParamList,
//   'PasswordChange'
// >;
//
// export const PasswordChangeOptions = ({
//   navigation,
// }: {
//   navigation: PasswordChangeScreenNavigationProp;
// }) => ({
//   headerTitle: '비밀번호 변경',
//   headerLeft: () => (
//     <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
//       <GoBackSvg />
//     </Pressable>
//   ),
// });
//
// function PasswordChangeScreen({navigation}: any) {
//   const {data: userData} = useGetUserSetting();
//   const {confirmPassword, ...confirmPasswordState} = useConfirmPassword();
//   const {resetUserPasswordNonPublic, resetPasswordStatus} =
//     useResetPasswordNonPublic();
//   const user = useSelector(state => state.user);
//
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//
//   const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
//   const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
//   const [isNewPasswordSame, setIsNewPasswordSame] = useState(false);
//   const [isPasswordCheckDone, setIsPasswordCheckDone] = useState(false);
//
//   const canGoNext = isNewPasswordValid && isNewPasswordSame;
//
//   const handleCurrentPasswordChange = (text: string) => {
//     setCurrentPassword(text);
//     const isValidPassword =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
//         text,
//       );
//     setIsCurrentPasswordValid(isValidPassword);
//   };
//
//   const handleNewPasswordChange = (text: string) => {
//     setNewPassword(text);
//     const isValidPassword =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
//         text,
//       );
//     setIsNewPasswordValid(isValidPassword);
//     checkPasswordMatch(text, confirmNewPassword);
//   };
//
//   const handleConfirmNewPasswordChange = (text: string) => {
//     setConfirmNewPassword(text);
//     checkPasswordMatch(newPassword, text);
//   };
//
//   const checkPasswordMatch = (password: string, confirmPassword: string) => {
//     const isMatch = password === confirmPassword;
//     setIsNewPasswordSame(isMatch);
//   };
//
//   const handlePasswordCheckSubmit = async () => {
//     await confirmPassword(currentPassword);
//   };
//
//   const handlePasswordChangeSubmit = async () => {
//     if (isNewPasswordSame) {
//       await resetUserPasswordNonPublic(newPassword, confirmNewPassword);
//     } else {
//       Alert.alert('Error', 'Passwords do not match or meet the criteria.');
//     }
//   };
//   useEffect(() => {
//     if (confirmPasswordState.success) {
//       setIsPasswordCheckDone(true);
//       setCurrentPassword('');
//       setIsCurrentPasswordValid(false);
//     }
//   }, [confirmPasswordState]);
//   useEffect(() => {
//     if (resetPasswordStatus.success) {
//       navigation.navigate('MyPage');
//       setNewPassword('');
//       setConfirmNewPassword('');
//       setIsNewPasswordValid(false);
//     }
//   }, [navigation, resetPasswordStatus]);
//   return (
//     <DismissKeyboardView style={styles.container}>
//       <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
//         {'POPPIN 계정의\n'}
//         {'비밀번호를 변경해주세요'}
//       </Text>
//       <Text style={{marginTop: 25, marginBottom: 10}}>{'아이디'}</Text>
//       <View style={styles.emailInputContainer}>
//         <TextInput
//           style={styles.emailInput}
//           value={userData && userData.email}
//           editable={false}
//         />
//       </View>
//       {!isPasswordCheckDone ? (
//         <>
//           <LabelAndInput
//             onChangeText={handleCurrentPasswordChange}
//             placeholder="현재 비밀번호"
//             labelText={'현재 비밀번호'}
//             isPassword={true}
//             value={currentPassword}
//           />
//           {!confirmPasswordState.success && (
//             <Text style={{color: 'red', marginLeft: 10, marginBottom: 20}}>
//               {confirmPasswordState.error?.message}
//             </Text>
//           )}
//           <View style={{marginTop: 220}}>
//             <ToSignUpTextLine
//               titleText={'현재 비밀번호가 기억나지 않으세요?'}
//               onPress={() => navigation.navigate('PasswordReset')}
//             />
//           </View>
//           <CompleteButton
//             onPress={handlePasswordCheckSubmit}
//             title={'다음 '}
//             disabled={!isCurrentPasswordValid}
//           />
//         </>
//       ) : (
//         <>
//           <LabelAndInput
//             onChangeText={handleNewPasswordChange}
//             placeholder="새 비밀번호"
//             labelText={'새 비밀번호'}
//             isPassword={true}
//             value={newPassword}
//           />
//           <LabelAndInput
//             onChangeText={handleConfirmNewPasswordChange}
//             placeholder="새 비밀번호 확인"
//             labelText={'새 비밀번호 확인'}
//             isPassword={true}
//             isPasswordSame={isNewPasswordSame}
//             value={confirmNewPassword}
//           />
//           <Text
//             style={[
//               Text12R.text,
//               {color: globalColors.font},
//               {paddingVertical: 20},
//             ]}>
//             • 개인정보(연락처/생일)와 관련된 숫자 등 다른 사람이 알아낼 수 있는
//             비밀번호는 사용하지 마세요.
//           </Text>
//           <CompleteButton
//             title="완료"
//             onPress={handlePasswordChangeSubmit}
//             loading={false}
//             disabled={!canGoNext}
//             alwaysActive={false}
//           />
//         </>
//       )}
//     </DismissKeyboardView>
//   );
// }
//
// export default PasswordChangeScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: globalColors.white,
//     paddingHorizontal: 15,
//   },
//   emailInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: globalColors.component,
//     borderRadius: 30,
//     padding: 10,
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     textDecorationLine: 'underline',
//     color: globalColors.font,
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   emailInput: {
//     flex: 1,
//     marginLeft: 10,
//     color: globalColors.font,
//   },
// });
