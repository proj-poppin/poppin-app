// SelectionButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';
import Text14B from './texts/body_medium/Text14B.ts';

interface SelectButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const SelectionButton: React.FC<SelectButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          borderColor: isSelected ? globalColors.blue : globalColors.warmGray,
          backgroundColor: isSelected
            ? `${globalColors.blue}1A`
            : globalColors.white,
        },
      ]}>
      <Text style={[Text14B.text, {color: globalColors.black}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Add some horizontal margin for spacing
  },
});

export default SelectionButton;
