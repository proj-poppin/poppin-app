import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

// Define types for the props
interface SvgWithNameBoxLabelProps {
  Icon: React.ElementType; // This allows passing SVG as a component
  label: string;
  widthPercent?: string; // Optional width percentage
  isBold?: boolean; // Optional fontWeight
}

const SvgWithNameBoxLabel: React.FC<SvgWithNameBoxLabelProps> = ({
  Icon,
  label,
  widthPercent,
  isBold = true, // Default value is true
}) => {
  // Merge the container style conditionally based on the widthPercent prop
  const containerStyle: ViewStyle[] = [
    styles.container,
    widthPercent ? {width: widthPercent} : {},
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.rowContainer}>
        <Icon style={styles.icon} />
        <Text style={[styles.text, {fontWeight: isBold ? '600' : '400'}]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default SvgWithNameBoxLabel;

const styles = StyleSheet.create({
  rowContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems:"center"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: globalColors.blue,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: globalColors.blue, // Set text color to blue
    marginLeft: 7, // Spacing between icon and text
  },
  icon: {
    height: 20, // Specify icon size
    width: 20, // Specify icon width
  },
});
