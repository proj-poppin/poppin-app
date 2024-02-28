import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DownSvg from '../assets/icons/down.svg';
import primaryColors from '../style/primaryColors.ts';

const CategoryBottomSheetInput = ({label, value, onIconPress}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused
            ? {borderColor: primaryColors.blue}
            : {borderColor: primaryColors.warmGray},
        ]}>
        <TextInput
          style={styles.input}
          value={value}
          onPressIn={onIconPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={styles.iconButton} onPress={onIconPress}>
          <DownSvg />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의
  labelText: {
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    paddingRight: 10,
  },
});

export default CategoryBottomSheetInput;
