import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
/*
 * CustomBottomSheet를 호출하는 버튼입니다.
 * ex) Text를 통해서 내부 버튼에 들어갈 텍스트를 입력합니다.
 * onPress 를 통해서 해당 버튼을 눌렀을 시에, 모달창이 띄워지게끔 해줍니다.
 * @author 홍규진*/
interface CustomBottomSheetButtonProps {
  text: string;
  onPress: () => void;
  selected?: boolean;
  placeholder?: string;
}

const CustomBottomSheetButton: React.FC<CustomBottomSheetButtonProps> = ({
  text,
  onPress,
  selected = false,
  placeholder = '선택해주세요',
}) => {
  return (
    <ButtonContainer onPress={onPress} selected={selected}>
      <ButtonText selected={selected}>{text || placeholder}</ButtonText>
      <ArrowIcon>▼</ArrowIcon>
    </ButtonContainer>
  );
};

interface StyledProps {
  selected?: boolean;
}

const ButtonContainer = styled(TouchableOpacity)<StyledProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${props => (props.selected ? '#E8F3FF' : '#F8F8F8')};
  border-radius: 8px;
  border: 1px solid ${props => (props.selected ? '#2D9CDB' : 'transparent')};
  min-height: 48px;
`;

const ButtonText = styled.Text<StyledProps>`
  font-size: 14px;
  color: ${props => (props.selected ? '#2D9CDB' : '#666666')};
`;

const ArrowIcon = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export default CustomBottomSheetButton;
