import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../Util';
import {SectionContainer} from '../../../Unit/View';
import CalendarLeftArrowGreyIcon from '../../../Resource/svg/calendar-left-arrow-grey-icon.svg';
import CalendarRightArrowBlackIcon from '../../../Resource/svg/calendar-right-arrow-black-icon.svg';
import DownArrowBlackIcon from '../../../Resource/svg/down-arrow-black-icon.svg';
import {H1} from '../../../StyledComponents/Text';
import {usePopupLikesLandingScreenStore} from './PopupLikes.landing.zustand';
import {themeColors} from '../../../Theme/theme';
import {
  Animated,
  Dimensions,
  PanResponder,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';
import PopupStoreCard from '../../../Component/Popup/Landing/PopupStoreCard';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const InterestedPopupCalendarSection = () => {
  const {calendarCells, calendarYear, calendarMonth, moveMonth} =
    usePopupLikesLandingScreenStore();

  const {interestedPopupStores} = usePopupStore();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT * 0.5)).current;

  // 캘린더 셀 높이를 반응형으로 조절
  const cellHeight = translateY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [moderateScale(30), moderateScale(50), moderateScale(60)],
    extrapolate: 'clamp',
  });

  // 바텀시트 드래그 동작
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(
          Math.min(SCREEN_HEIGHT, Math.max(0, gestureState.moveY)),
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGHT * 0.75) {
          // 바텀시트 완전히 내리기 (숨기기)
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT * 0.9, // 하단 위치로 설정
            useNativeDriver: false,
          }).start();
        } else if (gestureState.moveY < SCREEN_HEIGHT * 0.25) {
          // 바텀시트 완전히 올리기 (화면 맨 위까지)
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT, // 상단 위치로 설정
            useNativeDriver: false,
          }).start();
        } else {
          // 바텀시트 중간 위치 (50%)
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT * 0.5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  const formattedMonth =
    calendarMonth < 10 ? `0${calendarMonth}` : `${calendarMonth}`;

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
    // 날짜 클릭 시 바텀시트를 중간 위치로 이동
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT * 0.5,
      useNativeDriver: false,
    }).start();
  };

  const filteredPopups =
    interestedPopupStores?.filter(
      popup => popup.openDate.split('T')[0] === selectedDate,
    ) || [];

  return (
    <SectionContainer style={{flex: 1, paddingBottom: moderateScale(60)}}>
      {/* 날짜 (ex. 2024.03) */}
      <CalendarHeaderContainer>
        <TouchableOpacity
          onPress={() => moveMonth('BACKWARD')}
          activeOpacity={0.7}>
          <CalendarLeftArrowGreyIcon
            width={moderateScale(18)}
            height={moderateScale(18)}
          />
        </TouchableOpacity>
        <DateContainer>
          <CalendarHeaderText>{`${calendarYear}.${formattedMonth}`}</CalendarHeaderText>
          <DownArrowBlackIcon
            width={moderateScale(18)}
            height={moderateScale(18)}
            style={{marginLeft: moderateScale(8)}}
          />
        </DateContainer>
        <TouchableOpacity
          onPress={() => moveMonth('FORWARD')}
          activeOpacity={0.7}>
          <CalendarRightArrowBlackIcon
            width={moderateScale(18)}
            height={moderateScale(18)}
          />
        </TouchableOpacity>
      </CalendarHeaderContainer>
      {/* 월-화-수-목-금-토-일 */}
      <CalendarDaysContainer>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <CalendarCellBase key={day}>
            {/* 일요일은 빨간색으로 표시 */}
            <CalendarCellDayText isSunday={day === '일'}>
              {day}
            </CalendarCellDayText>
          </CalendarCellBase>
        ))}
      </CalendarDaysContainer>

      <CalendarBodyContainer>
        {calendarCells.map(cell => {
          const hasDot = interestedPopupStores?.some(
            popup => popup.openDate.split('T')[0] === cell.dateString,
          );

          return (
            <CalendarCellBase
              key={cell.dateString}
              onPress={() => handleDateClick(cell.dateString)}
              style={{height: cellHeight}}>
              <CalendarCellDateText>{cell.date}</CalendarCellDateText>
              {hasDot && <Dot />}
            </CalendarCellBase>
          );
        })}
        {/*{[1, 2, 3, 4, 5, 6].map(week => (*/}
        {/*  <CalendarWeekRow key={`${week}th-week`}>*/}
        {/*    {calendarCells.slice((week - 1) * 7, week * 7).map(calendarCell => (*/}
        {/*      <CalendarDateCell*/}
        {/*        key={calendarCell.dateString}*/}
        {/*        cell={calendarCell}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </CalendarWeekRow>*/}
        {/*))}*/}
      </CalendarBodyContainer>

      {/* 바텀시트 */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: SCREEN_HEIGHT,
          transform: [{translateY}],
          borderTopLeftRadius: translateY.interpolate({
            inputRange: [0, SCREEN_HEIGHT * 0.5],
            outputRange: [0, moderateScale(20)],
            extrapolate: 'clamp',
          }),
          borderTopRightRadius: translateY.interpolate({
            inputRange: [0, SCREEN_HEIGHT * 0.5],
            outputRange: [0, moderateScale(20)],
            extrapolate: 'clamp',
          }),
          backgroundColor: 'white',
        }}
        {...panResponder.panHandlers}>
        <HandleBar />
        <FlatList
          data={filteredPopups}
          keyExtractor={item => item.id}
          renderItem={({item}) => <PopupStoreCard item={item} />}
          ListEmptyComponent={
            <EmptyListMessage>선택된 날짜의 팝업이 없습니다.</EmptyListMessage>
          }
        />
      </Animated.View>
    </SectionContainer>
  );
};

const CalendarDateCell = ({
  cell,
}: {
  cell: {year: number; month: number; date: number; dateString: string};
}) => {
  const {calendarMonth, setFocusedDate, focusedDate} =
    usePopupLikesLandingScreenStore();

  const isCurrentMonth = cell.month === calendarMonth;
  const isFocusedDate =
    focusedDate.year === cell.year &&
    focusedDate.month === cell.month &&
    focusedDate.date === cell.date;

  const isSunday =
    new Date(cell.year, cell.month - 1, cell.date).getDay() === 0;

  return (
    <CalendarCellBase
      onPress={() =>
        setFocusedDate({year: cell.year, month: cell.month, date: cell.date})
      }
      style={
        isFocusedDate ? {backgroundColor: '#DBD6FF', borderRadius: 6} : {}
      }>
      <CalendarCellDateText
        style={{
          color: isSunday
            ? themeColors().red.warning
            : isCurrentMonth
            ? themeColors().grey.black
            : themeColors().grey.main,
        }}>
        {cell.date}
      </CalendarCellDateText>
    </CalendarCellBase>
  );
};

const CalendarHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: ${moderateScale(40)}px;
  margin-bottom: ${moderateScale(20)}px;
`;

const DateContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

/** 요일 표시줄 */
const CalendarDaysContainer = styled.View`
  flex-direction: row;
  padding: ${moderateScale(8)}px ${moderateScale(0)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const CalendarCellBase = styled(
  Animated.createAnimatedComponent(styled.TouchableOpacity`
    width: 13%;
    align-items: center;
    justify-content: center;
  `),
)``;

/** 요일 텍스트 */
const CalendarCellDayText = styled(H1)<{isSunday?: boolean}>`
  font-weight: 400;
  font-size: ${moderateScale(18)}px;
  color: ${({isSunday, theme}) =>
    isSunday ? theme.color.red.warning : theme.color.grey.black};
`;

const CalendarHeaderText = styled(H1)`
  font-size: ${moderateScale(24)}px;
  font-weight: 600;
`;

const CalendarBodyContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const CalendarWeekRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

/** Calendar date text */
const CalendarCellDateText = styled(H1)`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;

const Dot = styled.View`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  background-color: purple;
  border-radius: ${moderateScale(3)}px;
  margin-top: ${moderateScale(2)}px;
`;

const HandleBar = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(4)}px;
  background-color: #ccc;
  border-radius: ${moderateScale(2)}px;
  align-self: center;
  margin: ${moderateScale(10)}px 0;
`;

const EmptyListMessage = styled.Text`
  text-align: center;
  color: #aaa;
  font-size: ${moderateScale(16)}px;
  margin-top: ${moderateScale(20)}px;
`;

export default InterestedPopupCalendarSection;

// import React, {useRef, useState} from 'react';
// import {Animated, Dimensions, PanResponder, FlatList} from 'react-native';
// import styled from 'styled-components/native';
// import {moderateScale} from '../../../Util';
// import CalendarLeftArrowGreyIcon from 'src/Resource/svg/calendar-left-arrow-grey-icon.svg';
// import CalendarRightArrowBlackIcon from 'src/Resource/svg/calendar-right-arrow-black-icon.svg';
// import {H1} from '../../../StyledComponents/Text';
// import {usePopupLikesLandingScreenStore} from './PopupLikes.landing.zustand';
// import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';
// import PopupStoreCard from '../../../Component/Popup/Landing/PopupStoreCard';
//
// const SCREEN_HEIGHT = Dimensions.get('window').height;
//
// const InterestedPopupCalendarWithBottomSheet = () => {
//   const {calendarCells, calendarYear, calendarMonth, moveMonth} =
//     usePopupLikesLandingScreenStore();
//   const {interestedPopupStores} = usePopupStore();
//
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const translateY = useRef(new Animated.Value(SCREEN_HEIGHT * 0.5)).current;
//
//   // 캘린더 셀 높이를 반응형으로 조절
//   const cellHeight = translateY.interpolate({
//     inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
//     outputRange: [moderateScale(30), moderateScale(50), moderateScale(60)],
//     extrapolate: 'clamp',
//   });
//
//   // 바텀시트 드래그 동작
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         translateY.setValue(
//           Math.min(SCREEN_HEIGHT, Math.max(0, gestureState.moveY)),
//         );
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.moveY > SCREEN_HEIGHT * 0.75) {
//           // 바텀시트 완전히 내리기 (숨기기)
//           Animated.timing(translateY, {
//             toValue: SCREEN_HEIGHT,
//             useNativeDriver: false,
//           }).start();
//         } else if (gestureState.moveY < SCREEN_HEIGHT * 0.25) {
//           // 바텀시트 완전히 올리기 (화면 맨 위까지)
//           Animated.timing(translateY, {
//             toValue: 0,
//             useNativeDriver: false,
//           }).start();
//         } else {
//           // 바텀시트 중간 위치 (50%)
//           Animated.timing(translateY, {
//             toValue: SCREEN_HEIGHT * 0.5,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     }),
//   ).current;
//
//   const formattedMonth =
//     calendarMonth < 10 ? `0${calendarMonth}` : `${calendarMonth}`;
//
//   const handleDateClick = (dateString: string) => {
//     setSelectedDate(dateString);
//     // 날짜 클릭 시 바텀시트를 중간 위치로 이동
//     Animated.timing(translateY, {
//       toValue: SCREEN_HEIGHT * 0.5,
//       useNativeDriver: false,
//     }).start();
//   };
//
//   const filteredPopups =
//     interestedPopupStores?.filter(
//       popup => popup.openDate.split('T')[0] === selectedDate,
//     ) || [];
//
//   return (
//     <Container>
//       {/* 캘린더 */}
//       <CalendarContainer>
//         <CalendarHeaderContainer>
//           <CalendarLeftArrowGreyIcon
//             onPress={() => moveMonth('BACKWARD')}
//             width={moderateScale(18)}
//             height={moderateScale(18)}
//           />
//           <CalendarHeaderText>{`${calendarYear}.${formattedMonth}`}</CalendarHeaderText>
//           <CalendarRightArrowBlackIcon
//             onPress={() => moveMonth('FORWARD')}
//             width={moderateScale(18)}
//             height={moderateScale(18)}
//           />
//         </CalendarHeaderContainer>
//         <CalendarBodyContainer>
//           {calendarCells.map(cell => {
//             const hasDot = interestedPopupStores?.some(
//               popup => popup.openDate.split('T')[0] === cell.dateString,
//             );
//
//             return (
//               <CalendarCellBase
//                 key={cell.dateString}
//                 onPress={() => handleDateClick(cell.dateString)}
//                 style={{height: cellHeight}}>
//                 <CalendarCellDateText>{cell.date}</CalendarCellDateText>
//                 {hasDot && <Dot />}
//               </CalendarCellBase>
//             );
//           })}
//         </CalendarBodyContainer>
//       </CalendarContainer>
//
//       {/* 바텀시트 */}
//       <Animated.View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           width: '100%',
//           height: SCREEN_HEIGHT,
//           transform: [{translateY}],
//           borderTopLeftRadius: translateY.interpolate({
//             inputRange: [0, SCREEN_HEIGHT * 0.5],
//             outputRange: [0, moderateScale(20)],
//             extrapolate: 'clamp',
//           }),
//           borderTopRightRadius: translateY.interpolate({
//             inputRange: [0, SCREEN_HEIGHT * 0.5],
//             outputRange: [0, moderateScale(20)],
//             extrapolate: 'clamp',
//           }),
//           backgroundColor: 'white',
//         }}
//         {...panResponder.panHandlers}>
//         <HandleBar />
//         <FlatList
//           data={filteredPopups}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => <PopupStoreCard item={item} />}
//           ListEmptyComponent={
//             <EmptyListMessage>선택된 날짜의 팝업이 없습니다.</EmptyListMessage>
//           }
//         />
//       </Animated.View>
//     </Container>
//   );
// };
//
// const Container = styled.View`
//   flex: 1;
//   background-color: #f9f9f9;
// `;
//
// const CalendarContainer = styled.View`
//   background-color: white;
//   padding: ${moderateScale(10)}px;
// `;
//
// const CalendarHeaderContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding-bottom: ${moderateScale(10)}px;
// `;
//
// const CalendarHeaderText = styled(H1)`
//   font-size: ${moderateScale(20)}px;
// `;
//
// const CalendarBodyContainer = styled.View`
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: space-between;
// `;
//
// const CalendarCellBase = styled(
//   Animated.createAnimatedComponent(styled.TouchableOpacity`
//     width: 13%;
//     align-items: center;
//     justify-content: center;
//   `),
// )``;
//
// const CalendarCellDateText = styled.Text`
//   font-size: ${moderateScale(16)}px;
// `;
//
// const Dot = styled.View`
//   width: ${moderateScale(6)}px;
//   height: ${moderateScale(6)}px;
//   background-color: purple;
//   border-radius: ${moderateScale(3)}px;
//   margin-top: ${moderateScale(2)}px;
// `;
//
// const HandleBar = styled.View`
//   width: ${moderateScale(40)}px;
//   height: ${moderateScale(4)}px;
//   background-color: #ccc;
//   border-radius: ${moderateScale(2)}px;
//   align-self: center;
//   margin: ${moderateScale(10)}px 0;
// `;
//
// const EmptyListMessage = styled.Text`
//   text-align: center;
//   color: #aaa;
//   font-size: ${moderateScale(16)}px;
//   margin-top: ${moderateScale(20)}px;
// `;
//
// export default InterestedPopupCalendarWithBottomSheet;
