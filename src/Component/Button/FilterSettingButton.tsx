import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {themeColors} from 'src/Theme/theme';

interface GradientButtonProps {
  onPress: () => void;
  isSelected: boolean;
  selectedButtonName?: string;
  unSelectedButtonName?: string;
  useOptionalNames?: boolean; // Optional parameter to use button names
  icon?: React.ReactNode; // Optional icon component
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onPress,
  isSelected,
  selectedButtonName = 'Selected',
  unSelectedButtonName = 'Unselected',
  useOptionalNames = false,
  icon,
}) => {
  const buttonText = useOptionalNames
    ? isSelected
      ? selectedButtonName
      : unSelectedButtonName
    : isSelected
    ? '필터 적용'
    : '필터 설정';

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        {isSelected ? (
          <LinearGradient
            colors={themeColors().gradient.purpleBlue}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientBorder}>
            <View style={styles.innerContent}>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={styles.text}>{buttonText}</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.button}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={styles.text}>{buttonText}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 90,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: themeColors().grey.component,
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 15,
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
    paddingRight: 10,
  },
  text: {
    color: 'black',
  },
  gradientBorder: {
    borderRadius: 35,
    padding: 1.5,
  },
  innerContent: {
    backgroundColor: themeColors().grey.component,
    borderRadius: 35,
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

export default GradientButton;
