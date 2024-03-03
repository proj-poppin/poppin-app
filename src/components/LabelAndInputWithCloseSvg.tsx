import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import CloseGraySvg from '../assets/icons/closeGray.svg'; // 아이콘 경로 확인 필요
import primaryColors from '../style/primaryColors.ts';
import RequiredTextLabel from './RequiredTextLabel.tsx';

const LabelAndInputWithCloseSvg = ({
  label,
  value,
  onChangeText,
  isRequired = false,
}) => {
  const [isFocused, setIsFocused] = useState(false); // 입력 필드 포커스 상태 관리

  return (
    <>
      <RequiredTextLabel label={label} isRequired={isRequired} />
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
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)} // 포커스 시
          onBlur={() => setIsFocused(false)} // 포커스 해제 시
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onChangeText('')}>
          <CloseGraySvg />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
    paddingRight: 10, // 닫기 버튼의 패딩 조정
  },
});

export default LabelAndInputWithCloseSvg;
