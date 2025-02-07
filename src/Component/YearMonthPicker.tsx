import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import CalendarTopArrowIcon from '../Resource/svg/calendar-top-arrow-blue-icon.svg';
import {BlackBackgroundModal} from './Modal';
import {TouchableWithoutFeedback} from 'react-native';

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

  const years = Array.from({length: 9999}, (_, i) => i + 1);
  const months = Array.from({length: 12}, (_, i) => i + 1);

  return (
    <BlackBackgroundModal modalVisible={isVisible} setModalVisible={onClose}>
      <TouchableWithoutFeedback>
        <PickerContainer>
          <HeaderContainer onPress={onClose}>
            <SelectedDateText>
              {`${tempYear}.${tempMonth < 10 ? `0${tempMonth}` : tempMonth}`}
            </SelectedDateText>
            <CalendarTopArrowIcon
              width={moderateScale(18)}
              height={moderateScale(18)}
            />
          </HeaderContainer>

          {/* Picker */}
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
              selectedValue={tempMonth}
              onValueChange={itemValue => setTempMonth(itemValue as number)}>
              {months.map(month => (
                <Picker.Item
                  key={month}
                  label={`${month}월`}
                  value={month}
                  color={month === tempMonth ? 'black' : 'gray'} 
                />
              ))}
            </StyledPicker>
          </PickerWrapper>

          {/* 버튼 */}
          <ButtonContainer>
            <CancelButton onPress={onClose}>
              <CancelButtonText color="grey">취소</CancelButtonText>
            </CancelButton>
            <Separator />
            <ConfirmButton
              onPress={() => {
                onConfirm(tempYear, tempMonth);
                onClose();
              }}>
              <CancelButtonText color="blue">확인</CancelButtonText>
            </ConfirmButton>
          </ButtonContainer>
        </PickerContainer>
      </TouchableWithoutFeedback>
    </BlackBackgroundModal>
  );
};

const PickerContainer = styled.View`
  width: ${moderateScale(312)}px;
  height: ${moderateScale(279)}px;
  background-color: white;
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  align-items: center;
  elevation: 5;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  z-index: 100;
`;

const HeaderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${moderateScale(10)}px;
`;

const SelectedDateText = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-weight: bold;
  color: #3498db;
  margin-right: ${moderateScale(5)}px;
`;

const PickerWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: ${moderateScale(10)}px;
`;

const StyledPicker = styled(Picker)`
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

const CancelButton = styled.TouchableOpacity``;

const CancelButtonText = styled.Text<{color: 'blue' | 'grey'}>`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: ${moderateScale(14)}px;
  color: ${({color, theme}) =>
    color === 'blue' ? theme.color.blue.main : theme.color.grey.main};
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity``;

const Separator = styled.View`
  width: ${moderateScale(1)}px;
  height: ${moderateScale(20)}px;
  background-color: #e6e9ed;
  transform: rotate(180deg);
`;

export default YearMonthPicker;
