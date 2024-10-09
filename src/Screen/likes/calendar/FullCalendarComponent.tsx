import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
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
import {fullCalendarTheme} from './calendarUtils.ts';
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
  onRefresh: () => void;
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
  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
          />
        }>
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
          onPressArrowLeft={method => {
            method();
          }}
          onPressArrowRight={method => {
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
                const updatedMarkedDates = {...markedDates};
                Object.keys(updatedMarkedDates).forEach(day => {
                  if (!updatedMarkedDates[day].today) {
                    updatedMarkedDates[day].selected = false;
                  }
                });

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
            key={`${e.key}-${index}`} // Unique key generation
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
