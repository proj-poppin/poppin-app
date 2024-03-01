import ClockSvg from '../assets/icons/clock.svg';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import DatePicker from 'react-native-date-picker';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {globalStyles} from '../style/textStyles.ts';
import DividerLine from './DividerLine.tsx';
import {Calendar} from 'react-native-calendars';
import CompleteButton from './CompleteButton.tsx';

const OperationTimerInput = ({onTimesSelected}) => {
  const [times, setTimes] = useState({start: '오픈 시간', end: '종료 시간'});
  const [open, setOpen] = useState(false);
  const [timeType, setTimeType] = useState(null); // 'start' or 'end'
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tempTime, setTempTime] = useState(new Date());

  const handleTimeConfirm = time => {
    console.log(time);
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    setTimes(prevTimes => ({
      ...prevTimes,
      [timeType]: formattedTime, // 'start' 또는 'end'에 따라 동적으로 키를 설정
    }));
    setOpen(false); // DatePicker 모달 닫기
    bottomSheetModalRef.current?.dismiss(); // 바텀 시트 닫기
  };

  const showTimePicker = type => {
    setTimeType(type); // 현재 설정하려는 시간 유형을 'start' 또는 'end'로 설정
    setOpen(true); // DatePicker 모달을 열기
    bottomSheetModalRef.current?.present(); // 바텀 시트를 표시
  };

  const getInputStyle = type => ({
    ...styles.dateInput,
    color: timeType === type ? primaryColors.blue : primaryColors.black, // 현재 선택된 시간 유형에 따라 색상 변경
  });

  // 바깥 화면 터치 시 바텀 시트를 내리도록 설정
  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );
  const handleComplete = () => {
    handleTimeConfirm(tempTime); // 임시 시간을 최종 시간으로 설정
    bottomSheetModalRef.current?.dismiss(); // 바텀 시트 닫기
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={[styles.input, styles.firstInput]}
          onPress={() => showTimePicker('start')}>
          <Text style={{color: primaryColors.font}}>{times.start}</Text>
        </TouchableOpacity>
        <Text style={styles.toText}>~</Text>
        <TouchableOpacity
          style={[styles.input, styles.secondInput]}
          onPress={() => showTimePicker('end')}>
          <Text style={{color: primaryColors.font}}>{times.end}</Text>
          <ClockSvg />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['70%']}
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
              style={getInputStyle('start')} // 동적 스타일 적용
              value={times.start}
              editable={false}
            />
          </View>
        </View>
        <DividerLine height={1} />
        <View style={styles.dateRow}>
          <Text style={[globalStyles.bodyLargeSub, {marginLeft: 10}]}>
            종료
          </Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={getInputStyle('end')} // 동적 스타일 적용
              value={times.end}
              editable={false}
            />
          </View>
        </View>
        <DatePicker
          mode="time"
          locale="ko"
          date={tempTime}
          onDateChange={setTempTime}
          onCancel={() => setOpen(false)}
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
  // Styles remain unchanged
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

export default OperationTimerInput;
