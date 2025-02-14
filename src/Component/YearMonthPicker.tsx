import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {TitleContentModal} from './Modal';
import {BlackBackgroundModal} from './Modal';
import CalendarTopArrowIcon from '../Resource/svg/calendar-top-arrow-blue-icon.svg'; // 아이콘 import

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

  const PickerContent = (
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
  );

  const CustomButton = (
    <ButtonContainer>
      <CancelButton onPress={onClose}>
        <ButtonText color="grey">취소</ButtonText>
      </CancelButton>
      <Separator />
      <ConfirmButton onPress={handleConfirm}>
        <ButtonText color="blue">확인</ButtonText>
      </ConfirmButton>
    </ButtonContainer>
  );

  return (
    <BlackBackgroundModal modalVisible={isVisible} setModalVisible={onClose}>
      <TitleContentModal
        title={
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
        content={PickerContent}
        head={false}
        alignCenter={true}
        buttonSymmetric={true}
        LeftButton={CustomButton}
      />
    </BlackBackgroundModal>
  );
};

const PickerWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-horizontal: ${moderateScale(20)}px;
  margin-top: ${moderateScale(15)}px;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const ButtonText = styled.Text<{color: 'blue' | 'grey'}>`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: ${moderateScale(14)}px;
  color: ${({color, theme}) =>
    color === 'blue' ? theme.color.blue.main : theme.color.grey.main};
  text-align: center;
`;

const Separator = styled.View`
  width: ${moderateScale(1)}px;
  height: ${moderateScale(20)}px;
  background-color: #e6e9ed;
  transform: rotate(180deg);
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
