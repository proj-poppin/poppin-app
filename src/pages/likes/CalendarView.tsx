import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import globalColors from '../../styles/color/globalColors';

const CalendarView = ({
  selectedDate,
  getMarkedDates,
  handleDateSelected,
  renderBottomSheetContent,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={{flex: 1}}>
      <Calendar
        onDayPress={handleDateSelected}
        markedDates={getMarkedDates()}
        markingType="multi-dot"
        theme={{
          textDayHeaderFontWeight: '600',
          textMonthFontWeight: '600',
          todayButtonFontWeight: '600',
          arrowColor: globalColors.black,
          backgroundColor: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: globalColors.purple,
          todayTextColor: globalColors.blue,
          selectedDayTextColor: globalColors.white,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          textDayFontSize: 16,
          textDayFontWeight: '500',
        }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '40%', '75%']}
        backgroundStyle={styles.bottomSheetBackground}
        handleStyle={styles.bottomSheetHandle}>
        {renderBottomSheetContent()}
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  bottomSheetHandle: {},
});

export default CalendarView;
