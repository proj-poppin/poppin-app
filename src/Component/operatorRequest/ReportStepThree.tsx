import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  RequiredMark,
  RowButtonContainer,
  SubmitButton,
  SubmitButtonText,
  SubTitle,
  SubTitleContainer,
} from './ReportStepTwo';
import {moderateScale} from '../../Util';
import {StepProps} from './ReportStepOne';
import PopupCategoryModal from '../PopupCategoryModal';
import CustomBottomSheet from '../BottomSheet/CustomBottomSheet';
import {useReportStore} from './Mypage.report.operator.zustand';
import CategorySelectButton from '../../Screen/Popup/Landing/category.select.button';
import CustomBottomSheetButton from '../BottomSheet/CustomBottomSheetButton';
import AgeChooseBottomSheet from '../BottomSheet/Age/AgeChooseBottomSheet';

interface RadioOption {
  label: string;
  value: string;
}

const ReportStepThree: React.FC<StepProps> = ({onNext, onBackPress}) => {
  const [selectedReservation, setSelectedReservation] = useState<string>('');
  const [selectedFee, setSelectedFee] = useState<string>('');

  const reservationOptions: RadioOption[] = [
    {label: '필수 아님', value: 'not_required'},
    {label: '예약 필수', value: 'required'},
  ];

  const feeOptions: RadioOption[] = [
    {label: '없음', value: 'free'},
    {label: '있음', value: 'paid'},
  ];

  const {modalVisible, setModalVisible} = useReportStore();
  return (
    <Container>
      <Title>POPPIN에 등록하기 위한{'\n'}정보가 필요해요!</Title>
      <SubTitleContainer>
        <SubTitle>📝 팝업의 상세 정보를 알려주세요</SubTitle>
      </SubTitleContainer>

      <FormSection>
        <Label>
          소개<RequiredMark>*</RequiredMark>
        </Label>
        <InputBox
          placeholder="팝업에 대한 내용을 소개해 주세요."
          multiline
          textAlignVertical="top"
        />

        <Label>
          예약 필수 여부<RequiredMark>*</RequiredMark>
        </Label>
        <RadioGroup>
          {reservationOptions.map(option => (
            <RadioButton
              key={option.value}
              selected={selectedReservation === option.value}
              onPress={() => setSelectedReservation(option.value)}>
              <RadioText selected={selectedReservation === option.value}>
                {option.label}
              </RadioText>
            </RadioButton>
          ))}
        </RadioGroup>
        <Label>
          이용가능 연령<RequiredMark>*</RequiredMark>
        </Label>
        <CustomBottomSheetButton
          onPress={() => setModalVisible(true)}
          text={'이용 가능 연령을 선택하세요'}
        />
        <Label>
          입장료 유무<RequiredMark>*</RequiredMark>
        </Label>
        <RadioGroup>
          {feeOptions.map(option => (
            <RadioButton
              key={option.value}
              selected={selectedFee === option.value}
              onPress={() => setSelectedFee(option.value)}>
              <RadioText selected={selectedFee === option.value}>
                {option.label}
              </RadioText>
            </RadioButton>
          ))}
        </RadioGroup>

        <Label>입장료</Label>
        <InputBox
          placeholder={`입장료가 있다면 작성해주세요. \nex)성인 16,000원, 어린이 7,000원`}
          multiline={true}
          textAlignVertical="top"
        />
      </FormSection>

      <CustomBottomSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={'제보하려는 팝업의 카테고리를 설정해주세요'}
        height={'40%'}>
        <AgeChooseBottomSheet
          onApply={() => setModalVisible(false)}
          onClose={() => setModalVisible(false)}
          selectedAges={['', '', '']}
          visible={modalVisible}
        />
      </CustomBottomSheet>
      <RowButtonContainer>
        <SubmitButton onPress={onBackPress}>
          <SubmitButtonText>돌아가기</SubmitButtonText>
        </SubmitButton>

        <SubmitButton onPress={onNext}>
          <SubmitButtonText>제보하기</SubmitButtonText>
        </SubmitButton>
      </RowButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${moderateScale(10)}px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const FormSection = styled.View`
  gap: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: ${moderateScale(40)}px;
`;

const InputBox = styled.TextInput`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  min-height: 100px;
  border: 1px solid ${props => props.theme.color.grey.mild};
`;

const RadioGroup = styled.View`
  flex-direction: row;
  gap: 12px;
`;

interface RadioProps {
  selected: boolean;
}

const RadioButton = styled.TouchableOpacity<RadioProps>`
  flex: 1;
  background-color: ${props =>
    props.selected
      ? props.theme.color.blue.mild
      : props.theme.color.grey.white};
  padding: 12px;
  border-radius: ${moderateScale(20)}px;
  align-items: center;
  border: 1px solid
    ${props => (props.selected ? '#2D9CDB' : props.theme.color.grey.mild)};
`;

const RadioText = styled.Text<RadioProps>`
  font-size: 14px;
  color: ${props =>
    props.selected ? props.theme.color.grey.black : '#666666'};
`;

export default ReportStepThree;
