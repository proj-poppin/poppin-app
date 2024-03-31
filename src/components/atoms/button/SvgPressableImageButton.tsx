import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import Svg, {SvgProps} from 'react-native-svg';

// Props 타입 정의
interface SvgImageButtonProps {
  SvgComponent: React.FC<SvgProps>; // SVG 컴포넌트를 prop으로 받음
  onPress: () => void;
  style?: ViewStyle;
}

const SvgImgButton: React.FC<SvgImageButtonProps> = ({
  SvgComponent,
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress}>
      <SvgComponent />
    </Pressable>
  );
};

export default SvgImgButton;
