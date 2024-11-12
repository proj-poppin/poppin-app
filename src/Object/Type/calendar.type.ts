import {MarkedDates} from 'react-native-calendars/src/types';
import React from 'react';
import {DateData} from 'react-native-calendars';

export type NormalCalendarComponentProps = {
  onModalOpen: () => void; // 모달을 열기 위한 함수
  markedDates: MarkedDates; // 마킹된 날짜들
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>; // 마킹된 날짜를 설정하는 함수
  selectedDate: DateData; // 선택된 날짜
  setSelectedDate: React.Dispatch<React.SetStateAction<DateData>>; // 선택된 날짜를 설정하는 함수
  yearMonthPickerRef: React.RefObject<string>; // 연도와 월을 선택하는 피커의 참조 객체
  onHeaderTitleClick: (dateData: DateData) => void; // 헤더 타이틀을 클릭했을 때 실행되는 함수
};
