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
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
  isDisabled?: boolean;
  loading?: boolean;
  extraIcon?: React.FunctionComponent<SvgProps>;
  textStyle?: StyleProp<TextStyle>;
  isPreviousButton?: boolean; // New prop with default value
}

const CommonCompleteButton: React.FC<
  CommonCompleteButtonProps & {isPreviousButton?: boolean}
> = ({
  onPress,
  style,
  title,
  isDisabled = false,
  loading = false,
  extraIcon: ExtraIcon,
  textStyle,
  isPreviousButton = false, // New prop with default value
}) => {
  const throttledOnPress = useMemo(
    () =>
      throttle((event: GestureResponderEvent) => {
        if (onPress && !isDisabled) {
          onPress();
        }
      }, 2000),
    [onPress, isDisabled],
  );

  return (
    <StyledPressable
      onPress={throttledOnPress}
      disabled={isDisabled}
      isPreviousButton={isPreviousButton} // Pass the prop to styled component
      style={({pressed}) => [
        {
          backgroundColor: isPreviousButton
            ? pressed
              ? themeColors().blue.mild // Pressed state for previous button
              : 'white'
            : isDisabled
            ? themeColors().grey.component
            : pressed
            ? themeColors().blue.focused
            : themeColors().blue.main,
          borderColor: isPreviousButton
            ? themeColors().blue.main // Border color for previous button
            : isDisabled
            ? themeColors().grey.component
            : pressed
            ? themeColors().blue.focused
            : themeColors().blue.main,
          borderWidth: isPreviousButton ? 1 : 0, // Border width for previous button
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
          <StyledText
            isDisabled={isDisabled}
            isPreviousButton={isPreviousButton}
            style={textStyle}>
            {title}
          </StyledText>
        </ButtonContent>
      )}
    </StyledPressable>
  );
};

export default CommonCompleteButton;

const StyledPressable = styled(Pressable)<{isPreviousButton: boolean}>`
  height: ${moderateScale(55)}px;
  width: 90%;
  border-radius: ${moderateScale(30)}px;
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

const StyledText = styled(Text)<{
  isDisabled: boolean;
  isPreviousButton: boolean;
}>`
  font-size: ${moderateScale(18)}px;
  font-weight: 700;
  color: ${({isDisabled, isPreviousButton}) =>
    isPreviousButton
      ? themeColors().grey.main
      : isDisabled
      ? themeColors().grey.main
      : 'white'};
`;
