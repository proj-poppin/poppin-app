import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import Check from "../assets/icons/Vector 1.svg"

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
      {isSelected && <Check style={{position:"absolute",top:7,left:7}} />}
    </Pressable>
  );
};

export default ReasonItem;

const styles = StyleSheet.create({
  circle: {
    position:"relative",
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
  icon: {
    color:"red"
  }
});
