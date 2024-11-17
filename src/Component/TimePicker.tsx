// TimePickerModal.tsx
import React, {useState} from 'react';
/**
 * datetimepicker 관련해서 패키지 오류가 뜰 때는 다음과 같이 해결한다.
 * see: https://github.com/react-native-datetimepicker/datetimepicker/issues/866
 * @author 홍규진
 * */
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import {moderateScale} from '../Util';

type TimeType = 'start' | 'end';

interface TimePickerProps {
  initialStartTime: Date;
  initialEndTime: Date;
  type: TimeType;
  onTimeSelect: (type: TimeType, date: Date) => void;
  onClose: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  initialStartTime,
  initialEndTime,
  type,
  onTimeSelect,
  onClose,
}) => {
  const [selectedTime, setSelectedTime] = useState(
    type === 'start' ? initialStartTime : initialEndTime,
  );

  return (
    <Container>
      <Header>
        <CancelButton onPress={onClose}>
          <ButtonText color="#007AFF">취소</ButtonText>
        </CancelButton>
        <HeaderTitle>
          {type === 'start' ? '시작 시간' : '종료 시간'}
        </HeaderTitle>
        <DoneButton
          onPress={() => {
            onTimeSelect(type, selectedTime);
            onClose();
          }}>
          <ButtonText color="#007AFF">완료</ButtonText>
        </DoneButton>
      </Header>

      <DateTimePicker
        value={selectedTime}
        mode="time"
        display="spinner"
        onChange={(event, date) => {
          if (date) setSelectedTime(date);
        }}
        style={{height: 200}}
        textColor="black"
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: #f2f2f2;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(8)}px ${moderateScale(16)}px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`;

const HeaderTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
  color: black;
`;

const BaseButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
`;

const CancelButton = styled(BaseButton)``;

const DoneButton = styled(BaseButton)``;

const ButtonText = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: ${moderateScale(16)}px;
`;

export default TimePicker;
