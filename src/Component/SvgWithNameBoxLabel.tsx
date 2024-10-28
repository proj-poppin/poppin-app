import React, {useState} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from '../Util';
import {themeColors} from '../Theme/theme';

interface SvgWithNameBoxLabelProps {
  Icon?: React.ElementType;
  label: string;
  width?: number | string;
  height?: number;
  isBold?: boolean;
  isWithoutBorder?: boolean;
  isSwitchComponentOrder?: boolean;
  isPressedEnabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  borderRadius?: number; // Optional borderRadius prop
}

const SvgWithNameBoxLabel: React.FC<SvgWithNameBoxLabelProps> = ({
  Icon,
  label,
  width = moderateScale(150),
  height = moderateScale(35),
  isBold = true,
  isWithoutBorder = false,
  isSwitchComponentOrder,
  isPressedEnabled = true,
  onPress,
  containerStyle,
  textStyle,
  iconStyle,
  borderRadius = 30, // Default borderRadius value
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (isPressedEnabled) {
      setIsPressed(true);
    }
  };
  const handlePressOut = () => {
    if (isPressedEnabled) {
      setIsPressed(false);
    }
  };

  return (
    <PressableContainer
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      isWithoutBorder={isWithoutBorder}
      isPressed={isPressed}
      isPressedEnabled={isPressedEnabled}
      borderRadius={borderRadius}
      style={[{width, height}, containerStyle]}>
      {isSwitchComponentOrder ? (
        <RowContainer>
          <LabelText style={[{fontWeight: isBold ? '600' : '400'}, textStyle]}>
            {label}
          </LabelText>
          {Icon && <Icon style={[{marginLeft: moderateScale(4)}, iconStyle]} />}
        </RowContainer>
      ) : (
        <RowContainer>
          {Icon && (
            <Icon style={[{marginRight: moderateScale(4)}, iconStyle]} />
          )}
          <LabelText style={[{fontWeight: isBold ? '600' : '400'}, textStyle]}>
            {label}
          </LabelText>
        </RowContainer>
      )}
    </PressableContainer>
  );
};

export default SvgWithNameBoxLabel;

// Styled components using styled-components library
const PressableContainer = styled.Pressable<{
  isWithoutBorder: boolean;
  isPressed: boolean;
  isPressedEnabled: boolean;
  borderRadius: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({borderRadius}) => borderRadius}px;
  background-color: ${({isPressed, isPressedEnabled}) =>
    isPressed && isPressedEnabled ? `${themeColors().blue.main}1A` : 'white'};
  ${({isWithoutBorder}) =>
    !isWithoutBorder &&
    `
    border-width: 1px;
    border-color: ${themeColors().blue.main};
  `}
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center; // Ensures vertical alignment
  justify-content: center;
  padding-horizontal: ${moderateScale(8)}px;
`;

const LabelText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${themeColors().blue.main};
`;
