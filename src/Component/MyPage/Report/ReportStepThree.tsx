import React from 'react';
import styled from 'styled-components/native';
import {
  RequiredMark,
  RowButtonContainer,
  SubmitButton,
  SubmitButtonText,
  SubTitle,
  SubTitleContainer,
} from './ReportStepTwo';
import {moderateScale} from '../../../Util';
import {StepProps} from './ReportStepOne';
import CustomBottomSheet from '../../BottomSheet/CustomBottomSheet';
import {useOperatorReportStore} from '../../../Screen/MyPage/Request/Operator/Mypage.report.operator.zustand';
import CustomBottomSheetButton from '../../BottomSheet/CustomBottomSheetButton';
import AgeChooseBottomSheet from '../../BottomSheet/Age/AgeChooseBottomSheet';
import {Alert} from 'react-native';
import {useAppStore} from 'src/Zustand/App/app.zustand';

interface RadioOption {
  label: string;
  value: boolean;
}
const ReportStepThree: React.FC<StepProps> = ({onNext, onBackPress}) => {
  const {
    storeBriefDescription,
    isReservationRequired,
    availableAge,
    parkingAvailable,
    isEntranceFeeRequired,
    entranceFee,
    modalVisible,
    setModalVisible,
    setStoreBriefDescription,
    setIsReservationRequired,
    setAvailableAge,
    setParkingAvailable,
    setIsEntranceFeeRequired,
    setEntranceFee,
  } = useOperatorReportStore();

  const {setAppModalVisible, showAppModal} = useAppStore();
  const validateStep = () => {
    if (!storeBriefDescription.trim()) {
      Alert.alert('알림', '팝업 소개를 입력해주세요.');
      return false;
    }
    if (isReservationRequired === undefined) {
      Alert.alert('알림', '예약 필수 여부를 선택해주세요.');
      return false;
    }
    if (!availableAge) {
      Alert.alert('알림', '이용가능 연령을 선택해주세요.');
      return false;
    }
    if (parkingAvailable === undefined) {
      Alert.alert('알림', '주차 가능 여부를 선택해주세요.');
      return false;
    }
    if (isEntranceFeeRequired === undefined) {
      Alert.alert('알림', '입장료 유무를 선택해주세요.');
      return false;
    }
    if (isEntranceFeeRequired && !entranceFee.trim()) {
      Alert.alert('알림', '입장료 정보를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
      setAppModalVisible(true);
      showAppModal('POPUP_REPORT_COMPLETED');
      // navigation.navigate('MyPage', {});
    }
  };
  const reservationOptions: RadioOption[] = [
    {label: '필수 아님', value: false},
    {label: '예약 필수', value: true},
  ];

  const parkingOptions: RadioOption[] = [
    {label: '주차 불가', value: false},
    {label: '주차 가능', value: true},
  ];

  const feeOptions: RadioOption[] = [
    {label: '없음', value: false},
    {label: '있음', value: true},
  ];

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
          value={storeBriefDescription}
          onChangeText={setStoreBriefDescription}
        />

        <Label>
          예약 필수 여부<RequiredMark>*</RequiredMark>
        </Label>
        <RadioGroup>
          {reservationOptions.map(option => (
            <RadioButton
              key={option.label}
              selected={isReservationRequired === option.value}
              onPress={() => setIsReservationRequired(option.value)}>
              <RadioText selected={isReservationRequired === option.value}>
                {option.label}
              </RadioText>
            </RadioButton>
          ))}
        </RadioGroup>

        <Label>
          이용가능 연령<RequiredMark>*</RequiredMark>
        </Label>
        <CustomBottomSheetButton
          text={'이용 가능 연령을 선택하세요'}
          onPress={() => setModalVisible(true)}
          filteringAge={availableAge} // 선택된 연령 전달
          selected={!!availableAge} // 선택 여부
        />

        <Label>
          주차 가능 여부<RequiredMark>*</RequiredMark>
        </Label>
        <RadioGroup>
          {parkingOptions.map(option => (
            <RadioButton
              key={option.label}
              selected={parkingAvailable === option.value}
              onPress={() => setParkingAvailable(option.value)}>
              <RadioText selected={parkingAvailable === option.value}>
                {option.label}
              </RadioText>
            </RadioButton>
          ))}
        </RadioGroup>

        <Label>
          입장료 유무<RequiredMark>*</RequiredMark>
        </Label>
        <RadioGroup>
          {feeOptions.map(option => (
            <RadioButton
              key={option.label}
              selected={isEntranceFeeRequired === option.value}
              onPress={() => setIsEntranceFeeRequired(option.value)}>
              <RadioText selected={isEntranceFeeRequired === option.value}>
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
          value={entranceFee}
          onChangeText={setEntranceFee}
        />
      </FormSection>

      <RowButtonContainer>
        <SubmitButton onPress={onBackPress}>
          <SubmitButtonText>돌아가기</SubmitButtonText>
        </SubmitButton>
        <SubmitButton onPress={handleNext}>
          <SubmitButtonText>제보하기</SubmitButtonText>
        </SubmitButton>
      </RowButtonContainer>

      <CustomBottomSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={'이용 가능 연령을 선택해주세요'}
      >
        <AgeChooseBottomSheet
          onClose={() => setModalVisible(false)}
          selectedAges={availableAge} // 초기 선택값
          visible={modalVisible}
          onAgeSelected={age =>
            setAvailableAge(
              age as 'G_RATED' | 'PG_7' | 'PG_12' | 'PG_15' | 'PG_18',
            )
          }
        />
      </CustomBottomSheet>
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
  justify-content: space-between;
  gap: 12px;
`;

interface RadioProps {
  selected: boolean;
}

const RadioButton = styled.TouchableOpacity<RadioProps>`
  width: 49%;
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
