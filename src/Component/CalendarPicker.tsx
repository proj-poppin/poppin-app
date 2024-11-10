// CalendarPicker.tsx
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import styled from 'styled-components/native';
import {moderateScale} from '../Util';

// 한국어 로케일 설정
LocaleConfig.locales['kr'] = {
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
};
LocaleConfig.defaultLocale = 'kr';

type DateType = 'start' | 'end';

interface CalendarPickerProps {
  type: DateType;
  openDate?: string;
  closeDate?: string;
  onSelectDate: (type: DateType, date: string) => void;
  onClose: () => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  type,
  openDate,
  closeDate,
  onSelectDate,
  onClose,
}) => {
  const [selected, setSelected] = useState(
    type === 'start' ? openDate : closeDate,
  );

  const handleDayPress = (day: any) => {
    // 시작일이 종료일보다 늦거나, 종료일이 시작일보다 이르면 선택 불가
    if (type === 'start' && closeDate && day.dateString > closeDate) {
      return;
    }
    if (type === 'end' && openDate && day.dateString < openDate) {
      return;
    }

    setSelected(day.dateString);
  };

  // 선택 가능한 날짜 범위 설정
  const minDate = type === 'end' && openDate ? openDate : undefined;
  const maxDate = type === 'start' && closeDate ? closeDate : undefined;

  // 마킹할 날짜들 계산
  const getMarkedDates = () => {
    const marked: any = {};

    if (openDate) {
      marked[openDate] = {
        selected: true,
        selectedColor: '#007AFF',
        startingDay: true,
      };
    }

    if (closeDate) {
      marked[closeDate] = {
        selected: true,
        selectedColor: '#007AFF',
        endingDay: true,
      };
    }

    // 현재 선택된 날짜 마킹
    if (selected && selected !== openDate && selected !== closeDate) {
      marked[selected] = {
        selected: true,
        selectedColor: '#007AFF',
      };
    }

    return marked;
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>
          {type === 'start' ? '시작일 선택' : '종료일 선택'}
        </HeaderTitle>
        <CloseButton onPress={onClose}>
          <CloseText>×</CloseText>
        </CloseButton>
      </Header>

      <Calendar
        current={selected}
        onDayPress={handleDayPress}
        minDate={minDate}
        maxDate={maxDate}
        markedDates={getMarkedDates()}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000000',
          selectedDayBackgroundColor: '#007AFF',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#007AFF',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#007AFF',
          selectedDotColor: '#ffffff',
          arrowColor: '#007AFF',
          monthTextColor: '#000000',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />

      <BottomButtons>
        <ConfirmButton
          onPress={() => {
            if (selected) {
              onSelectDate(type, selected);
              onClose();
            }
          }}>
          <ConfirmButtonText>확인</ConfirmButtonText>
        </ConfirmButton>
      </BottomButtons>
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  padding: ${moderateScale(20)}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${moderateScale(20)}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${moderateScale(5)}px;
`;

const CloseText = styled.Text`
  font-size: ${moderateScale(24)}px;
  color: #999;
`;

const BottomButtons = styled.View`
  margin-top: ${moderateScale(20)}px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: ${moderateScale(15)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;

export default CalendarPicker;
