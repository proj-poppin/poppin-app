import ClockSvg from '../assets/icons/clock.svg';
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import DatePicker from 'react-native-date-picker';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DividerLine from './DividerLine.tsx';
import CompleteButton from './atoms/button/CompleteButton.tsx';
import Text18B from '../styles/texts/body_large/Text18B.ts';
import useBackdrop from '../hooks/common/useBackDrop.tsx';
import {useReducedMotion} from 'react-native-reanimated';
interface Times {
  start: string;
  end: string;
}

interface OperationHoursBottomSheetProps {
  setOperationTimes: (times: {start: string; end: string}) => void;
  operationTimes: Times; // 추가: 초기값을 받도록 수정
}

const OperationHoursBottomSheet: React.FC<OperationHoursBottomSheetProps> = ({
  setOperationTimes,
  operationTimes,
}) => {
  const [times, setTimes] = useState<Times>(operationTimes); // 초기값 설정
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tempTime, setTempTime] = useState(new Date());
  const [selectionMode, setSelectionMode] = useState('start');
  const reducedMotion = useReducedMotion();

  const showTimePicker = (type: 'start' | 'end') => {
    setSelectionMode(type);
    bottomSheetModalRef.current?.present();
  };

  const getInputStyle = (value: string) => ({
    color:
      value === '오픈 시간' || value === '종료 시간'
        ? globalColors.font
        : globalColors.black,
  });

  const handleComplete = () => {
    const formattedTimes = {
      start: formatTimeForData(times.start),
      end: formatTimeForData(times.end),
    };
    setOperationTimes(formattedTimes); // Set the operation times using the passed prop
    bottomSheetModalRef.current?.dismiss();
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

  const formatTimeForData = (time: string) => {
    const match = time.match(/오전|오후|\d{1,2}/g);
    if (!match) {
      return time;
    } // 매치되지 않으면 원래 문자열 반환

    const [period, hour, minute] = match;
    let hours = parseInt(hour);
    const minutes = minute ? parseInt(minute.replace('분', ''), 10) : 0;

    if (period === '오후' && hours !== 12) {
      hours += 12;
    } else if (period === '오전' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <Pressable
          style={[styles.input, styles.firstInput]}
          onPress={() => showTimePicker('start')}>
          <Text style={getInputStyle(times.start)}>{times.start}</Text>
        </Pressable>
        <Text style={styles.toText}>~</Text>
        <Pressable
          style={[styles.input, styles.secondInput]}
          onPress={() => showTimePicker('end')}>
          <Text style={getInputStyle(times.end)}>{times.end}</Text>
          <ClockSvg />
        </Pressable>
      </View>

      <BottomSheetModal
        animateOnMount={!reducedMotion}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['60%']}
        backdropComponent={useBackdrop}>
        <View style={styles.sheetTitleContainer}>
          <Text style={[Text18B.text, {textAlign: 'center'}]}>
            팝업의 운영 기간을 알려주세요
          </Text>
        </View>

        <View style={styles.dateRow}>
          <Text style={[Text18B.text, {marginLeft: 10}]}>시작</Text>
          <Pressable
            style={({pressed}) => [
              styles.timeInputContainer,
              pressed && {backgroundColor: globalColors.warmGray},
            ]}
            onPress={() => setSelectionMode('start')}>
            <Text style={getInputStyle(times.start)}>{times.start}</Text>
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
            <Text style={getInputStyle(times.end)}>{times.end}</Text>
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
    flex: 1,
    marginLeft: 10,
    color: globalColors.black,
  },
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default OperationHoursBottomSheet;
