import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

// Define types for the props
interface SvgWithNameBoxLabelProps {
  Icon: React.ElementType; // This allows passing SVG as a component
  label: string;
}

const SvgWithNameBoxLabel: React.FC<SvgWithNameBoxLabelProps> = ({
  Icon,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default SvgWithNameBoxLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: globalColors.blue, // Set border color to blue
    backgroundColor: 'white', // Background color is white
  },
  text: {
    fontSize: 16,
    color: globalColors.blue, // Set text color to blue
    marginLeft: 10, // Spacing between icon and text
  },
  icon: {
    height: 20, // Specify icon size
    width: 20, // Specify icon width
  },
});
