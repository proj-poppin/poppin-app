import {MarkedDates} from 'react-native-calendars/src/types';
import React from 'react';
import {DateData} from 'react-native-calendars';

export type NormalCalendarComponentProps = {
  handlePresentModalPress: any;
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
  selDate: DateData;
  setSelDate: React.Dispatch<React.SetStateAction<DateData>>;
  dateTimePickerYearMonthRef: React.RefObject<string>;
  onClickHeaderTitle: (dateData: DateData) => void;
};
