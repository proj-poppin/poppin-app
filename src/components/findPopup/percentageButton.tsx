import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

// Define types for the props
interface PercentageButtonProps {
  percentage: number;
}

const PercentageButton: React.FC<PercentageButtonProps> = ({percentage}) => {
  const {color, label} = getColorAndLabelForPercentage(percentage);

  return (
    <View style={[styles.tag, {borderColor: color}]}>
      <Text style={[styles.text, {color: color}]}>
        {`${percentage}% ${label}`}
      </Text>
    </View>
  );
};

export default PercentageButton;

const styles = StyleSheet.create({
  tag: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: globalColors.white, // Ensure the background is white
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});

// Color logic and label based on the percentage
const getColorAndLabelForPercentage = (percentage: number) => {
  if (percentage <= 50) {
    return {color: globalColors.blue, label: '여유'};
  } else if (percentage > 50 && percentage <= 75) {
    return {color: globalColors.font, label: '보통'};
  } else {
    return {color: globalColors.red, label: '혼잡'};
  }
};
