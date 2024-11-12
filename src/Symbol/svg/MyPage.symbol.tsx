import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {themeColors} from 'src/Theme/theme';

/**
 * 홈 심볼
 * @author 도형
 */
export function MyPageSymbol({
  size = 28,
  fill = themeColors().grey.icon,
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <Svg width={size.toString()} height={size.toString()} viewBox="0 0 28 28">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0.5C6.27197 0.5 -3.05176e-05 6.772 -3.05176e-05 14.5C-3.05176e-05 22.228 6.27197 28.5 14 28.5C21.728 28.5 28 22.228 28 14.5C28 6.772 21.728 0.5 14 0.5ZM14 4.7C16.324 4.7 18.2 6.576 18.2 8.9C18.2 11.224 16.324 13.1 14 13.1C11.676 13.1 9.79997 11.224 9.79997 8.9C9.79997 6.576 11.676 4.7 14 4.7ZM14 24.58C10.5 24.58 7.40597 22.788 5.59997 20.072C5.64197 17.286 11.2 15.76 14 15.76C16.786 15.76 22.358 17.286 22.4 20.072C20.594 22.788 17.5 24.58 14 24.58Z"
        fill={fill}
      />
    </Svg>
  );
}
