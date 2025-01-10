import React from 'react';
import {Modal, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';
import ModalAlertIcon from 'src/Resource/svg/modal-alert-icon.svg';
interface MypageWithdrawModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onSubmit: () => void;
}

export function MypageWithdrawModal({
  isVisible,
  title,
  message,
  onClose,
  onSubmit,
}: MypageWithdrawModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Overlay>
        <ModalContainer>
          <ModalAlertIcon />
          <MainText>{title}</MainText>

          <SubText>{message}</SubText>
          <ButtonContainer>
            <Pressable onPress={onClose}>
              <TextButton color="grey">계속 사용하기</TextButton>
            </Pressable>
            <Pressable onPress={onSubmit}>
              <TextButton color="blue">확인</TextButton>
            </Pressable>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: ${moderateScale(320)}px;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
`;

const MainText = styled.Text`
  font-size: ${moderateScale(18)}px;
  color: black;
  font-weight: bold;
  margin-top: ${moderateScale(10)}px;

  text-align: center;
`;
const SubText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.main}
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(10)}px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: ${moderateScale(10)}px;
`;

const TextButton = styled.Text<{color: 'blue' | 'grey'}>`
  font-size: ${moderateScale(14)}px;
  font-weight: 600;
  color: ${({color}) =>
    color === 'blue' ? themeColors().blue.main : themeColors().grey.main};
  padding: 10px 20px;
  text-align: center;
`;
