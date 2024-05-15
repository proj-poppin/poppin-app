import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import FilterSvg from '../../../assets/icons/filter.svg';
import globalColors from '../../../styles/color/globalColors';

interface FilterSettingsButtonProps {
  onPress: any;
  isSetting: boolean;
}

const FilterSettingsButton: React.FC<FilterSettingsButtonProps> = ({
  onPress,
  isSetting,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FilterSvg />
      </View>
      {isSetting ? (
        <Text style={styles.text}>필터 적용</Text>
      ) : (
        <Text style={styles.text}>필터 설정</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: globalColors.component,
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 10, // space between icon and text
  },
  text: {
    color: globalColors.text, // Assuming there's a text color defined in globalColors
  },
});

export default FilterSettingsButton;
