import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Calendar} from 'react-native-calendars'; // Ensure this is installed
import CalendarGraySvg from '../assets/icons/calendarGray.svg'; // Your SVG path
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';
import DividerLine from './DividerLine.tsx';
import CompleteButton from './CompleteButton.tsx';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface Dates {
  start: string;
  end: string;
}

const OperationCalendarBottomSheet: React.FC = () => {
  const [dates, setDates] = useState<Dates>({start: '', end: ''});
  const [selectionMode, setSelectionMode] = useState('start');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    setDates({start: todayStr, end: tomorrowStr});
  }, []);

  const handleOpenCalendar = (mode: 'start' | 'end') => {
    setDates(prev => ({...prev, mode}));
    bottomSheetModalRef.current?.present();
  };

  // 캘린더에서 날짜 선택 시 호출되는 함수 수정
  const handleDateSelected = (day: {dateString: any}) => {
    const selectedDate = day.dateString;
    const newDate = new Date(selectedDate);

    if (selectionMode === 'start') {
      newDate.setDate(newDate.getDate() + 1); // 선택한 날짜의 다음 날
      const nextDay = newDate.toISOString().split('T')[0];

      if (selectedDate > dates.end) {
        // 시작 날짜가 종료 날짜보다 뒤일 경우
        setDates({start: selectedDate, end: nextDay}); // 종료 날짜를 시작 날짜의 다음 날로 설정
      } else {
        setDates({...dates, start: selectedDate});
      }
      // setSelectionMode('end'); // 날짜 선택 후 'end' 모드로 자동 전환(기/디 의견 필요)
    } else if (selectionMode === 'end') {
      newDate.setDate(newDate.getDate() - 1); // 선택한 날짜의 전 날
      const previousDay = newDate.toISOString().split('T')[0];

      if (selectedDate < dates.start) {
        // 종료 날짜가 시작 날짜보다 앞일 경우
        setDates({start: previousDay, end: selectedDate}); // 시작 날짜를 종료 날짜의 전 날로 설정
      } else {
        setDates({...dates, end: selectedDate});
      }
    }
  };

  const getDateInputTextStyle = (type: string) => ({
    color: selectionMode === type ? primaryColors.calendar : 'black', // 선택 모드에 따라 텍스트 색상 변경
  });

  const handleComplete = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  // 바깥 화면 터치 시 바텀 시트를 내리도록 설정
  const renderBackdrop = (
    props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
  ) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  // 캘린더에서 날짜를 선택했을 때의 시각적 표시 조정
  const getMarkedDates = () => {
    let markedDates: {[date: string]: any} = {};

    if (selectionMode === 'start') {
      // 선택 모드가 'start'일 때, 시작 날짜 마킹
      if (dates.start) {
        markedDates[dates.start] = {
          selected: true,
          startingDay: true,
          endingDay: dates.start === dates.end,
          color: primaryColors.calendar,
          textColor: 'black',
          primaryColors: primaryColors.calendar,
        };
      }
    } else if (selectionMode === 'end') {
      // 선택 모드가 'end'일 때, 종료 날짜만 마킹
      if (dates.end) {
        markedDates[dates.end] = {
          selected: true,
          startingDay: dates.start === dates.end,
          endingDay: true,
          color: primaryColors.calendar,
          primaryColors: primaryColors.calendar,
          textColor: 'black',
        };
      }
    }

    // 시작 날짜와 종료 날짜가 다를 경우, 두 날짜 사이의 범위도 마킹
    if (dates.start && dates.end && dates.start !== dates.end) {
      let iterateDate = new Date(dates.start);
      let endDate = new Date(dates.end);
      while (iterateDate < endDate) {
        const dateString = iterateDate.toISOString().split('T')[0];
        if (dateString !== dates.start && dateString !== dates.end) {
          markedDates[dateString] = {
            color: primaryColors.calendar,
            textColor: 'black',
          };
        }
        iterateDate.setDate(iterateDate.getDate() + 1);
      }
    }

    return markedDates;
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <View style={[styles.input, styles.firstInput]}>
          <Text style={{color: primaryColors.font}}>
            {dates.start || '오픈일'}
          </Text>
        </View>
        <Text style={styles.toText}>~</Text>
        <TouchableOpacity
          style={[styles.input, styles.secondInput]}
          onPress={() => handleOpenCalendar('start')}>
          <Text style={{color: primaryColors.font}}>
            {dates.end || '종료일'}
          </Text>
          <CalendarGraySvg />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['75%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.sheetTitleContainer}>
          <Text
            style={[globalStyles.bodyLargePrimaryBlack, {textAlign: 'center'}]}>
            팝업의 운영 기간을 알려주세요
          </Text>
        </View>

        <View style={styles.dateRow}>
          <Text style={[globalStyles.bodyLargeSub, {marginLeft: 10}]}>
            시작
          </Text>
          <Pressable
            style={({pressed}) => [
              styles.dateInputContainer,
              pressed && {backgroundColor: primaryColors.warmGray},
            ]}
            onPress={() => setSelectionMode('start')}>
            <Text style={getDateInputTextStyle('start')}>{dates.start}</Text>
          </Pressable>
        </View>
        <DividerLine height={1} />
        <View style={styles.dateRow}>
          <Text style={[globalStyles.bodyLargeSub, {marginLeft: 10}]}>
            종료
          </Text>
          <Pressable
            style={({pressed}) => [
              styles.dateInputContainer,
              pressed && {backgroundColor: primaryColors.warmGray},
            ]}
            onPress={() => setSelectionMode('end')}>
            <Text style={getDateInputTextStyle('end')}>{dates.end}</Text>
          </Pressable>
        </View>

        <DividerLine height={1} />
        <Calendar
          theme={{
            textDayHeaderFontWeight: '600',
            textMonthFontWeight: '600',
            todayButtonFontWeight: '600',
            arrowColor: primaryColors.calendar,
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#B3E5FC',
            todayTextColor: primaryColors.calendar,
            selectedDayTextColor: primaryColors.calendar,
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            textDayFontSize: 18,
            textDayFontWeight: '500',
          }}
          onDayPress={handleDateSelected}
          markedDates={getMarkedDates()}
        />
        <DividerLine height={1} />
        <CompleteButton
          onPress={handleComplete}
          title={'확인'}
          buttonWidth={'90%'}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetTitleContainer: {
    alignItems: 'center',
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: primaryColors.warmGray,
    borderRadius: 20,
    height: 40,
    padding: 10,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  secondInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toText: {
    marginHorizontal: 10,
    color: primaryColors.font,
  },
  dateInputContainer: {
    alignItems: 'center',
    height: 33,
    width: 110,
    backgroundColor: primaryColors.component,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default OperationCalendarBottomSheet;
