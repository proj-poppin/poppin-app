import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// Props 타입 정의
interface ImageButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle; // style은 선택적으로 받음
}

const PngPressableImageButton: React.FC<ImageButtonProps> = ({
  source,
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress}>
      <FastImage source={source} style={[styles.image, style]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});

export default PngPressableImageButton;
