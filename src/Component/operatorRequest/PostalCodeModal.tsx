import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import Postcode from '@actbase/react-daum-postcode';
import {moderateScale} from '../../Util';
import CloseSvg from '../../Resource/svg/close-icon.svg';

interface PostalCodeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelected: (data: any) => void;
}

const PostalCodeModal: React.FC<PostalCodeModalProps> = ({
  isVisible,
  onClose,
  onSelected,
}) => {
  return (
    <StyledModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <ModalOverlay>
        <ModalView>
          <StyledPostcode
            jsOptions={{animation: false, hideMapBtn: false}}
            onSelected={onSelected}
            onError={error => console.log(error)}
          />
          <CloseButton onPress={onClose}>
            <CloseSvg style={{margin: moderateScale(10)}} />
          </CloseButton>
        </ModalView>
      </ModalOverlay>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)``;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: ${theme => theme.theme.color.grey.main};
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  margin: ${moderateScale(20)}px;
  background-color: ${theme => theme.theme.color.grey.white};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(35)}px;
  align-items: center;
  width: 80%;
  shadow-color: ${theme => theme.theme.color.grey.black};
  shadow-offset: 0px ${moderateScale(2)}px;
  shadow-opacity: 0.25;
  shadow-radius: ${moderateScale(4)}px;
  z-index: 5;
`;

const StyledPostcode = styled(Postcode)`
  width: ${moderateScale(300)}px;
  height: ${moderateScale(350)}px;
  color: ${theme => theme.theme.color.grey.white};
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${moderateScale(10)}px;
  right: ${moderateScale(10)}px;
`;

export default PostalCodeModal;
