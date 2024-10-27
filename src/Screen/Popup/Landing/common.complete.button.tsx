import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from 'src/Util';
import throttle from 'lodash/throttle';
import styled from 'styled-components/native';
import {SvgProps} from 'react-native-svg';

interface CommonCompleteButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  title: string;
  isDisabled?: boolean;
  loading?: boolean;
  extraIcon?: React.FunctionComponent<SvgProps>;
  textStyle?: StyleProp<TextStyle>;
}

const CommonCompleteButton: React.FC<CommonCompleteButtonProps> = ({
  onPress,
  style,
  title,
  isDisabled = false,
  loading = false,
  extraIcon: ExtraIcon,
  textStyle, // Destructure textStyle
}) => {
  const throttledOnPress = useMemo(
    () =>
      throttle((event: GestureResponderEvent) => {
        if (onPress && !isDisabled) onPress(event);
      }, 2000),
    [onPress, isDisabled],
  );

  return (
    <StyledPressable
      onPress={throttledOnPress}
      disabled={isDisabled}
      style={({pressed}) => [
        {
          backgroundColor: isDisabled
            ? themeColors().grey.component
            : pressed
            ? themeColors().blue.focused
            : themeColors().blue.main,
          borderColor: isDisabled
            ? themeColors().grey.component
            : pressed
            ? themeColors().blue.focused
            : themeColors().blue.main,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={themeColors().blue.main} />
      ) : (
        <ButtonContent>
          {ExtraIcon && (
            <IconContainer>
              <ExtraIcon width={moderateScale(20)} height={moderateScale(20)} />
            </IconContainer>
          )}
          <StyledText isDisabled={isDisabled} style={textStyle}>
            {title}
          </StyledText>
        </ButtonContent>
      )}
    </StyledPressable>
  );
};

export default CommonCompleteButton;

const StyledPressable = styled(Pressable)`
  height: ${moderateScale(50)}px;
  width: 90%;
  border-radius: ${moderateScale(25)}px;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${moderateScale(16)}px;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.View`
  margin-right: ${moderateScale(8)}px;
`;

const StyledText = styled(Text)<{isDisabled: boolean}>`
  font-size: ${moderateScale(17)}px;
  color: ${({isDisabled}) => (isDisabled ? themeColors().grey.main : 'white')};
`;
