/* eslint-disable */
import {Text, TouchableOpacity, View} from 'react-native';
import XDate from 'xdate';
import React from 'react';
import VButton from '../../../assets/likes/VButton.svg';
import {DateData} from 'react-native-calendars';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const stringToDateData = (dateString: string): DateData => {
  const date = new XDate(dateString);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Months are zero-based in XDate
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: date.toString('yyyy-MM-dd'),
  };
};

interface HeaderTitleProps {
  selDate: string;
  onClickHeaderTitle: (dateData: DateData) => void;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  selDate,
  onClickHeaderTitle,
}) => {
  const dateData: DateData = stringToDateData(selDate);
  return (
    <TouchableOpacity
      onPress={() => {
        onClickHeaderTitle(dateData);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: '600', fontSize: 20, marginRight: 8}}>
          {dateData?.year}.{dateData?.month}
        </Text>
        <VButton />
      </View>
    </TouchableOpacity>
  );
};

export default HeaderTitle;
