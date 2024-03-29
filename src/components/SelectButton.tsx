// SelectionButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

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
          borderColor: isSelected ? primaryColors.blue : primaryColors.warmGray,
          backgroundColor: isSelected
            ? `${primaryColors.blue}1A`
            : primaryColors.white,
        },
      ]}>
      <Text
        style={[globalStyles.bodyMediumPrimary, {color: primaryColors.black}]}>
        {title}
      </Text>
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
