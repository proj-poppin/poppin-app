/* eslint-disable */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import globalColors from "../../../styles/color/globalColors.ts";
import { DayState, MarkedDates } from "react-native-calendars/src/types";
import HeaderTitle from "./HeaderTitle.tsx";
import { createDateData, normalCalendarHeaderStyle, normalCalendarTheme } from "./calendarUtils.ts";

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

  return <View style={{flex:1, backgroundColor:'white'}}>
    <CalendarList
      hideArrows={false}
      horizontal={true}
      pagingEnabled={true}
      markingType="multi-dot"
      markedDates={markedDates}
      theme={normalCalendarTheme}
      headerStyle={normalCalendarHeaderStyle}
      onMonthChange={(month: DateData) => {
        const curMonthDateData = createDateData(month.year, month.month, month.day);
        setSelDate(curMonthDateData);
      }}
      onPressArrowLeft={(method, month: XDate|undefined) => {
        console.log(month);
        console.log("안녕");
        const dateData = addMonthsToDateData(selDate, -1);

        setSelDate(dateData);
        method();
      }}
      onPressArrowRight={(method, month: XDate|undefined) => {
        console.log(month);
        console.log("안녕");
        const dateData = addMonthsToDateData(selDate, 1);
        setSelDate(dateData);
        method();
      }}
      // renderHeader={() => <HeaderTitle selDate={selDate.dateString} onClickHeaderTitle={onClickHeaderTitle} />}
      stickyHeaderIndices={[0]}
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
      }} />
  </View>
}

export default NormalCalendarComponent
