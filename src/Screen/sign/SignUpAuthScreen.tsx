// import React, {useEffect, useState} from 'react';
// import {Alert, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
// import SignUpOrderHeader from '../../components/organisms/header/SignUpOrderHeader.tsx';
// import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
// import MainTitle from '../../components/organisms/header/MainTitle.tsx';
// import ResendButton from '../../components/molecules/pressable_text/ResendButton.tsx';
// import LabelText20B from '../../components/atoms/label/LabelText20B.tsx';
// import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
// import AuthCodeTextFormField from '../../components/molecules/form_field/AuthCodeTextFormField.tsx';
// import useAuthCode from '../../hooks/signUp/useAuthCode.tsx';
// import useEmailVerification from '../../hooks/signUp/useEmailVerification.tsx';
// import {useSelector} from 'react-redux';
// import globalColors from '../../styles/color/globalColors.ts';
//
// function SignUpAuthScreen({navigation, route}) {
//   const [loading, setLoading] = useState(false);
//   const [requestCompleted, setRequestCompleted] = useState(false);
//   const {code, setCode, countdown, resetCountdown, setFocus} = useAuthCode();
//   const {email} = useSelector(state => state.user);
//   const {authCode, setAuthCode, verifyEmail} = useEmailVerification(email);
//
//   useEffect(() => {
//     setAuthCode(route.params.authCode);
//     resetCountdown();
//   }, [route.params, setAuthCode, resetCountdown]);
//
//   useFocusEffect(
//     React.useCallback(() => {
//       setFocus(true);
//
//       return () => {
//         setFocus(false);
//       };
//     }, [setFocus]),
//   );
//
//   const handleResendPress = () => {
//     setLoading(true);
//     setRequestCompleted(false);
//     verifyEmail()
//       .then(() => {
//         setLoading(false);
//         setRequestCompleted(true);
//         resetCountdown();
//         setTimeout(() => {
//           setRequestCompleted(false);
//         }, 3000);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//
//   const handlePress = () => {
//     if (code === authCode) {
//       navigation.navigate('SignUpNickName');
//     } else {
//       Alert.alert('인증 코드가 일치하지 않습니다.');
//     }
//   };
//
//   return (
//     <DismissKeyboardView>
//       <View style={styles.container}>
//         <SignUpOrderHeader currentStep="SignUpAuthCode" />
//         <MainTitle text1="회원님의 이메일로" text2="확인 코드를 전송했어요" />
//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>인증번호 요청중입니다...</Text>
//             <ActivityIndicator color={globalColors.blue} />
//           </View>
//         ) : requestCompleted ? (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>
//               요청완료! 코드를 확인해주세요!
//             </Text>
//           </View>
//         ) : (
//           <ResendButton onPressed={handleResendPress} />
//         )}
//         <View style={{height: 120}} />
//         <LabelText20B text="확인 코드 입력" />
//         <AuthCodeTextFormField
//           code={code}
//           setCode={setCode}
//           countdown={countdown}
//         />
//         <CompleteButton
//           onPress={handlePress}
//           title="완료"
//           disabled={code.length === 0}
//         />
//       </View>
//     </DismissKeyboardView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginRight: 10,
//     color: globalColors.blue,
//   },
// });
//
// export default SignUpAuthScreen;
