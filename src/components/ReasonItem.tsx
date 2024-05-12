import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

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
          isSelected && {backgroundColor: globalColors.purple},
        ]}
      />
    </Pressable>
  );
};

export default ReasonItem;

const styles = StyleSheet.create({
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: globalColors.purple,
    backgroundColor: globalColors.white,
  },
  reasonText: {
    fontSize: 16,
  },
});
