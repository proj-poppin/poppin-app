// import React from 'react';
// import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
// import globalColors from '../../styles/color/globalColors.ts';
// import Text18B from '../../styles/texts/body_large/Text18B.ts';
//
// interface NextMiddleButtonProps {
//   onPress: () => void;
//   title: string;
//   loading?: boolean;
//   disabled?: boolean;
//   alwaysActive?: boolean;
//   buttonWidth?: number | string;
// }
//
// const NextMiddleButton: React.FC<NextMiddleButtonProps> = ({
//   onPress,
//   title,
//   loading = false,
//   disabled = false,
//   alwaysActive = false,
//   buttonWidth = '50%',
// }) => (
//   <Pressable
//     style={({pressed}) => [
//       styles.button,
//       {
//         backgroundColor: pressed
//           ? globalColors.buttonPressed
//           : disabled && !alwaysActive
//           ? globalColors.component
//           : globalColors.blue,
//         width: buttonWidth,
//       },
//       disabled && !alwaysActive && styles.disabledButton,
//     ]}
//     onPress={() => {
//       if (!disabled || alwaysActive) {
//         onPress();
//       }
//     }}
//     disabled={disabled && !alwaysActive}>
//     {loading ? (
//       <ActivityIndicator color={globalColors.white} />
//     ) : (
//       <Text
//         style={[
//           Text18B.text,
//           {
//             color:
//               disabled && !alwaysActive
//                 ? globalColors.font
//                 : globalColors.white,
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
//     width: '50%',
//     height: 52,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 35,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
//   text: {
//     // 이제 이 스타일은 필요 없으므로 제거합니다.
//   },
//   disabledButton: {
//     backgroundColor: globalColors.component,
//   },
// });
//
// export default NextMiddleButton;
