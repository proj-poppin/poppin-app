// BirthDateInput.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import Text20B from '../styles/texts/title/Text20B.ts';

const BirthDateInput = ({onChange, value, labelText}) => {
  const [year, setYear] = useState(value.slice(0, 4));
  const [month, setMonth] = useState(value.slice(5, 7));
  const [day, setDay] = useState(value.slice(8, 10));

  const handleYearChange = text => {
    setYear(text);
    onChange(`${text}.${month}.${day}`);
  };

  const handleMonthChange = text => {
    setMonth(text);
    onChange(`${year}.${text}.${day}`);
  };

  const handleDayChange = text => {
    setDay(text);
    onChange(`${year}.${month}.${text}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[Text20B.text, {marginBottom: 8}]}>{labelText}</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.textInput}
          value={year}
          onChangeText={handleYearChange}
          placeholder="YYYY"
          maxLength={4}
          keyboardType="number-pad"
        />
        <Text style={styles.separator}>년</Text>
        <TextInput
          style={styles.textInput}
          value={month}
          onChangeText={handleMonthChange}
          placeholder="MM"
          maxLength={2}
          keyboardType="number-pad"
        />
        <Text style={styles.separator}>월</Text>
        <TextInput
          style={styles.textInput}
          value={day}
          onChangeText={handleDayChange}
          placeholder="DD"
          maxLength={2}
          keyboardType="number-pad"
        />
        <Text style={styles.separator}>일</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: globalColors.warmGray,
    paddingVertical: 10,
    fontFamily: 'Pretandard-Regular',
    fontSize: 18,
    fontWeight: '400',
    width: 50,
    textAlign: 'center',
  },
  separator: {
    fontSize: 18,
    color: globalColors.black,
    marginHorizontal: 2,
  },
});

export default BirthDateInput;
