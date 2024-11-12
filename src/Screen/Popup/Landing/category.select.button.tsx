import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {themeColors} from 'src/Theme/theme';
import {getPreferenceTitle} from '../../../Object/preference.enum';

interface CategorySelectButtonProps {
  preferenceKey: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  preferenceKey,
  isSelected = false,
  onPress,
}) => {
  const label = getPreferenceTitle(preferenceKey);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        {isSelected ? (
          <LinearGradient
            colors={themeColors().gradient.purpleBlue}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientBorder}>
            <View style={styles.innerContent}>
              <Text style={styles.textSelected}>{label}</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.button}>
            <Text style={styles.text}>{label}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CategorySelectButton;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    height: 35,
  },
  pressable: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: themeColors().grey.mild,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  gradientBorder: {
    borderRadius: 30,
    padding: 1.5,
  },
  innerContent: {
    borderRadius: 28,
    backgroundColor: '#EDFAFF',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {},
  textSelected: {},
});
