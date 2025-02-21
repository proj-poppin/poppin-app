import React from 'react';
import styled from 'styled-components/native';
import {getDayOfWeek, moderateScale} from '../../../Util';
import {SectionContainer} from '../../../Unit/View';
import CalendarLeftArrowGreyIcon from '../../../Resource/svg/calendar-left-arrow-grey-icon.svg';
import CalendarRightArrowBlackIcon from '../../../Resource/svg/calendar-right-arrow-black-icon.svg';
import DownArrowBlackIcon from '../../../Resource/svg/down-arrow-black-icon.svg';
import {H1} from '../../../StyledComponents/Text';
import {themeColors} from '../../../Theme/theme';
import {
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import PopupStoreCard from '../../../Component/Popup/Landing/PopupStoreCard';
import Star from '../../../Resource/svg/bottom-nav-bar-tab2-active.svg';
import YearMonthPicker from 'src/Component/YearMonthPicker';
import {BodyMediumText} from 'src/StyledComponents/Text/bodyMedium.component';
import {useCalendar} from '../Hooks/Use.calendar';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const InterestedPopupCalendarSection = () => {
  const {
    calendarYear,
    calendarMonth,
    calendarCells,
    moveMonth,
    selectedDate,
    handleDateClick,
    swipeResponder,
    filteredPopups,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    isDatePickerVisible,
    translateY,
    panResponder,
    cellHeight,
    getTodayDate,
    handlePressCard,
    formattedMonth,
  } = useCalendar();

  return (
    <>
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
          {/* 누르면 날짜 박스 보이기 */}
          <DateContainer onPress={showDatePicker}>
            <CalendarHeaderText>{`${calendarYear}.${calendarMonth}`}</CalendarHeaderText>
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

        <View {...swipeResponder.panHandlers} style={{flex: 1}}>
          <CalendarBodyContainer>
            {calendarCells.map(cell => {
              const popupsCount =
                filteredPopups?.filter(popup => {
                  const openDate = popup.openDate.split('T')[0];
                  const closeDate = popup.closeDate.split('T')[0];
                  return (
                    openDate === cell.dateString ||
                    closeDate === cell.dateString
                  );
                }).length || 0;
              const today = new Date();
              const isToday =
                cell.dateString === today.toISOString().split('T')[0];
              const isSelected = cell.dateString === selectedDate;

              return (
                <CalendarCellBase
                  key={cell.dateString}
                  onPress={() => handleDateClick(cell.dateString)}
                  style={{
                    height: cellHeight,
                  }}>
                  {isToday && (
                    <DateCircle
                      style={{backgroundColor: themeColors().purple.mild}}
                    />
                  )}
                  {isSelected && (
                    <DateCircle
                      style={{backgroundColor: themeColors().purple.main}}
                    />
                  )}
                  <CalendarCellDateText
                    style={{
                      color: isSelected
                        ? themeColors().grey.white
                        : themeColors().grey.black,
                      zIndex: 1,
                    }}>
                    {cell.date}
                  </CalendarCellDateText>
                  {popupsCount > 0 && (
                    <DotsContainer>
                      <Dot
                        style={{backgroundColor: themeColors().purple.main}}
                      />
                      {popupsCount >= 2 && (
                        <Dot
                          style={{backgroundColor: themeColors().blue.main}}
                        />
                      )}
                      {popupsCount >= 3 && (
                        <Dot
                          style={{backgroundColor: themeColors().purple.mild}}
                        />
                      )}
                    </DotsContainer>
                  )}
                </CalendarCellBase>
              );
            })}
          </CalendarBodyContainer>
        </View>

        {/* 바텀시트 */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
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
            borderWidth: 2,
            borderColor: '#F2F4F6',
            backgroundColor: 'white',
          }}
          {...panResponder.panHandlers}>
          <HandleBar />

          {/* 기본은 오늘 날짜 */}
          <EmptyListDate>
            {`${
              (selectedDate || getTodayDate()).split('-')[2]
            }일 ${getDayOfWeek(selectedDate || getTodayDate())}요일`}
          </EmptyListDate>
          <FlatList
            style={{paddingLeft: moderateScale(16)}}
            data={filteredPopups}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <PopupStoreCard
                item={item}
                key={item.id}
                onPress={() => {
                  handlePressCard(item.id);
                }}
                isInterestPopupCard={true}
                dDayType={item.dDayType || ''}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
            ListEmptyComponent={
              <EmptyListView>
                <StarContainer>
                  <Star />
                </StarContainer>

                <EmptyListMessage>{`저장한 팝업이 없어요! 🫤\n관심 있는 팝업을 저장해 보세요.`}</EmptyListMessage>
              </EmptyListView>
            }
          />
        </Animated.View>
      </SectionContainer>

      {/* YearMonthPicker 모달 추가 */}
      {isDatePickerVisible && (
        <YearMonthPicker
          isVisible={isDatePickerVisible}
          onClose={hideDatePicker}
          onConfirm={(year, month) => handleConfirm(year, month)}
          selectedYear={calendarYear}
          selectedMonth={Number(formattedMonth)}
        />
      )}
    </>
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
  justify-content: center;
  padding: ${moderateScale(10)}px;
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
    position: relative; // 자식 요소들의 위치 기준점
  `),
)``;

const DateCircle = styled.View`
  width: ${moderateScale(24)}px; // 더 작은 크기로 조정
  height: ${moderateScale(24)}px; // 더 작은 크기로 조정
  border-radius: ${moderateScale(12)}px;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 0; // Text가 원 위에 표시되도록 함
`;

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
const CalendarCellDateText = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 600;
  z-index: 1;
  position: relative;
`;

const DotsContainer = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: ${moderateScale(2)}px;
  gap: ${moderateScale(2)}px;
  z-index: 1;
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

const Separator = styled.View`
  height: ${moderateScale(1)}px;
  backgroundcolor: ${props => props.theme.color.grey.mild};
  borderwidth: 1px;
  bordercolor: gray;
  marginvertical: ${moderateScale(7)}px;
`;

const EmptyListView = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${moderateScale(10)}px;
`;
const StarContainer = styled.View`
  align-self: center;
`;
const EmptyListDate = styled.Text`
  text-align: start;
  font-size: ${moderateScale(20)}px;
  font-weight: semi-bold;
  padding-left: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(12)}px;
`;
const EmptyListMessage = styled(BodyMediumText)`
  text-align: center;
  font-size: ${moderateScale(16)}px;
  margin-top: ${moderateScale(20)}px;
`;

export default InterestedPopupCalendarSection;
