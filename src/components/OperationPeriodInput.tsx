import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Calendar} from 'react-native-calendars'; // Ensure this is installed
import CalendarGraySvg from '../assets/icons/calendarGray.svg'; // Your SVG path
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';
import DividerLine from './DividerLine.tsx';
import KakaoSvg from '../assets/icons/social_login/kakao.svg';
import CompleteButton from './CompleteButton.tsx';
import {LocaleConfig} from 'react-native-calendars/src';

// 한국어 설정
LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

const OperationPeriodInput = ({onPeriodSelected}) => {
  const [dates, setDates] = useState({start: '', end: ''});
  const [selectionMode, setSelectionMode] = useState('start'); // 'start' 또는 'end'를 나타내는 상태
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDates({start: today, end: today});
  }, []);

  const handleOpenCalendar = mode => {
    setSelectionMode(mode); // 'start' 또는 'end' 선택 모드 설정
    bottomSheetModalRef.current?.present();
  };

  const handleDateSelected = day => {
    const selectedDate = day.dateString;

    // 선택한 날짜가 현재 시작 날짜보다 뒤에 있을 경우
    if (selectedDate > dates.start) {
      // 기존의 시작 날짜를 종료 날짜로 설정하고, 선택한 날짜를 새로운 종료 날짜로 설정
      console.log(selectedDate);
      console.log(dates.start);
      setDates({start: dates.end, end: selectedDate});
    } else {
      // 선택한 날짜가 현재 시작 날짜보다 앞에 있거나 같을 경우
      // 선택한 날짜를 시작 날짜로 설정하고, 종료 날짜는 변경하지 않음
      setDates({start: selectedDate, end: dates.end});
    }
  };
  const handleComplete = () => {
    // 바텀 시트 닫기
    bottomSheetModalRef.current?.dismiss();
    // 필요한 경우, 여기에서 날짜 저장 로직을 추가할 수 있습니다.
    // 예: onPeriodSelected(dates);
  };

  // 바깥 화면 터치 시 바텀 시트를 내리도록 설정
  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  // 캘린더에서 날짜를 선택했을 때의 시각적 표시 조정
  const getMarkedDates = () => {
    let markedDates = {};

    // '시작' 날짜 설정
    if (dates.start) {
      markedDates[dates.start] = {
        selected: true,
        startingDay: true,
        color: '#D3F2FC',
        textColor: primaryColors.calendar,
      };
    }

    const handleOpenCalendar = type => {
      // 현재 선택 모드 설정 ('start' 또는 'end')
      setSelectionMode(type);
      bottomSheetModalRef.current?.present();
    };

    // '종료' 날짜 설정 (연한 하늘색으로 동그랗게 배경 표시)
    if (dates.end && dates.end !== dates.start) {
      markedDates[dates.end] = {
        selected: true,
        endingDay: true,
        color: '#D3F2FC',
        textColor: primaryColors.calendar,
      };
    }

    return markedDates;
  };

  // 날짜 입력 필드를 렌더링하는 함수
  const renderDateInputField = (label, value, key) => (
    <View key={key} style={styles.dateRow}>
      <Text style={[globalStyles.bodyLargeSub, {marginLeft: 10}]}>{label}</Text>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={[styles.dateInput, key === 'start' && {color: 'black'}]} // 시작 날짜는 검정색으로 표시
          value={value}
          editable={false}
        />
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={[styles.input, styles.firstInput]}
          onPress={() => handleOpenCalendar('start')}>
          <Text style={{color: primaryColors.font}}>
            {dates.start || '오픈일'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.toText}>~</Text>
        <TouchableOpacity
          style={[styles.input, styles.secondInput]}
          onPress={() => handleOpenCalendar('end')}>
          <Text style={{color: primaryColors.font}}>
            {dates.end || '종료일'}
          </Text>
          <CalendarGraySvg />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['85%']}
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
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInputStart}
              value={dates.start}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.dateRow}>
          <Text style={[globalStyles.bodyLargeSub, {marginLeft: 10}]}>
            종료
          </Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              value={dates.end}
              editable={false}
            />
          </View>
        </View>
        <DividerLine height={1} />
        {/*<Calendar*/}
        {/*  onDayPress={({dateString}) => handleDateSelected(dateString)}*/}
        {/*/>*/}
        <Calendar
          onDayPress={handleDateSelected}
          markedDates={getMarkedDates()}
          markingType={''}
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
    alignItems: 'center', // Center the title container horizontally
    padding: 16, // Add some padding around the title for spacing
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8, // Adjust as needed
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8, // Adjust as needed
  },
  input: {
    borderWidth: 1,
    borderColor: primaryColors.warmGray,
    borderRadius: 20,
    height: 40,
    padding: 10,
    flex: 1,
    marginHorizontal: 4, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstInput: {
    flexDirection: 'row',
    justifyContent: 'start',
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
    height: 30,
    backgroundColor: primaryColors.component,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  dateInput: {
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: primaryColors.black,
  },
});

export default OperationPeriodInput;
