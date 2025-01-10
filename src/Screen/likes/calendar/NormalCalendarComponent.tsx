import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import XDate from 'xdate';
import {NormalCalendarComponentProps} from '../../../Object/Type/calendar.type';
import {normalCalendarTheme} from '../../PopupLikes/Landing/calendarUtils';
import HeaderTitle from './HeaderTitle';
import {themeColors} from '../../../Theme/theme';

export const NormalCalendarComponent: React.FC<
  NormalCalendarComponentProps
> = ({
  onModalOpen,
  markedDates,
  setMarkedDates,
  selectedDate,
  setSelectedDate,
  dateTimePickerYearMonthRef,
  onHeaderTitleClick,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CalendarList
        current={selectedDate.dateString}
        hideArrows={false}
        horizontal={true}
        pagingEnabled={true}
        markingType="multi-dot"
        markedDates={markedDates}
        theme={normalCalendarTheme}
        onPressArrowLeft={(method, month: XDate | undefined) => {
          method();
        }}
        onPressArrowRight={(method, month: XDate | undefined) => {
          method();
        }}
        renderHeader={(date?: XDate) => {
          dateTimePickerYearMonthRef.current = subtractMonthFromString(
            date!.toString('yyyy.MM'),
          );
          return (
            <HeaderTitle
              selDate={date!.toString('yyyy-MM-dd')}
              onClickHeaderTitle={onHeaderTitleClick}
            />
          );
        }}
        onDayPress={(date: DateData) => {
          setSelectedDate(date);

          const updatedMarkedDates = {...markedDates};

          // 모든 날짜 선택 초기화
          Object.keys(updatedMarkedDates).forEach(day => {
            updatedMarkedDates[day].selected = false;
          });

          // 선택된 날짜 강조 표시
          updatedMarkedDates[date.dateString] = {
            selected: true,
            selectedColor: themeColors().purple.main,
            selectedTextColor: themeColors().grey.white,
          };

          setMarkedDates(updatedMarkedDates);
          onModalOpen(); // 바텀시트를 열기 위한 트리거
        }}
      />
    </View>
  );
};

const subtractMonthFromString = (date: string) => {
  const dateArr = date.split('.');
  const year = dateArr[0];
  const month = dateArr[1];
  const newMonth = parseInt(month) - 1;
  return `${year}.${newMonth}`;
};
