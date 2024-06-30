import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import {GetInterestPopUpListResponse} from '../../../types/PopUpListData.ts';
import {DayState, MarkedDates} from 'react-native-calendars/src/types';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import globalColors from '../../../styles/color/globalColors.ts';
import HeaderTitle from './HeaderTitle.tsx';
import {createDateData, fullCalendarTheme} from './calendarUtils.ts';
import XDate from 'xdate';

interface FullCalendarProps {
  popupList: GetInterestPopUpListResponse[] | null;
  handlePresentModalPress: any;
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
  selDate: DateData;
  setSelDate: React.Dispatch<React.SetStateAction<DateData>>;
  dateTimePickerYearMonthRef: React.RefObject<string>;
  onClickHeaderTitle: (dateData: DateData) => void;
}

const FullCalendarComponent: React.FC<FullCalendarProps> = ({
  popupList,
  handlePresentModalPress,
  markedDates,
  setMarkedDates,
  selDate,
  onClickHeaderTitle,
  dateTimePickerYearMonthRef,
  setSelDate,
}) => {
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

  console.log(`지금 선택된 날짜는: ${selDate.dateString}`);

  return (
    <View style={styles.container}>
      <ScrollView>
        <CalendarList
          current={selDate.dateString}
          renderHeader={(date?: XDate) => {
            dateTimePickerYearMonthRef.current = date!.toString('yyyy.MM');
            return (
              <HeaderTitle
                selDate={date!.toString('yyyy-MM-dd')}
                onClickHeaderTitle={onClickHeaderTitle}
              />
            );
          }}
          onPressArrowLeft={(method, month) => {
            method();
          }}
          onPressArrowRight={(method, month) => {
            method();
          }}
          hideArrows={false}
          horizontal={true}
          markedDates={markedDates}
          pagingEnabled={true}
          theme={fullCalendarTheme}
          dayComponent={({date, state, marking}) => (
            <TouchableOpacity
              onPress={() => {
                // 새로운 마크된 날짜 객체 생성
                const updatedMarkedDates = {...markedDates};

                // 모든 select 초기화
                Object.keys(updatedMarkedDates).forEach(day => {
                  if (!updatedMarkedDates[day].today) {
                    updatedMarkedDates[day].selected = false;
                  }
                });

                // 선택된 날로 select
                if (updatedMarkedDates[date!.dateString]) {
                  updatedMarkedDates[date!.dateString].selected =
                    !updatedMarkedDates[date!.dateString].selected;
                } else {
                  updatedMarkedDates[date!.dateString] = {
                    selected: true,
                    selectedColor: globalColors.purple,
                    selectedTextColor: globalColors.white,
                  };
                }
                setMarkedDates(updatedMarkedDates);
                setSelDate(date!);
                handlePresentModalPress();
              }}>
              <FullCalendarItem
                date={date}
                marking={marking}
                state={state}
                popupList={popupList}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

interface FullCalendarItemProps {
  date: DateData | undefined;
  state: DayState | undefined;
  marking: MarkingProps | undefined;
  popupList: GetInterestPopUpListResponse[] | null;
}
const FullCalendarItem: React.FC<FullCalendarItemProps> = ({
  date,
  state,
  marking,
  popupList,
}) => {
  return (
    <View style={[styles.calendarItemContainer]}>
      <DayComponent day={date?.day} state={state} marking={marking} />
      {marking?.dots?.map((e, index) => {
        const textColor =
          index == 2
            ? {color: globalColors.black}
            : {color: globalColors.white};
        return (
          <View
            key={index}
            style={[styles.markedContainer, {backgroundColor: e.color}]}>
            <Text
              style={[styles.markedText, textColor]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {e.key}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

interface DayProps {
  day: number | undefined;
  state: string | undefined;
  marking: MarkingProps | undefined;
}
const DayComponent: React.FC<DayProps> = dayProps => {
  const todayStyle =
    dayProps.state === 'today'
      ? {backgroundColor: globalColors.purpleLight}
      : {};
  const selContainerStyle = dayProps.marking?.selected
    ? {backgroundColor: globalColors.purple}
    : {};
  const selTextStyle = dayProps.marking?.selected
    ? {color: globalColors.white}
    : {};

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={[
          todayStyle,
          selContainerStyle,
          {borderRadius: 30, width: 28, height: 28, justifyContent: 'center'},
        ]}>
        <Text style={[styles.calenderItemText, selTextStyle]}>
          {dayProps.day}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 60
  },
  calendarItemContainer: {
    flex: 1,
    height: 88,
    flexDirection: 'column',
    alignItems: 'center',
  },

  calenderItemText: {
    color: 'black',
    textAlign: 'center',
  },
  markedContainer: {
    width: 48,
    height: 14,
    justifyContent: 'center',
    marginTop: 0.53,
    marginBottom: 2.2,
    borderRadius: 2,
  },
  markedText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 2.57,
    marginRight: 2.57,
    fontWeight: '600',
  },
});

export default FullCalendarComponent;
