import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {themeColors} from '../../Theme/theme';

interface OptionSingleButtonProps {
  id: string;
  title: string;
  onPress: (id: string) => void;
  isSelected: boolean;
}

const OptionSingleButton = ({
  id,
  title,
  onPress,
  isSelected,
}: OptionSingleButtonProps) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <Pressable onPress={handlePress}>
      {({pressed}) => (
        <View
          style={[
            styles.button,
            {
              backgroundColor: isSelected
                ? `${themeColors().blue.main}1A`
                : 'white',
              borderColor: isSelected
                ? themeColors().blue.main
                : themeColors().grey.mild,
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default OptionSingleButton;
