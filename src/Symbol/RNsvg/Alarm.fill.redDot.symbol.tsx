import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

/**
 * 붉은 색 점이 있는 꽉찬 알람 심볼
 * @author 도형
 */
export const FilledAlarmWithRedDotSymbol = ({
  size = 24,
  color = '#ffffff',
  style,
}: {
  size?: number;
  color?: string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 32 27"
      fill="none">
      <circle cx="27.7961" cy="3.70383" r="3.70383" fill="#EF4452" />
      <path
        d="M16.5979 23.1685L9.2767 23.1685C9.2767 25.3175 11.3392 26.8128 12.9373 26.8128C14.5354 26.8128 16.5979 25.3677 16.5979 23.1685Z"
        fill="#B8CAD2"
      />
      <circle cx="12.9374" cy="13.043" r="8" fill="#B8CAD2" />
      <rect x="4.9375" y="13.1042" width="16" height="8" fill="#B8CAD2" />
      <path
        d="M12.1313 7.47708C12.5309 6.93291 13.3438 6.93291 13.7434 7.47708L22.9349 19.9944C23.4198 20.6549 22.9482 21.5863 22.1288 21.5863H3.74585C2.92647 21.5863 2.45485 20.6549 2.93982 19.9944L12.1313 7.47708Z"
        fill="#B8CAD2"
      />
    </Svg>
  );
};
