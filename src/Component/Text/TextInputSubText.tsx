import React from 'react';
import {StyleProp, TextStyle, Text} from 'react-native';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from 'src/Util';

/**
 * TextInput 밑에 표시되는 텍스트입니다.
 * @author 도형
 */
export const TextInputSubText = ({
  text,
  visible = false,
  color = 'RED',
  style,
}: {
  text: string;
  visible?: boolean;
  color?: 'RED' | 'BLUE' | 'PURPLE' | 'GREY';
  style?: StyleProp<TextStyle>;
}) => {
  const textColor = () => {
    switch (color) {
      case 'RED':
        return themeColors().red.warning;
      case 'BLUE':
        return themeColors().blue.text;
      case 'PURPLE':
        return themeColors().purple.text;
      case 'GREY':
        return themeColors().grey.main;
    }
  };

  return (
    <Text
      style={[
        {
          opacity: visible ? 1 : 0,
          color: textColor(),
          fontSize: moderateScale(11),
          marginTop: moderateScale(4),
        },
        style,
      ]}>
      {text}
    </Text>
  );
};
