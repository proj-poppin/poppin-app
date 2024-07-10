import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import FilterSvg from '../../../assets/icons/filter.svg';
import globalColors from '../../../styles/color/globalColors';
import LinearGradient from 'react-native-linear-gradient';

interface FilterSettingsButtonProps {
  onPress: any;
  isSetting: boolean;
}

const FilterSettingsButton: React.FC<FilterSettingsButtonProps> = ({
  onPress,
  isSetting,
}) => {
  return (
    <Pressable onPress={onPress}>
      {isSetting ? (
        <LinearGradient
          colors={globalColors.blueToPurpleGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.innerContent}>
            <View style={styles.iconContainer}>
              <FilterSvg />
            </View>
            <Text style={styles.text}>필터 적용</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.button}>
          <View style={styles.iconContainer}>
            <FilterSvg />
          </View>
          <Text style={styles.text}>필터 설정</Text>
        </View>
      )}
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
  text: {
    color: globalColors.black,
  },
  gradientBorder: {
    borderRadius: 35,
    padding: 1.5, // Set padding for the gradient border
  },
  innerContent: {
    borderRadius: 33.5,
    backgroundColor: globalColors.component,
    paddingVertical: 8,
    paddingHorizontal: 15,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FilterSettingsButton;
