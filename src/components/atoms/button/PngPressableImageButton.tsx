import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';

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
      <Image source={source} style={[styles.image, style]} />
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
