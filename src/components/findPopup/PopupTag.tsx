import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

function PopupTag({item, onClick, selected, tagDeletClick}: any) {
  return (
    <TouchableOpacity onPress={() => onClick(item.id)}>
      <View style={[styles.tag, item.selected && styles.selectedTag]}>
        <Text>{item.name}</Text>
        {selected && (
          <TouchableOpacity onPress={() => tagDeletClick(item.id)}>
            <Text>x</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default PopupTag;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  tag: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderStyle: 'solid',

    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  selectedTag: {
    backgroundColor: globalColors.bluelight,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
