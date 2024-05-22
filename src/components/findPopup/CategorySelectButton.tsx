import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import CategoryButtonDeleteSvg from '../../assets/icons/categoryButtonClose.svg';
import LinearGradient from 'react-native-linear-gradient';
import {TFilter} from './constants.ts';

interface CategorySelectButtonProps {
  item: TFilter;
  onClick: (item: TFilter) => void;
  tagDeleteClick: (id: number) => void;
  seletedTag?: any;
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  item,
  onClick,
  tagDeleteClick,
  seletedTag,
}) => {
  if (seletedTag) {
    return (
      <Pressable onPress={() => onClick(item)}>
        <LinearGradient
          colors={globalColors.blueToPurpleGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.innerContent}>
            <Text>{item.label}</Text>
            <TouchableOpacity onPress={() => tagDeleteClick(item.id)}>
              <CategoryButtonDeleteSvg />
            </TouchableOpacity>
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

export default CategorySelectButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  tag: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
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
    padding: 2,
  },
  innerContent: {
    borderRadius: 28,
    backgroundColor: globalColors.blueLight,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
