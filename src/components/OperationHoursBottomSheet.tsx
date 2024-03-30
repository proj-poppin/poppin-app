import ClockSvg from '../assets/icons/clock.svg';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import DatePicker from 'react-native-date-picker';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import DividerLine from './DividerLine.tsx';
import CompleteButton from './CompleteButton.tsx';
import Text18B from '../styles/texts/body_large/Text18B.ts';
import Text18R from '../styles/texts/body_large/Text18R.ts';

interface Times {
  start: string;
  end: string;
}

const OperationHoursBottomSheet = () => {
  const [times, setTimes] = useState<Times>({
    start: '오픈 시간',
    end: '종료 시간',
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tempTime, setTempTime] = useState(new Date());
  const [selectionMode, setSelectionMode] = useState('start');
  const handleTimeConfirm = (time: Date) => {
    console.log(time);

    // 시간과 분을 가져옵니다.
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // 오전/오후 구분
    const period = hours < 12 ? '오전' : '오후';
    const adjustedHour = hours % 12 === 0 ? 12 : hours % 12;

    let formattedTime = period + ' ' + adjustedHour.toString();
    if (minutes === 0) {
      formattedTime += '시'; // 분이 '00'인 경우
    } else {
      formattedTime += `시 ${minutes.toString().padStart(2, '0')}분`;
    }

    // 'times' 상태를 업데이트합니다.
    setTimes(prevTimes => ({
      ...prevTimes,
      [selectionMode]: formattedTime, // 'start' 또는 'end' 기반으로 업데이트
    }));
    bottomSheetModalRef.current?.dismiss(); // 바텀 시트 닫기
  };

  const showTimePicker = (type: 'start' | 'end') => {
    setSelectionMode(type);
    bottomSheetModalRef.current?.present();
  };

  const getInputStyle = (type: string) => ({
    color: selectionMode === type ? globalColors.calendar : 'black',
  });

  // 바깥 화면 터치 시 바텀 시트를 내리도록 설정
  const renderBackdrop = (props: any) => (
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

  const onTimeChange = (selectedTime: Date) => {
    setTempTime(selectedTime);

    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();

    // 오전/오후 구분
    const period = hours < 12 ? '오전' : '오후';
    const adjustedHour = hours % 12 === 0 ? 12 : hours % 12;

    let formattedTime = period + ' ' + adjustedHour.toString();
    if (minutes === 0) {
      formattedTime += '시';
    } else {
      formattedTime += `시 ${minutes.toString().padStart(2, '0')}분`;
    }

    // 'times' 상태를 업데이트합니다.
    setTimes(prevTimes => ({
      ...prevTimes,
      [selectionMode]: formattedTime, // 'start' 또는 'end' 기반으로 업데이트
    }));
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <View style={[styles.input, styles.firstInput]}>
          <Text style={{color: globalColors.font}}>{times.start}</Text>
        </View>
        <Text style={styles.toText}>~</Text>
        <TouchableOpacity
          style={[styles.input, styles.secondInput]}
          onPress={() => showTimePicker('start')}>
          <Text style={{color: globalColors.font}}>{times.end}</Text>
          <ClockSvg />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['60%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.sheetTitleContainer}>
          <Text style={[Text18B.text, {textAlign: 'center'}]}>
            팝업의 운영 기간을 알려주세요
          </Text>
        </View>

        <View style={styles.dateRow}>
          <Text style={[Text18R.text, {marginLeft: 10}]}>시작</Text>
          <Pressable
            style={({pressed}) => [
              styles.timeInputContainer,
              pressed && {backgroundColor: globalColors.warmGray},
            ]}
            onPress={() => setSelectionMode('start')}>
            <Text style={getInputStyle('start')}>{times.start}</Text>
          </Pressable>
        </View>
        <DividerLine height={1} />
        <View style={styles.dateRow}>
          <Text style={[Text18B.text, {marginLeft: 10}]}>종료</Text>
          <Pressable
            style={({pressed}) => [
              styles.timeInputContainer,
              pressed && {backgroundColor: globalColors.warmGray},
            ]}
            onPress={() => setSelectionMode('end')}>
            <Text style={getInputStyle('end')}>{times.end}</Text>
          </Pressable>
        </View>
        <DividerLine height={1} />
        <View style={styles.centeredView}>
          <DatePicker
            mode="time"
            locale="ko"
            date={tempTime}
            onDateChange={onTimeChange}
          />
        </View>
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
    borderColor: globalColors.warmGray,
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
    color: globalColors.font,
  },
  timeInputContainer: {
    alignItems: 'center',
    height: 35,
    backgroundColor: globalColors.component,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  dateInput: {
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: globalColors.black,
  },
  centeredView: {
    alignItems: 'center', // 수평 중앙 정렬
    justifyContent: 'center', // 수직 중앙 정렬
    flex: 1, // 부모 컨테이너를 꽉 채우기
  },
});

export default OperationHoursBottomSheet;
