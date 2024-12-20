import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

/**
 * 꽉찬 알람 심볼
 * @author 도형
 */

export const FilledAlarmSymbol = ({
  size = 24,
  color = '#ffffff',
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 23 24"
      fill="none">
      <path
        d="M15.0981 19.1684L7.77695 19.1684C7.77695 21.3175 9.83945 22.8128 11.4375 22.8128C13.0356 22.8128 15.0981 21.3676 15.0981 19.1684Z"
        fill="#B8CAD2"
      />
      <circle cx="11.4375" cy="9.04285" r="8" fill="#B8CAD2" />
      <rect x="3.4375" y="9.10419" width="16" height="8" fill="#B8CAD2" />
      <path
        d="M10.6313 3.47702C11.0309 2.93285 11.8438 2.93285 12.2434 3.47702L21.4349 15.9944C21.9198 16.6548 21.4482 17.5862 20.6288 17.5862H2.24585C1.42647 17.5862 0.954851 16.6548 1.43982 15.9944L10.6313 3.47702Z"
        fill="#B8CAD2"
      />
    </Svg>
  );
};
