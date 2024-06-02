/* eslint-disable */
import { Text, View } from "react-native";
import XDate from 'xdate';
import React from "react";
import VButton from "/Users/gwagmin-u/Documents/0_workspace/react-native/poppin-app/src/assets/likes/VButton.svg"
import { DateData } from "react-native-calendars";

const stringToDateData = (dateString: string): DateData => {
  const date = new XDate(dateString);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Months are zero-based in XDate
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: date.toString('yyyy-MM-dd')
  };
};

const HeaderTitle: React.FC<{selDate: string}> = ({selDate}) => {
  const dateData: DateData = stringToDateData(selDate);
  return (
    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginBottom:20}}>
      <Text style={{fontWeight:"600", fontSize:20, marginRight:8}}>{dateData?.year}.{dateData?.month}</Text>
      <VButton />
    </View>
  );
}

export default HeaderTitle;
