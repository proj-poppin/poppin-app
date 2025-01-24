import React from 'react';
import styled from 'styled-components/native';
import LocationPinSvg from 'src/Resource/svg/location-pin-icon.svg';
import {moderateScale} from 'src/Util';

interface PreferenceSkipModalProps {
  onSkip: () => void; // "건너뛰기" 버튼 동작
  onComplete: () => void; // "지금 설정하기" 버튼 동작
}

export const PreferenceSkipModal = ({
  onSkip,
  onComplete,
}: PreferenceSkipModalProps) => {
  return (
    <ModalContentContainer>
      <LocationPinSvg />
      <MainText>취향을 설정하면 맞춤 팝업 정보를 받아볼 수 있어요!</MainText>
      <ButtonContainer>
        <TextButton color="grey" onPress={onSkip}>
          <ButtonText color="grey">건너뛰기</ButtonText>
        </TextButton>
        <Separator />
        <TextButton color="blue" onPress={onComplete}>
          <ButtonText color="blue">지금 설정하기</ButtonText>
        </TextButton>
      </ButtonContainer>
    </ModalContentContainer>
  );
};

const ModalContentContainer = styled.View`
  position: absolute;
  width: ${moderateScale(312)}px;
  height: ${moderateScale(200)}px;
  padding: ${moderateScale(20)}px 0;
  background-color: #ffffff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  border-radius: ${moderateScale(20)}px;
  align-items: center;
`;

const MainText = styled.Text`
  width: ${moderateScale(241)}px;
  margin-top: ${moderateScale(14)}px;
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  text-align: center;
  color: #000000;
`;

const ButtonContainer = styled.View`
  width: 100%;
  height: ${moderateScale(42)}px;
  margin-top: ${moderateScale(17)}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const TextButton = styled.TouchableOpacity<{color: 'blue' | 'grey'}>`
  width: ${moderateScale(140)}px;
  height: 100%;
  justify-content: center;
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
