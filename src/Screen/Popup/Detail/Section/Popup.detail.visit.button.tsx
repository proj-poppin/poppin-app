import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';

export type VisitButtonType =
  | 'VISIT_READY'
  | 'VISIT_NOW'
  | 'VISIT_COMPLETE'
  | 'RECEIVE_REOPEN_ALERT'
  | 'RECEIVE_REOPEN_ALERT_COMPLETE';

interface PopupDetailVisitProps {
  visitButtonType: VisitButtonType; // 방문 버튼 타입
  onPress?: (event: GestureResponderEvent) => void;
  width?: number | string;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
}

const PopupDetailVisitButton: React.FC<PopupDetailVisitProps> = ({
  visitButtonType,
  onPress,
  width = moderateScale(150),
  height = moderateScale(50),
  containerStyle,
  textStyle,
  borderRadius = 30,
}) => {
  let buttonText = '';
  let backgroundColor = '';
  let borderColor = '';
  let textColor = '';
  let isDisabled = false;

  // 상태에 따른 스타일 및 텍스트 설정
  switch (visitButtonType) {
    case 'VISIT_NOW':
      buttonText = '방문하기';
      backgroundColor = 'white';
      borderColor = themeColors().blue.main;
      textColor = themeColors().blue.main;
      break;
    case 'VISIT_COMPLETE':
      buttonText = '방문완료';
      backgroundColor = themeColors().blue.main;
      borderColor = 'transparent';
      textColor = 'white';
      isDisabled = true;
      break;
    case 'RECEIVE_REOPEN_ALERT':
      buttonText = '재오픈 알림 받기';
      backgroundColor = 'white';
      borderColor = themeColors().blue.main;
      textColor = themeColors().blue.main;
      break;
    case 'RECEIVE_REOPEN_ALERT_COMPLETE':
      buttonText = '재오픈 알림 완료';
      backgroundColor = themeColors().blue.main;
      borderColor = 'transparent';
      textColor = 'white';
      isDisabled = true;
    case 'VISIT_READY':
      buttonText = '오픈 알림 받기';
      backgroundColor = 'white';
      borderColor = themeColors().blue.main;
      textColor = themeColors().blue.main;
      break;
  }

  return (
    <ButtonContainer
      onPress={
        visitButtonType === 'VISIT_NOW' ||
        visitButtonType === 'RECEIVE_REOPEN_ALERT'
          ? onPress
          : undefined
      }
      style={[{width, height}, containerStyle]}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      disabled={isDisabled}>
      <ButtonText style={textStyle} textColor={textColor}>
        {buttonText}
      </ButtonText>
    </ButtonContainer>
  );
};

export default PopupDetailVisitButton;

// Styled Components
const ButtonContainer = styled.Pressable<{
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  disabled: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({borderRadius}) => borderRadius}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-width: 1px;
  border-color: ${({borderColor}) => borderColor};
`;

const ButtonText = styled.Text<{
  textColor: string;
}>`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
  color: ${({textColor}) => textColor};
`;
