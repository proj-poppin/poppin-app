import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
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
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FilterSvg />
      </View>
      {isSetting ? <Text>필터 적용</Text> : <Text>필터 설정</Text>}
    </Pressable>
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
});

export default FilterSettingsButton;
