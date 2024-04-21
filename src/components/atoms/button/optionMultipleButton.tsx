import React, {useEffect, useState} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

const OptionMultipleButton = ({
  id,
  title,
  onPress,
  isSelected: initialSelected,
}) => {
  const [isSelected, setIsSelected] = useState(initialSelected);

  // Use useEffect to update state when initialSelected changes
  useEffect(() => {
    setIsSelected(initialSelected);
  }, [initialSelected]);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress(!isSelected);
  };

  return (
    <Pressable onPress={handlePress}>
      {({pressed}) => (
        <View
          style={[
            styles.button,
            {
              backgroundColor: isSelected ? `${globalColors.blue}1A` : 'white',
              borderColor: isSelected
                ? globalColors.blue
                : globalColors.warmGray,
            },
          ]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Adjust this if you need
  },
  text: {
    color: 'black', // 텍스트 색상
    fontSize: 16,
  },
});

export default OptionMultipleButton;
