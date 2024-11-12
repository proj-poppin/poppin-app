// import React from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import globalColors from '../styles/color/globalColors.ts';
// import AlertSvg from '../assets/images/alert.svg';
// import Text20B from '../styles/texts/title/Text20B.ts';
// import Text14B from '../styles/texts/body_medium/Text14B.ts';
// import Text16M from '../styles/texts/body_medium_large/Text16M.ts';
//
// const TwoSelectConfirmationModal = ({
//   isVisible = false,
//   onClose = () => {},
//   onConfirm = () => {},
//   mainAlertTitle = '',
//   subAlertTitle = '',
//   selectFirstText = '',
//   selectSecondText = '',
//   onBlankSpacePressed = () => {},
// }) => {
//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}>
//       <TouchableWithoutFeedback onPress={onBlankSpacePressed}>
//         <View style={styles.overlayStyle}>
//           <View style={styles.modalView}>
//             <AlertSvg />
//             <Text style={[Text20B.text, styles.mainText, {marginTop: 10}]}>
//               {mainAlertTitle}
//             </Text>
//             <Text
//               style={[
//                 Text14B.text,
//                 {color: globalColors.font},
//                 styles.subText,
//               ]}>
//               {subAlertTitle}
//             </Text>
//             <View style={styles.buttonContainer}>
//               <Pressable
//                 style={[styles.button, styles.continueButton]}
//                 onPress={onClose}>
//                 <Text style={[Text16M.text, {color: globalColors.font}]}>
//                   {selectFirstText}
//                 </Text>
//               </Pressable>
//               <Text
//                 style={{
//                   color: globalColors.warmGray,
//                   alignSelf: 'center',
//                   paddingBottom: 8,
//                   fontSize: 24,
//                 }}>
//                 |
//               </Text>
//               <Pressable
//                 style={[styles.button, styles.deleteButton]}
//                 onPress={() => {
//                   onConfirm(); // 삭제하기 버튼을 누를 때 onConfirm 함수 호출
//                 }}>
//                 <Text style={[Text16M.text, {color: globalColors.blue}]}>
//                   {selectSecondText}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };
//
// const styles = StyleSheet.create({
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlayStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   mainText: {
//     marginBottom: 15, // 메인 텍스트와 서브 텍스트 사이의 간격
//   },
//   subText: {
//     marginBottom: 20, // 서브 텍스트와 버튼 사이의 간격
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%', // 버튼을 모달 너비에 맞춤
//   },
//   button: {
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginHorizontal: 10, // 버튼 사이의 간격
//     elevation: 2,
//   },
//   continueButton: {
//     backgroundColor: globalColors.white, // 계속 사용하기 버튼 배경색
//   },
//   deleteButton: {
//     backgroundColor: globalColors.white, // 탈퇴하기 버튼 배경색
//   },
// });
//
// export default TwoSelectConfirmationModal;
