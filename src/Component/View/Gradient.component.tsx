import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from 'src/Theme';

type LinearGradientContainerProps = {
  children?: JSX.Element | JSX.Element[];
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  useAngle?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * 색상 list를 인자로 받아 해당 색상의 그라데이션이 적용된 LinearGradient View를 반환합니다.
 * 색상 list가 주어지지 않은 경우, 메인 테마 그라데이션을 적용합니다.
 * @author 원제
 */
export function LinearGradeintContainer({
  children,
  colors = theme.color.gradient.purpleBlue,
  start = { x: 1, y: 0 },
  end = { x: 0, y: 1 },
  useAngle,
  style,
}: LinearGradientContainerProps) {
  return (
    <LinearGradient
      start={start}
      end={end}
      colors={colors}
      style={style}
      useAngle={useAngle}>
      {children}
    </LinearGradient>
  );
}
