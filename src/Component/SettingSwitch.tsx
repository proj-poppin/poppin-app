// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Switch,
//   Alert,
//   Linking,
//   Platform,
// } from 'react-native';
// import globalColors from '../styles/color/globalColors';
// import text14M from '../styles/texts/body_medium/Text14M.ts';
// import text18M from '../styles/texts/body_large/Text18M.ts';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import messaging from '@react-native-firebase/messaging';
//
// type SettingSwitchProps = {
//   label: string;
//   desc?: string;
//   name: string;
//   isAlarm: boolean;
//   isEnable: boolean;
//   onChange: (name: string, value: boolean) => void;
// };
//
// const SettingSwitch: React.FC<SettingSwitchProps> = ({
//   label,
//   desc,
//   name,
//   isAlarm,
//   isEnable,
//   onChange,
// }) => {
//   const [isAlarmAll, setIsAlarmAll] = useState(isAlarm);
//   const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);
//
//   useEffect(() => {
//     setIsAlarmAll(isAlarm);
//   }, [isAlarm]);
//
//   const requestNotificationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       const authStatus = await messaging().requestPermission();
//       return (
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL
//       );
//     } else {
//       const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//       return result === RESULTS.GRANTED;
//     }
//   };
//
//   const toggleSwitch = async () => {
//     if (name === 'pushYn' && !isAlarmAll) {
//       setIsSwitchDisabled(true); // 스위치 비활성화
//       const hasPermission = await requestNotificationPermission();
//       setIsSwitchDisabled(false); // 스위치 활성화
//
//       if (!hasPermission) {
//         Alert.alert(
//           '알림 권한 필요',
//           '푸시 알림 권한이 필요합니다. 설정에서 알림 권한을 허용해주세요.',
//           [
//             {text: '취소', style: 'cancel'},
//             {text: '설정 열기', onPress: () => Linking.openSettings()},
//           ],
//         );
//         return;
//       }
//     }
//
//     setIsAlarmAll(previousState => !previousState);
//     onChange(name, !isAlarmAll);
//   };
//
//   return (
//     <View style={styles.switchContainer}>
//       <View style={styles.textWrapper}>
//         <Text style={[text18M.text]}>{label}</Text>
//         {desc && (
//           <Text style={[text14M.text, {color: globalColors.font}]}>{desc}</Text>
//         )}
//       </View>
//       <Switch
//         ios_backgroundColor={globalColors.toggleBackground}
//         disabled={!isEnable || isSwitchDisabled}
//         trackColor={{
//           false: isEnable ? globalColors.white : globalColors.component,
//           true: isEnable ? globalColors.blue : globalColors.component,
//         }}
//         thumbColor={globalColors.white}
//         onValueChange={toggleSwitch}
//         value={isAlarmAll}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   textWrapper: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   desc: {
//     fontSize: 14,
//     color: globalColors.black,
//   },
//   disabledText: {
//     // color: globalColors.toggleBackground,
//   },
// });
//
// export default SettingSwitch;
