// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import globalColors from '../../styles/color/globalColors.ts';
// import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
// import CompleteButton from '../../components/CompleteButton.tsx';
// import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
// import CustomOKModal from '../../components/CustomOKModal.tsx';
// import Text20B from '../../styles/texts/title/Text20B.ts';
// import Text12R from '../../styles/texts/label/Text12R.ts';
//
// function PreferenceSettingScreen({navigation}) {
//   const [modalVisible, setModalVisible] = useState(false);
//
//   const [selections, setSelections] = useState({
//     type: [],
//     interest: [],
//     mate: [],
//   });
//
//   // 모달을 닫는 함수
//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };
//
//   // 각 단계에 맞는 제목 렌더링 함수
//   const renderTitleForStep = step => {
//     switch (step) {
//       case 1:
//         return '팝업 유형';
//       case 2:
//         return '관심사';
//       case 3:
//         return '팝업 MATE';
//       default:
//         return '';
//     }
//   };
//   // 옵션 선택 처리 함수
//   const handleSelectOption = (option, step) => {
//     setSelections(prevSelections => {
//       const newSelections = {...prevSelections};
//       switch (step) {
//         case 1:
//           // 타입 선택 업데이트
//           const typeIndex = newSelections.type.indexOf(option);
//           if (typeIndex === -1) {
//             newSelections.type = [option]; // 예시 코드에서는 단일 선택만을 가정합니다.
//           } else {
//             newSelections.type = [];
//           }
//           break;
//         case 2:
//           // 관심사 선택 업데이트
//           const interestIndex = newSelections.interest.indexOf(option);
//           if (interestIndex === -1) {
//             newSelections.interest.push(option);
//           } else {
//             newSelections.interest.splice(interestIndex, 1);
//           }
//           break;
//         case 3:
//           // 메이트 선택 업데이트
//           const mateIndex = newSelections.mate.indexOf(option);
//           if (mateIndex === -1) {
//             newSelections.mate = [option]; // 예시 코드에서는 단일 선택만을 가정합니다.
//           } else {
//             newSelections.mate = [];
//           }
//           break;
//         default:
//           // 기타 경우 처리
//           break;
//       }
//       return newSelections;
//     });
//   };
//
//   // 디버깅용 로그
//   useEffect(() => {
//     console.log(
//       `Type Selected: ${selections.type.length}, Interest Selected: ${selections.interest.length}, Mate Selected: ${selections.mate}`,
//     );
//   }, [selections]);
//   // 모든 카테고리에서 최소 하나의 옵션이 선택되었는지 확인
//   const isButtonDisabled = Object.values(selections).some(
//     value => value.length === 0,
//   );
//
//   // 디버깅용 로그
//   console.log(
//     `Type Selected: ${selections.mate.length}, Interest Selected: ${selections.interest.length}, Mate Selected: ${selections.mate}`,
//   );
//
//   return (
//     <DismissKeyboardView style={styles.container}>
//       <View>
//         <Text style={[Text20B.text, {marginTop: 20, marginBottom: 10}]}>
//           <Text style={{color: globalColors.blue}}>{'콩나물 부침개'}</Text>
//           <Text>{'님의 팝업 취향을'}</Text>
//         </Text>
//         <View style={styles.selectionRow}>
//           <Text style={[Text20B.text, {marginBottom: 10}]}>
//             {'선택해주세요'}
//           </Text>
//           <Text style={[Text12R.text, {marginLeft: 4, marginTop: 2}]}>
//             {'(카테고리 당 1개 이상 필수 선택)'}
//           </Text>
//         </View>
//       </View>
//       {[1, 2, 3].map(step => (
//         <View key={step}>
//           <Text style={[Text20B.text, {marginTop: 20, marginBottom: 10}]}>
//             {renderTitleForStep(step)}
//           </Text>
//           <PreferenceOptionButtons
//             step={step}
//             onSelectOption={(option, index) => handleSelectOption(option, step)}
//           />
//         </View>
//       ))}
//       <CompleteButton
//         onPress={() => setModalVisible(true)}
//         title={'설정 저장하기'}
//         disabled={isButtonDisabled}
//       />
//       <CustomOKModal
//         isVisible={modalVisible}
//         onClose={handleCloseModal}
//         isSuccessModal={true}
//         mainTitle="취향설정이 완료됐어요."
//       />
//     </DismissKeyboardView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: globalColors.white,
//     paddingHorizontal: 20,
//   },
//   selectionRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//   },
//   // Add more styles as needed
// });
//
// export default PreferenceSettingScreen;
