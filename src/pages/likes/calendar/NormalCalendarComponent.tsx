/* eslint-disable */
import React, { useState } from "react";
import { View } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import globalColors from "../../../styles/color/globalColors.ts";
import { DayState, MarkedDates } from "react-native-calendars/src/types";
import HeaderTitle from "./HeaderTitle.tsx";

interface NormalCalendarComponentProps {
  handlePresentModalPress: any;
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
  selDate: DateData;
  setSelDate: React.Dispatch<React.SetStateAction<DateData>>;
  onClickHeaderTitle: (dateData: DateData) => void;
}

const NormalCalendarComponent: React.FC<NormalCalendarComponentProps> = (
  {
    handlePresentModalPress,
    markedDates,
    setMarkedDates,
    selDate,
    onClickHeaderTitle,
    setSelDate}) => {

  function addMonthsToDateData(dateData: DateData, months: number): DateData {
    const date = new Date(dateData.year, dateData.month - 1, dateData.day);
    date.setMonth(date.getMonth() + months);

    return {
      dateString: date.toISOString().split('T')[0], // ISO 문자열로 변환하여 날짜 부분만 추출
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      timestamp: date.getTime(),
    };
  }

  return <View style={{flex:1, backgroundColor:'green'}}>
    <CalendarList
      hideArrows={false}
      onPressArrowLeft={(method, month) => {
        const dateData = addMonthsToDateData(selDate, -1);
        setSelDate(dateData);
        method();

      }}
      onPressArrowRight={(method, month) => {
        const dateData = addMonthsToDateData(selDate, 1);
        setSelDate(dateData);
        method();

      }}
      horizontal={true}
      renderHeader={() => <HeaderTitle selDate={selDate.dateString} onClickHeaderTitle={onClickHeaderTitle} />}
      onDayPress={(date: DateData) => {
        setSelDate(date);
        // 새로운 마크된 날짜 객체 생성
        const updatedMarkedDates = { ...markedDates };

        // 모든 select 초기화
        Object.keys(updatedMarkedDates).forEach(day => {
          if (!markedDates[day].today) {
            updatedMarkedDates[day].selected = false;
          } else {
            updatedMarkedDates[day].selectedTextColor = globalColors.black;
            updatedMarkedDates[day].selectedColor = globalColors.purpleLight;
          }
        }
        );

        // 선택된 날로 select
        if (updatedMarkedDates[date.dateString]) {

          if (!updatedMarkedDates[date.dateString].today) {
            updatedMarkedDates[date.dateString].selected = !updatedMarkedDates[date.dateString].selected;
          } else {
            updatedMarkedDates[date.dateString] = {selected: true, selectedColor: globalColors.purple, selectedTextColor: globalColors.white};

          }
        } else {
          updatedMarkedDates[date.dateString] = {selected: true, selectedColor: globalColors.purple, selectedTextColor: globalColors.white};
        }

        setMarkedDates(updatedMarkedDates);
        handlePresentModalPress();
      }}
      pagingEnabled={true}
      markingType="multi-dot"
      markedDates={markedDates}
      // onMonthChange={(date:DateData) => setSelDate(date.dateString)}
      // customHeaderTitle={<HeaderTitle selDate={selDate}/>}
      theme={{
        textDayHeaderFontWeight: '600',
        textMonthFontWeight: '600',
        todayButtonFontWeight: '600',
        textSectionTitleColor: '#b6c1cd',
        arrowColor: globalColors.black,
        selectedDayBackgroundColor: globalColors.purple,
        selectedDayTextColor: globalColors.white,
        todayTextColor: globalColors.black,
        todayBackgroundColor: globalColors.purpleLight,
        // textDisabledColor: '#d9e1e8',
        textDayFontSize: 16,
        textDayFontWeight: '500',
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: 'red'
          },
        }

      }} />
  </View>

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
    return `${year}-${month}-${day}`;
  }
}

export default NormalCalendarComponent
