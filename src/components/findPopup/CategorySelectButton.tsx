import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import TestSvg from '../../assets/icons/categoryButtonClose.svg';

// Define a type for the item prop
type Item = {
  id: string;
  name: string;
  selected?: boolean;
};

// Define types for the props
interface CategorySelectButtonProps {
  item: Item;
  onClick: (id: string) => void;
  selected: boolean;
  tagDeleteClick: (id: string) => void;
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  item,
  onClick,
  selected,
  tagDeleteClick,
}) => {
  return (
    <Pressable onPress={() => onClick(item.id)}>
      <View style={[styles.tag, item.selected && styles.selectedTag]}>
        <Text>{item.name}</Text>
        {selected && (
          <TouchableOpacity onPress={() => tagDeleteClick(item.id)}>
            <TestSvg />
          </TouchableOpacity>
        )}
      </View>
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
});
