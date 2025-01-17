import React from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';

interface HorizontalScrollContainerProps {
  images: Array<JSX.Element>;
}

const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  images,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onStartShouldSetResponder={() => true}>
      {images.map((image, index) => (
        <Animated.View key={index}>{image}</Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  popUpScrollView: {
    paddingHorizontal: 0,
  },
});

export default HorizontalScrollContainer;
