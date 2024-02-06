import React, {useState} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import primaryColors from '../style/primaryColors.ts';

const OptionButton = ({id, title, onPress}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress(id);
  };

  return (
    <Pressable onPress={handlePress}>
      {({pressed}) => (
        <View
          style={[
            styles.button,
            {
              backgroundColor: isSelected ? `${primaryColors.blue}1A` : 'white',
              borderColor: isSelected ? primaryColors.blue : primaryColors.font,
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
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Adjust this if you need
  },
  text: {
    color: 'black', // 텍스트 색상
    fontSize: 16,
  },
});

export default OptionButton;
