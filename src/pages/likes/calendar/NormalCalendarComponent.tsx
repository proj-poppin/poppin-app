/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import globalColors from '../../../styles/color/globalColors.ts';
import {MarkedDates} from 'react-native-calendars/src/types';
import HeaderTitle from './HeaderTitle.tsx';
import {normalCalendarTheme} from './calendarUtils.ts';
import XDate from 'xdate';

interface NormalCalendarComponentProps {
  handlePresentModalPress: any;
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
  selDate: DateData;
  setSelDate: React.Dispatch<React.SetStateAction<DateData>>;
  dateTimePickerYearMonthRef: React.RefObject<string>;
  onClickHeaderTitle: (dateData: DateData) => void;
}
function subtractMonthFromString(dateString: string) {
  // 입력된 문자열을 연도와 월로 분리
  const [year, month] = dateString.split('.').map(Number);
  // 새로운 Date 객체 생성
  const date = new Date(year, month - 1); // month - 1로 0부터 시작하는 월 보정
  // 한 달 빼기
  date.setMonth(date.getMonth() - 1);
  // 결과 문자열 생성 (월을 2자리로 맞춤)
  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, '0'); // month + 1로 보정 후 2자리로 포맷

  return `${newYear}.${newMonth}`;
}

const NormalCalendarComponent: React.FC<NormalCalendarComponentProps> = ({
  handlePresentModalPress,
  markedDates,
  setMarkedDates,
  selDate,
  onClickHeaderTitle,
  dateTimePickerYearMonthRef,
  setSelDate,
}) => {
  useEffect(() => {}, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CalendarList
        current={selDate.dateString}
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
              onClickHeaderTitle={onClickHeaderTitle}
            />
          );
        }}
        onDayPress={(date: DateData) => {
          setSelDate(date);
          const updatedMarkedDates = {...markedDates};

          // 모든 select 초기화
          Object.keys(updatedMarkedDates).forEach(day => {
            if (!markedDates[day].today) {
              updatedMarkedDates[day].selected = false;
            } else {
              updatedMarkedDates[day].selectedTextColor = globalColors.black;
              updatedMarkedDates[day].selectedColor = globalColors.purpleLight;
            }
          });

          // 선택된 날로 select
          if (updatedMarkedDates[date.dateString]) {
            if (!updatedMarkedDates[date.dateString].today) {
              updatedMarkedDates[date.dateString].selected =
                !updatedMarkedDates[date.dateString].selected;
            } else {
              updatedMarkedDates[date.dateString] = {
                selected: true,
                selectedColor: globalColors.purple,
                selectedTextColor: globalColors.white,
              };
            }
          } else {
            updatedMarkedDates[date.dateString] = {
              selected: true,
              selectedColor: globalColors.purple,
              selectedTextColor: globalColors.white,
            };
          }

          setMarkedDates(updatedMarkedDates);
          handlePresentModalPress();
        }}
      />
    </View>
  );
};

export default NormalCalendarComponent;
