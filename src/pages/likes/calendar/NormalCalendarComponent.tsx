/* eslint-disable */
import React, { useState } from "react";
import { View } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import globalColors from "../../../styles/color/globalColors.ts";
import { MarkedDates } from "react-native-calendars/src/types";
import { GetInterestPopUpListResponse } from "../../../types/PopUpListData.ts";

interface NormalCalendarComponentProps {
  data: GetInterestPopUpListResponse[] | null;
  handlePresentModalPress: any
}

const NormalCalendarComponent: React.FC<NormalCalendarComponentProps> = ({data, handlePresentModalPress}) => {

  const [selDate, setSelDate] = useState<string>(getTodayDate()); // 캘린더 내부사용 포맷

  return <View style={{flex:1, backgroundColor:'green'}}>
    <CalendarList
      horizontal={true}
      onDayPress={(date: DateData) => {
        setSelDate(date.dateString);
        handlePresentModalPress();
      }}
      pagingEnabled={true}
      markingType="multi-dot"
      markedDates={createMarkedDates()}
      // onMonthChange={(date:DateData) => setSelDate(date.dateString)}
      // customHeaderTitle={<HeaderTitle selDate={selDate}/>}
      theme={{
        textDayHeaderFontWeight: '600',
        textMonthFontWeight: '600',
        todayButtonFontWeight: '600',
        arrowColor: globalColors.black,
        // backgroundColor: '#ffffff',
        // textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: globalColors.purple,
        todayTextColor: globalColors.blue,
        selectedDayTextColor: globalColors.white,
        // dayTextColor: '#2d4150',
        // textDisabledColor: '#d9e1e8',
        textDayFontSize: 16,
        textDayFontWeight: '500',
      }} />
  </View>

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
    return `${year}-${month}-${day}`;
  }

  function createMarkedDates() {
    const markedDates: MarkedDates = {};

    function addOpenDateDots(e: GetInterestPopUpListResponse) {
      if (!markedDates[e.open_date]) {
        markedDates[e.open_date] = {
          marked: true,
          dots: [
            { color: globalColors.purple},
          ],
        }
      } else {
        const dots: any = markedDates[e.open_date].dots
        if (!dots) {
          markedDates[e.open_date] = {
            marked: true,
            dots: [
              { color: globalColors.purple},
            ],
          }
        } else {
          switch (dots.length) {
            case 1:
              dots.push({ color: globalColors.blue })
              break;
            case 2:
              dots.push({ color: globalColors.purpleLight })
              break;
          }
        }
      }
    }

    function addCloseDateDots(e: GetInterestPopUpListResponse) {
      if (!markedDates[e.close_date]) {
        markedDates[e.close_date] = {
          marked: true,
          dots: [
            { color: globalColors.purple},
          ],
        }
      } else {
        const dots: any = markedDates[e.close_date].dots
        if (!dots) {
          markedDates[e.close_date] = {
            marked: true,
            dots: [
              { color: globalColors.purple},
            ],
          }
        } else {
          switch (dots.length) {
            case 1:
              dots.push({ color: globalColors.blue })
              break;
            case 2:
              dots.push({ color: globalColors.purpleLight })
              break;
          }
        }
      }
    }

    function setTodayMarking() {
      markedDates[getTodayDate()] = {
        selected: true,
        selectedColor: globalColors.purpleLight,
        selectedTextColor: globalColors.black,
      };
    }

    function setSelectedMarking() {
      markedDates[selDate] = {
        selected: true,
        selectedColor: globalColors.purple,
        selectedTextColor: globalColors.white,
        // marked: true,

      };
    }

    // 오늘 날짜 마킹
    setTodayMarking();

    // 선택 날짜 마킹
    setSelectedMarking();

    // 오픈, 마감 날짜 점찍기
    data?.forEach(e=> {
      addOpenDateDots(e);
      addCloseDateDots(e);
    });

    return markedDates;
  }
}

export default NormalCalendarComponent
