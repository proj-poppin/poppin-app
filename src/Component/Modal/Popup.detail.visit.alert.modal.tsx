import React from 'react';
import styled from 'styled-components/native';
import LocationPinSvg from 'src/Resource/svg/location-pin-icon.svg';
import {moderateScale} from 'src/Util';

interface PopupDetailVisitAlertModalProps {
  onComplete: () => void; // "지금 설정하기" 버튼 동작
}

export const PopupDetailVisitAlertModal = ({
  onComplete,
}: PopupDetailVisitAlertModalProps) => {
  return (
    <ModalContentContainer>
      <SvgContainer>
        <LocationPinSvg />
      </SvgContainer>
      <TextContainer>
        <MainText>해당 팝업의 50m 이내에 있으면</MainText>
        <MainText>방문하기 버튼이 활성화 됩니다!</MainText>
      </TextContainer>
      <ButtonContainer>
        <TextButton color="blue" onPress={onComplete}>
          <ButtonText color="blue">확인했어요</ButtonText>
        </TextButton>
      </ButtonContainer>
    </ModalContentContainer>
  );
};

const ModalContentContainer = styled.View`
  position: absolute;
  width: ${moderateScale(300)}px;
  height: ${moderateScale(190)}px;
  padding: ${moderateScale(20)}px 0;
  background-color: #ffffff;
  shadow-offset: 0px 2px;
  border-radius: ${moderateScale(20)}px;
  align-items: center;
`;

const SvgContainer = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

const TextContainer = styled.View`
  align-items: center;
  margin-bottom: ${moderateScale(20)}px; /* 텍스트 전체 아래 여백 */
`;

const MainText = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: 700;
  line-height: ${moderateScale(24)}px; /* 텍스트 간 간격 조정 */
  text-align: center;
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-bottom: ${moderateScale(16)}px;
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
  font-style: normal;
  font-weight: 400;
  font-size: ${moderateScale(14)}px;
  margin-bottom: ${moderateScale(100)}px;
  color: ${({color, theme}) =>
    color === 'blue' ? theme.color.blue.main : theme.color.grey.main};
  text-align: center;
`;
