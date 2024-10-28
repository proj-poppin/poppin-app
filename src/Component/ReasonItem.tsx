import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Check from 'src/Resource/svg/selected-option-white-check.svg';
import {themeColors} from '../Theme/theme';

// Define types for the props
interface ReasonItemProps {
  isSelected: boolean;
  onClicked: () => void;
}

const ReasonItem: React.FC<ReasonItemProps> = ({isSelected, onClicked}) => {
  return (
    <Pressable onPress={onClicked}>
      <View
        style={[
          styles.circle,
          isSelected && {backgroundColor: themeColors().purple.main},
        ]}
      />
      {isSelected && <Check style={{position: 'absolute', top: 7, left: 7}} />}
    </Pressable>
  );
};

export default ReasonItem;

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: themeColors().purple.main,
    backgroundColor: themeColors().grey.white,
  },
  reasonText: {
    fontSize: 16,
  },
  icon: {
    color: 'red',
  },
});
