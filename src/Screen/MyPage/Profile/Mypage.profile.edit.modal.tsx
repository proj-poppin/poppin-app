import React from 'react';
import {Modal, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';
import ModalProfileCheck from 'src/Resource/svg/modal-check-icon.svg';
interface MypageProfileEditModalProp {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export function MypageProfileEditModal({
  isVisible,
  message,
  onClose,
}: MypageProfileEditModalProp) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Overlay>
        <ModalContainer>
          <ModalProfileCheck />

          <MainText>{message}</MainText>
          <ButtonContainer>
            <Pressable onPress={onClose}>
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
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
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
