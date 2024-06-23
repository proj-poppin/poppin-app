import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import {CongestionRate} from '../../types/CongestionRate.ts';
import {getColorAndLabelForCongestionRate} from '../../utils/function/getColorAndLabelForCongestionRate.ts';

// Define types for the props
interface PercentageButtonProps {
  congestionRate: CongestionRate;
  congestionRatio: number;
}

const PercentageButton: React.FC<PercentageButtonProps> = ({
  congestionRate,
  congestionRatio,
}) => {
  const {color, label} = getColorAndLabelForCongestionRate(congestionRate);

  return (
    <View style={[styles.tag, {borderColor: color}]}>
      <Text style={[styles.text, {color: color}]}>
        {`${congestionRatio}% ${label}`}
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
    backgroundColor: globalColors.white, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
  },
});
