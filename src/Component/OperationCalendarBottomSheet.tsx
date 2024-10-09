// import React, {useState, useRef, useEffect, useMemo} from 'react';
// import {View, Text, StyleSheet, Pressable} from 'react-native';
// import {useReducedMotion} from 'react-native-reanimated';
// import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
// import {Calendar} from 'react-native-calendars';
// import CalendarGraySvg from '../assets/icons/calendarGray.svg';
// import globalColors from '../styles/color/globalColors.ts';
// import DividerLine from './DividerLine.tsx';
// import CompleteButton from './button/CompleteButton.tsx';
// import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
// import Text18B from '../styles/texts/body_large/Text18B.ts';
//
// interface Dates {
//   start: string;
//   end: string;
// }
//
// interface OperationCalendarBottomSheetProps {
//   selectedDates: Dates;
//   setSelectedDates: (dates: Dates) => void;
// }
//
// const OperationCalendarBottomSheet: React.FC<
//   OperationCalendarBottomSheetProps
// > = ({selectedDates, setSelectedDates}) => {
//   const initialDates = useMemo(() => {
//     return {
//       start: selectedDates.start,
//       end: selectedDates.end,
//     };
//   }, [selectedDates]);
//
//   const [dates, setDates] = useState<Dates>(initialDates);
//   const [selectionMode, setSelectionMode] = useState('start');
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const reducedMotion = useReducedMotion();
//
//   useEffect(() => {
//     setDates(initialDates);
//   }, [initialDates]);
//
//   const handleOpenCalendar = (mode: 'start' | 'end') => {
//     setSelectionMode(mode);
//     bottomSheetModalRef.current?.present();
//   };
//
//   const handleDateSelected = (day: {dateString: string}) => {
//     const selectedDate = day.dateString;
//     if (selectionMode === 'start') {
//       setDates(prev => ({
//         ...prev,
//         start: selectedDate,
//         end:
//           new Date(selectedDate) > new Date(prev.end) ? selectedDate : prev.end,
//       }));
//       setSelectionMode('end');
//     } else if (selectionMode === 'end') {
//       if (new Date(selectedDate) >= new Date(dates.start)) {
//         setDates(prev => ({...prev, end: selectedDate}));
//       }
//     }
//   };
//
//   const getDateInputTextStyle = (value: string, defaultText: string) => ({
//     color: value === defaultText ? globalColors.font : globalColors.black,
//   });
//
//   const handleComplete = () => {
//     setSelectedDates(dates); // 부모 컴포넌트에 선택된 날짜 전달
//     bottomSheetModalRef.current?.dismiss();
//   };
//   const renderBackdrop = (
//     props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
//   ) => (
//     <BottomSheetBackdrop
//       {...props}
//       disappearsOnIndex={-1}
//       appearsOnIndex={0}
//       pressBehavior="close"
//     />
//   );
//
//   const getMarkedDates = () => {
//     let markedDates: {[date: string]: any} = {};
//
//     if (dates.start) {
//       markedDates[dates.start] = {
//         selected: true,
//         startingDay: true,
//         endingDay: dates.start === dates.end,
//         color: globalColors.calendar,
//         textColor: 'black',
//       };
//     }
//     if (dates.end && dates.start !== dates.end) {
//       markedDates[dates.end] = {
//         selected: true,
//         endingDay: true,
//         color: globalColors.calendar,
//         textColor: 'black',
//       };
//     }
//
//     let currentDate = new Date(dates.start);
//     while (currentDate <= new Date(dates.end)) {
//       const dateString = currentDate.toISOString().split('T')[0];
//       if (dateString !== dates.start && dateString !== dates.end) {
//         markedDates[dateString] = {
//           color: globalColors.calendar,
//           textColor: 'black',
//         };
//       }
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//
//     return markedDates;
//   };
//
//   return (
//     <View>
//       <View style={styles.inputRow}>
//         <Pressable
//           style={[styles.input, styles.firstInput]}
//           onPress={() => handleOpenCalendar('start')}>
//           <Text style={getDateInputTextStyle(dates.start, '오픈일')}>
//             {dates.start !== '' ? dates.start : '오픈일'}
//           </Text>
//         </Pressable>
//         <Text style={styles.toText}>~</Text>
//         <Pressable
//           style={[styles.input, styles.secondInput]}
//           onPress={() => handleOpenCalendar('end')}>
//           <Text style={getDateInputTextStyle(dates.end, '종료일')}>
//             {dates.end !== '' ? dates.end : '종료일'}
//           </Text>
//           <CalendarGraySvg />
//         </Pressable>
//       </View>
//
//       <BottomSheetModal
//         animateOnMount={!reducedMotion}
//         ref={bottomSheetModalRef}
//         index={0}
//         snapPoints={['75%']}
//         backdropComponent={renderBackdrop}>
//         <View style={styles.sheetTitleContainer}>
//           <Text style={[Text18B.text, {textAlign: 'center'}]}>
//             팝업의 운영 기간을 알려주세요
//           </Text>
//         </View>
//
//         <View style={styles.dateRow}>
//           <Text style={[Text18B.text, {marginLeft: 10}]}>시작</Text>
//           <Pressable
//             style={({pressed}) => [
//               styles.dateInputContainer,
//               pressed && {backgroundColor: globalColors.warmGray},
//             ]}
//             onPress={() => setSelectionMode('start')}>
//             <Text style={getDateInputTextStyle(dates.start, '오픈일')}>
//               {dates.start}
//             </Text>
//           </Pressable>
//         </View>
//         <DividerLine height={1} />
//         <View style={styles.dateRow}>
//           <Text style={[Text18B.text, {marginLeft: 10}]}>종료</Text>
//           <Pressable
//             style={({pressed}) => [
//               styles.dateInputContainer,
//               pressed && {backgroundColor: globalColors.warmGray},
//             ]}
//             onPress={() => setSelectionMode('end')}>
//             <Text style={getDateInputTextStyle(dates.end, '종료일')}>
//               {dates.end}
//             </Text>
//           </Pressable>
//         </View>
//
//         <DividerLine height={1} />
//         <Calendar
//           theme={{
//             textDayHeaderFontWeight: '600',
//             textMonthFontWeight: '600',
//             todayButtonFontWeight: '600',
//             arrowColor: globalColors.calendar,
//             backgroundColor: '#ffffff',
//             calendarBackground: '#ffffff',
//             textSectionTitleColor: '#b6c1cd',
//             selectedDayBackgroundColor: '#B3E5FC',
//             todayTextColor: globalColors.calendar,
//             selectedDayTextColor: globalColors.calendar,
//             dayTextColor: '#2d4150',
//             textDisabledColor: '#d9e1e8',
//             textDayFontSize: 18,
//             textDayFontWeight: '500',
//           }}
//           onDayPress={handleDateSelected}
//           markedDates={getMarkedDates()}
//         />
//         <DividerLine height={1} />
//         <CompleteButton
//           onPress={handleComplete}
//           title={'확인'}
//           buttonWidth={'90%'}
//         />
//       </BottomSheetModal>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   sheetTitleContainer: {
//     alignItems: 'center',
//     padding: 16,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   dateRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: globalColors.warmGray,
//     borderRadius: 20,
//     height: 40,
//     padding: 10,
//     flex: 1,
//     marginHorizontal: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   firstInput: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   secondInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   toText: {
//     marginHorizontal: 10,
//     color: globalColors.font,
//   },
//   dateInputContainer: {
//     alignItems: 'center',
//     height: 33,
//     width: 110,
//     backgroundColor: globalColors.component,
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 10,
//   },
// });
//
// export default OperationCalendarBottomSheet;
