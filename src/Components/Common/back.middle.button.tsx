import React, {useState} from 'react';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import SvgWithNameBoxLabel from 'src/Component/SvgWithNameBoxLabel';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from 'src/Util';
import CommonCompleteButton from './common.complete.button';

interface MiddleButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  title: string;
}

export const BackMiddleButton: React.FC<MiddleButtonProps> = ({
  onPress,
  style,
  title,
}) => {
  return (
    <SvgWithNameBoxLabel
      height={moderateScale(50)}
      width={moderateScale(120)}
      label={title}
      textStyle={[
        {fontSize: moderateScale(17)},
        {color: themeColors().grey.main},
      ]}
      onPress={onPress}
      containerStyle={style}
      isWithoutBorder={false}
    />
  );
};
interface NextMiddleButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  title: string;
  disabled?: boolean;
}

export const NextMiddleButton: React.FC<NextMiddleButtonProps> = ({
  onPress,
  style,
  title,
  disabled = false,
}) => {
  return (
    <CommonCompleteButton
      title={title}
      onPress={onPress}
      style={style}
      isDisabled={disabled}
    />
  );
};
