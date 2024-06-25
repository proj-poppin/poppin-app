import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import globalColors from '../styles/color/globalColors.ts';
import {TFilter} from './findPopup/constants.ts';

interface GradientButtonProps {
  item: TFilter;
  onClick: (item: TFilter) => void;
  tagDeleteClick: (id: number) => void;
  selectedTag?: any;
  isMultipleSelectionPossible?: boolean;
}
const GradientButton: React.FC<GradientButtonProps> = ({
  item,
  onClick,
  selectedTag,
}) => {
  if (selectedTag) {
    return (
      <Pressable onPress={() => onClick(item)}>
        <LinearGradient
          colors={globalColors.blueToPurpleGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.innerContent}>
            <Text>{item.label}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={() => onClick(item)}>
      {item.selected ? (
        <LinearGradient
          colors={globalColors.blueToPurpleGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.innerContent}>
            <Text>{item.label}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.tag}>
          <Text>{item.label}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  tag: {
    margin: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: globalColors.warmGray,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  selectedTag: {
    backgroundColor: globalColors.blueLight,
    borderWidth: 1,
    borderColor: globalColors.blue,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  gradientBorder: {
    borderRadius: 30,
    padding: 1.5,
  },
  innerContent: {
    borderRadius: 30,
    backgroundColor: globalColors.blueLight,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});
