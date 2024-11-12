import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../Util';
import {themeColors} from '../Theme/theme';

// Props 타입 정의
interface UnderlinedTextButtonProps {
  label: string;
  onClicked: () => void;
}

const UnderlinedTextButton: React.FC<UnderlinedTextButtonProps> = ({
  label,
  onClicked,
}) => {
  return (
    <ButtonPressable onPress={onClicked}>
      <ButtonText>{label}</ButtonText>
    </ButtonPressable>
  );
};

// 스타일드 컴포넌트
const ButtonPressable = styled.TouchableOpacity`
  opacity: 0.7;
  margin-top: ${moderateScale(10)}px;
`;

const ButtonText = styled.Text`
  text-decoration-line: underline;
  color: ${themeColors().grey.main};
  font-size: ${moderateScale(13)}px;
  font-weight: 400;
`;

export default UnderlinedTextButton;
