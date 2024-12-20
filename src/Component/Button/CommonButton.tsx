// import React from 'react';
// import {
//   Pressable,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   View,
// } from 'react-native';
// import globalColors from '../../styles/color/globalColors.ts';
// import Text18B from '../../styles/texts/body_large/Text18B.ts';
// import RealTimeInfoSvg from '../../../assets/detail/realTimeInfo.svg';
// import Text14B from '../../styles/texts/body_medium/Text14B.ts';
//
// interface CommonButtonProps {
//   onPress: () => void;
//   onDisabledPress?: () => void;
//   title?: string;
//   loading?: boolean;
//   disabled?: boolean;
//   alwaysActive?: boolean;
//   buttonWidth?: number | string;
//   borderColor?: string;
//   buttonTextColor?: string;
//   cnt?: number;
//   isRealTimeInfo?: boolean;
//   backgroundColor?: string; // New optional prop for background color
// }
//
// const CommonButton: React.FC<CommonButtonProps> = ({
//   onPress,
//   onDisabledPress,
//   title = 'Button Text', // Default button text
//   loading = false,
//   disabled = false,
//   alwaysActive = false,
//   cnt,
//   isRealTimeInfo = false,
//   buttonWidth = '50%', // Default button width
//   borderColor = globalColors.blue, // Default border color
//   buttonTextColor = globalColors.blue, // Default button text color
//   backgroundColor = globalColors.white, // Default background color
// }) => (
//   <Pressable
//     style={({pressed}) => [
//       styles.button,
//       {
//         borderColor: borderColor,
//         borderWidth: disabled && !alwaysActive ? 0 : 1,
//         width: buttonWidth,
//         backgroundColor: backgroundColor,
//       },
//       disabled && !alwaysActive && styles.disabledButton,
//     ]}
//     onPress={() => {
//       if (!disabled || alwaysActive) {
//         onPress();
//       } else {
//         onDisabledPress?.();
//       }
//     }}
//     disabled={disabled && !alwaysActive}>
//     {loading ? (
//       <ActivityIndicator color={globalColors.blue} />
//     ) : isRealTimeInfo && cnt !== undefined ? (
//       <View style={styles.realTimeInfoContainer}>
//         <RealTimeInfoSvg />
//         <Text style={[Text14B.text, {color: globalColors.font}]}>{title}</Text>
//         <Text style={[styles.count, {color: globalColors.blue}]}>
//           {`+${cnt}명`}
//         </Text>
//       </View>
//     ) : (
//       <Text
//         style={[
//           Text18B.text,
//           {
//             color: buttonTextColor,
//           },
//         ]}>
//         {title}
//       </Text>
//     )}
//   </Pressable>
// );
//
// const styles = StyleSheet.create({
//   button: {
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   disabledButton: {
//     backgroundColor: globalColors.blue,
//     borderColor: 'transparent', // Hide border for disabled state
//   },
//   realTimeInfoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   count: {
//     marginLeft: 4,
//     fontSize: 16, // Adjust the font size as needed
//     fontWeight: 'bold',
//   },
// });
//
// export default CommonButton;
