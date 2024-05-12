import {StyleSheet, View} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

// Define the props type for better type checking
interface HorizontalBarChartProps {
  percentage: number;
}

const HorizontalBarChart = ({percentage}: HorizontalBarChartProps) => {
  const filledWidth = `${percentage}%`; // Calculate the filled part
  const unfilledWidth = `${100 - percentage}%`; // Calculate the unfilled part

  // Function to determine the color based on the percentage
  const getColorForPercentage = (percentage: number) => {
    if (percentage <= 50) {
      return globalColors.blue;
    } else if (percentage > 50 && percentage <= 75) {
      return globalColors.font;
    } else {
      return globalColors.red;
    }
  };

  return (
    <View style={styles.barContainer}>
      <View
        style={[
          styles.filledSection,
          {
            width: filledWidth,
            backgroundColor: getColorForPercentage(percentage),
          },
        ]}
      />
      <View style={[styles.unfilledSection, {width: unfilledWidth}]} />
    </View>
  );
};

// Correct the syntax for defining styles
const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    height: '20%',
    width: '35%',
    backgroundColor: globalColors.component,
    // borderRadius: 5,
  },
  filledSection: {
    height: '100%',
  },
  unfilledSection: {
    backgroundColor: globalColors.component,
    height: '100%',
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
  },
});

export default HorizontalBarChart;
