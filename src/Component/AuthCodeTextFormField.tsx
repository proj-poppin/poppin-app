// // AuthCodeTextFormField.tsx
// import React from 'react';
// import {View, Text, TextInput, StyleSheet} from 'react-native';
// import {themeColors} from '../Theme/theme';
//
// interface AuthCodeTextFormFieldProps {
//   code: string;
//   setCode: React.Dispatch<React.SetStateAction<string>>;
//   countdown: number;
// }
//
// const AuthCodeTextFormField: React.FC<AuthCodeTextFormFieldProps> = ({
//   code,
//   setCode,
//   countdown,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.timerContainer}>
//         <Text style={styles.timerText}>
//           {`${Math.floor(countdown / 60)}:${`0${countdown % 60}`.slice(
//             -2,
//           )}초 남음`}
//         </Text>
//       </View>
//       <TextInput
//         style={styles.textInput}
//         onChangeText={setCode}
//         placeholder="인증 코드 입력"
//         keyboardType="default"
//         value={code}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   textInput: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: themeColors().grey.mild,
//     padding: 10,
//     fontSize: 16,
//   },
//   timerContainer: {
//     position: 'absolute',
//     right: 0,
//     top: -20,
//   },
//   timerText: {
//     color: themeColors().blue.main,
//   },
// });
//
// export default AuthCodeTextFormField;
