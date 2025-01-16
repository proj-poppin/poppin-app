import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {moderateScale} from 'src/Util';
import {themeColors} from '../../Theme/theme';

type RadiusBlueButtonProps = {
  text: string;
  onPress: () => void;
  disable: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

/**
 * 예외적으로 스타일이 다른 RadiusBlueButton 컴포넌트
 * @description
 * - 현재는 방문하기 버튼의 UX를 위한 컴포넌트나 확장성이 높은 컴포넌트로 사용될 수 있습니다.
 * @author 도형
 */
export function RadiusBlueButton({
  text,
  onPress,
  disable,
  style,
  textStyle,
}: RadiusBlueButtonProps) {
  const buttonStyle = disable
    ? {
        backgroundColor: themeColors().blue.main,
        borderColor: themeColors().blue.main,
        textColor: themeColors().grey.white,
      }
    : {
        backgroundColor: '#FFFFFF',
        borderColor: themeColors().blue.main,
        textColor: themeColors().blue.main,
      };

  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.8}
      onPress={disable ? undefined : onPress}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: moderateScale(50),
          backgroundColor: buttonStyle.backgroundColor,
          borderRadius: moderateScale(20),
          borderWidth: disable ? 0 : 1,
          borderColor: buttonStyle.borderColor,
        },
        style,
      ]}>
      <Text
        style={[
          {
            color: buttonStyle.textColor,
            fontWeight: '600',
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
