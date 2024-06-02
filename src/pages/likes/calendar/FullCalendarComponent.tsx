/* eslint-disable */
import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import { GetInterestPopUpListResponse } from "../../../types/PopUpListData.ts";
import { DayState, MarkedDates } from "react-native-calendars/src/types";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import globalColors from "../../../styles/color/globalColors.ts";
import DividerLine from "../../../components/DividerLine.tsx";

interface FullCalendarProps {
  popupList: GetInterestPopUpListResponse[] | null;
  handlePresentModalPress: any;
  markedDates: MarkedDates;
}
const FullCalendarComponent: React.FC<FullCalendarProps> = ({popupList, handlePresentModalPress, markedDates}) => {
  return (
    <View style={styles.container}>
      <CalendarList
        horizontal={true}
        markedDates={markedDates}
        pagingEnabled={true}
        dayComponent={({date, state, marking }) =>
          <TouchableOpacity
          onPress={handlePresentModalPress}
          >
            <FullCalendarItem
              date={date}
              marking={marking}
              state={state}
              popupList={popupList}/>
          </TouchableOpacity>
      }
      />
    </View>
  );
}

interface FullCalendarItemProps {
  date: DateData | undefined,
  state: DayState| undefined,
  marking: MarkingProps| undefined,
  popupList: GetInterestPopUpListResponse[] | null,
}
const FullCalendarItem: React.FC<FullCalendarItemProps> = ({date, state, marking,popupList}) => {
  const containerStyle = state ? { backgroundColor: globalColors.purple } : {};
  console.log(state);
  return (
    <View style={[styles.calendarItemContainer]}>
        <DayComponent day={date?.day}/>
        {/*<Text style={[styles.calenderItemText, containerStyle]}>{date?.day}</Text>*/}



      {
        marking?.dots?.map((e) =>
          <View style={[styles.markedContainer, {backgroundColor: e.color}]}>
            <Text style={styles.markedText} numberOfLines={1} ellipsizeMode={"tail"}>{e.key}</Text>
          </View>
        )
      }
    </View>
  );
}

interface DayProps {
  day: number | undefined;
}
const DayComponent: React.FC<DayProps> = (day) => {
  return <View style={{backgroundColor: globalColors.purpleLight, borderRadius:30, width:28, height:28, justifyContent:'center', alignContent:'center'}}>
    <Text style={styles.calenderItemText}>{day.day}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarItemContainer: {
    width: 38,
    height: 88,
    flexDirection:'column',
    alignItems: 'center',
    // borderWidth: 1
  },
  // 선택된 스타일을 선정 및 로직으로 정해준다.
  calenderItemText: {
    color: "black",
    textAlign:'center',
  },
  markedContainer: {
    width: 48,
    height: 14,
    justifyContent:'center',
    marginTop: 0.53,
    marginBottom: 2.2,
    borderRadius: 2,

  },
  markedText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 2.57,
    fontWeight: '600',
  },

})

export default FullCalendarComponent
