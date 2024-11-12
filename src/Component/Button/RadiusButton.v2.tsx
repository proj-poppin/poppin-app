import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';
import {moderateScale} from 'src/Util';
import {themeColors} from '../../Theme/theme';

// 색상 종류
type ButtonColor = 'RED' | 'BLUE' | 'PURPLE' | 'GREY' | 'BLACK';

// 색상 classification
type ButtonColorPriority = 'PRIMARY' | 'SECONDARY' | 'TERNARY';

type RadiusButtonProp = {
  color: ButtonColor;
  priority: ButtonColorPriority;
  /** 버튼 문구 */
  text: string;
  TextLeftIcon?: JSX.Element;
  /** 로딩 중일 때 버튼 문구 */
  loadingText?: string;
  onPress?: () => void;
  hollow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  greyOnDisabled?: boolean; // 버튼 비활성화 시 디자인을 회색으로 변경할지 여부

  props?: Omit<ViewProps, 'style'>;
  touchableOpacityProps?: Partial<TouchableOpacityProps>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

/**
 * 모서리가 둥근 버튼입니다.
 * @author 도형
 */
export function RadiusButtonV2({
  color,
  priority,
  text,
  TextLeftIcon,
  loadingText,
  onPress,
  hollow,
  disabled,
  loading,
  greyOnDisabled = true,
  props,
  touchableOpacityProps,
  style,
  textStyle,
}: RadiusButtonProp) {
  const fill = hollow ? !hollow : true;
  const buttonColorSets: {
    [C in ButtonColor]: {
      [P in ButtonColorPriority]?: {
        backgroundColor: string;
        textColor: string;
      };
    };
  } = {
    BLUE: {
      PRIMARY: {
        backgroundColor: themeColors().blue.main,
        textColor: themeColors().grey.white,
      },
      SECONDARY: {backgroundColor: '#EEEEEE', textColor: '#8BBFF5'},
    },
    PURPLE: {
      PRIMARY: {backgroundColor: '#ABACFF', textColor: '#FFFFFF'},
      SECONDARY: {backgroundColor: '#EEEEEE', textColor: '#8F84D0'},
      TERNARY: {backgroundColor: '#D6D4E2', textColor: '#FFFFFF'},
    },
    RED: {
      PRIMARY: {backgroundColor: '#FF6B6B', textColor: '#FFFFFF'},
      SECONDARY: {backgroundColor: '#FFE3E3', textColor: '#FF6B6B'},
    },
    GREY: {
      PRIMARY: {backgroundColor: '#999999', textColor: '#FFFFFF'},
    },
    BLACK: {
      PRIMARY: {backgroundColor: '#333333', textColor: '#FFFFFF'},
    },
  };

  const colorSet = buttonColorSets[color][priority] ?? {
    backgroundColor: '#8BBFF5',
    textColor: '#FFFFFF',
  };

  const inactive = disabled || loading;
  const buttonColor =
    inactive && greyOnDisabled
      ? {backgroundColor: '#999999', textColor: '#FFFFFF'}
      : colorSet;

  return (
    <TouchableOpacity
      activeOpacity={inactive ? 1 : 0.8}
      onPress={inactive ? undefined : onPress}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: moderateScale(50),
          ...(fill
            ? {backgroundColor: buttonColor.backgroundColor}
            : {
                backgroundColor: '#ffffff',
                borderColor: buttonColor.backgroundColor,
                borderWidth: 1,
              }),

          borderRadius: 20,
        },
        style,
      ]}
      {...props}
      {...touchableOpacityProps}>
      {!loading && TextLeftIcon}
      <Text
        style={[
          {
            color: fill ? buttonColor.textColor : buttonColor.backgroundColor,
            fontWeight: '600',
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
          },
          textStyle,
        ]}>
        {loading && loadingText !== undefined ? loadingText : text}
      </Text>
      {loading && (
        <>
          <ActivityIndicator
            size={'small'}
            color={fill ? buttonColor.textColor : buttonColor.backgroundColor}
            style={loadingText ? {marginLeft: moderateScale(6)} : {}}
          />
        </>
      )}
    </TouchableOpacity>
  );
}
