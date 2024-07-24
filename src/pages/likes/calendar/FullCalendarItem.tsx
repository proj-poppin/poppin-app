// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {DateData} from 'react-native-calendars';
// import {DayState, MarkingProps} from 'react-native-calendars/src/types';
// import {GetInterestPopUpListResponse} from '../../../types/PopUpListData.ts';
// import globalColors from '../../../styles/color/globalColors.ts';
//
// interface FullCalendarItemProps {
//   date: DateData | undefined;
//   state: DayState | undefined;
//   marking: MarkingProps | undefined;
//   popupList: GetInterestPopUpListResponse[] | null;
// }
//
// const FullCalendarItem: React.FC<FullCalendarItemProps> = ({
//   date,
//   state,
//   marking,
//   popupList,
// }) => {
//   return (
//     <View style={[styles.calendarItemContainer]}>
//       <DayComponent day={date?.day} state={state} marking={marking} />
//       {marking?.dots?.map((e, index) => {
//         const textColor =
//           index == 2
//             ? {color: globalColors.black}
//             : {color: globalColors.white};
//         return (
//           <View
//             key={index}
//             style={[styles.markedContainer, {backgroundColor: e.color}]}>
//             <Text
//               style={[styles.markedText, textColor]}
//               numberOfLines={1}
//               ellipsizeMode="tail">
//               {e.key}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };
//
// interface DayProps {
//   day: number | undefined;
//   state: string | undefined;
//   marking: MarkingProps | undefined;
// }
// const DayComponent: React.FC<DayProps> = dayProps => {
//   const todayStyle =
//     dayProps.state === 'today'
//       ? {backgroundColor: globalColors.purpleLight}
//       : {};
//   const selContainerStyle = dayProps.marking?.selected
//     ? {backgroundColor: globalColors.purple}
//     : {};
//   const selTextStyle = dayProps.marking?.selected
//     ? {color: globalColors.white}
//     : {};
//
//   return (
//     <View style={{alignItems: 'center'}}>
//       <View
//         style={[
//           todayStyle,
//           selContainerStyle,
//           {borderRadius: 30, width: 28, height: 28, justifyContent: 'center'},
//         ]}>
//         <Text style={[styles.calenderItemText, selTextStyle]}>
//           {dayProps.day}
//         </Text>
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   calendarItemContainer: {
//     flex: 1,
//     height: 88,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   calenderItemText: {
//     color: 'black',
//     textAlign: 'center',
//   },
//   markedContainer: {
//     width: 48,
//     height: 14,
//     justifyContent: 'center',
//     marginTop: 0.53,
//     marginBottom: 2.2,
//     borderRadius: 2,
//   },
//   markedText: {
//     fontSize: 12,
//     color: 'white',
//     marginLeft: 2.57,
//     marginRight: 2.57,
//     fontWeight: '600',
//   },
// });
//
// export default FullCalendarItem;
