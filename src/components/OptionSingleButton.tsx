import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';

// isSelected와 같은 선택 상태를 props로 받음
const OptionSingleButton = ({id, title, onPress, isSelected}) => {
  // 내부 상태 관리 대신 부모 컴포넌트로부터 받은 isSelected 값을 사용
  const handlePress = () => {
    onPress(id); // 부모 컴포넌트에게 이벤트를 알림
  };

  return (
    <Pressable onPress={handlePress}>
      {({pressed}) => (
        <View
          style={[
            styles.button,
            {
              backgroundColor: isSelected ? `${globalColors.blue}1A` : 'white', // 부모 컴포넌트로부터 받은 isSelected 값을 기반으로 배경색 설정
              borderColor: isSelected
                ? globalColors.blue
                : globalColors.warmGray, // 선택 상태에 따른 테두리 색상 변경
            },
          ]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default OptionSingleButton;
