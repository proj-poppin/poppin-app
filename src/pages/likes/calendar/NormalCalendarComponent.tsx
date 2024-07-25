import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import globalColors from '../../../styles/color/globalColors.ts';
import HeaderTitle from './HeaderTitle.tsx';
import {normalCalendarTheme} from './calendarUtils.ts';
import XDate from 'xdate';
import {subtractMonthFromString} from '../../../utils/function/subtractMonthFromString.ts';
import {NormalCalendarComponentProps} from '../../../types/NormalCalendarComponentProps.ts';
export const NormalCalendarComponent: React.FC<
  NormalCalendarComponentProps
> = ({
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
