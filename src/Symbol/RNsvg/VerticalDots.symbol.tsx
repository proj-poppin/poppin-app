import React from 'react';
import Svg, {Path} from 'react-native-svg';

/**
 * 3개의 점이 수직으로 나열된 심볼입니다.
 * @author 도형
 */
export function VerticalDots({
  size = 24,
  color = 'black',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        fill={color}
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        fill={color}
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        fill={color}
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
