import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {CommonModal} from '../Component/Modal/CommonModal.component';
import CalendarTopArrowIcon from '../Resource/svg/calendar-top-arrow-blue-icon.svg';
import {BlackBackgroundModal} from './Modal';

interface YearMonthPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (year: number, month: number) => void;
  selectedYear: number;
  selectedMonth: number;
}

const YearMonthPicker: React.FC<YearMonthPickerProps> = ({
  isVisible,
  onClose,
  onConfirm,
  selectedYear,
  selectedMonth,
}) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [monthIndex, setMonthIndex] = useState(50 * 12 + selectedMonth - 1);

  const years = Array.from({length: 9999}, (_, i) => i + 1);

  // 달 변경 처리
  const handleMonthChange = (itemIndex: number) => {
    const newMonth = (itemIndex % 12) + 1;
    const newIndex = itemIndex;

    // 인덱스를 동적으로 업데이트 (Picker를 무한 루프처럼 보이게)
    if (itemIndex < 6 * 12) {
      setMonthIndex(prevIndex => prevIndex + 12);
    } else if (itemIndex > 94 * 12) {
      setMonthIndex(prevIndex => prevIndex - 12);
    } else {
      setMonthIndex(newIndex);
    }

    setTempMonth(newMonth);
  };

  const handleConfirm = () => {
    onConfirm(tempYear, tempMonth);
    onClose();
  };

  return (
    <BlackBackgroundModal
      modalVisible={isVisible}
      setModalVisible={onClose} // 여기에 setModalVisible 전달
    >
      <CommonModal
        mainTitle={
          <TitleContainer>
            <SelectedDateText>
              {`${tempYear}.${tempMonth < 10 ? `0${tempMonth}` : tempMonth}`}
            </SelectedDateText>
            <CalendarTopArrowIcon
              width={moderateScale(18)}
              height={moderateScale(18)}
            />
          </TitleContainer>
        }
        subTitle={null}
        showIcon={false}
        showCancel={true}
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={onClose}>
        <PickerWrapper>
          <StyledPicker
            selectedValue={tempYear}
            onValueChange={itemValue => setTempYear(itemValue as number)}>
            {years.map(year => (
              <Picker.Item
                key={year}
                label={`${year}년`}
                value={year}
                color={year === tempYear ? 'black' : 'gray'}
              />
            ))}
          </StyledPicker>

          <StyledPicker
            selectedValue={monthIndex}
            onValueChange={itemIndex => handleMonthChange(itemIndex as number)}>
            {Array.from({length: 1200}).map((_, index) => (
              <Picker.Item
                key={index}
                label={`${(index % 12) + 1}월`}
                value={index}
                color={(index % 12) + 1 === tempMonth ? 'black' : 'gray'}
              />
            ))}
          </StyledPicker>
        </PickerWrapper>
      </CommonModal>
    </BlackBackgroundModal>
  );
};

const PickerWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: ${moderateScale(-20)}px;
  margin-bottom: ${moderateScale(10)}px;
`;

const StyledPicker = styled(Picker).attrs({
  itemStyle: {
    fontSize: moderateScale(16),
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },
})`
  flex: 1;
  height: ${moderateScale(150)}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-weight: bold;
  color: #3498db;
  margin-right: ${moderateScale(5)}px;
`;

export default YearMonthPicker;
