import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

// @ts-ignore
const CompleteButton = ({
  // @ts-ignore
  onPress, // 버튼을 눌렀을 때 호출되는 함수
  // @ts-ignore
  title,
  // @ts-ignore
  loading, // 버튼이 로딩 중인지 여부
  // @ts-ignore
  disabled, // 버튼이 비활성화되었는지 여부
  alwaysActive = false,
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      {
        backgroundColor: pressed
          ? primaryColors.buttonPressed
          : disabled && !alwaysActive
          ? primaryColors.component
          : primaryColors.blue,
        // 다른 스타일 속성
      },
      disabled && !alwaysActive && styles.disabledButton,
    ]}
    onPress={onPress}
    disabled={disabled || loading}>
    {loading ? (
      <ActivityIndicator color={primaryColors.white} />
    ) : (
      <Text
        style={[
          globalStyles.bodyLargePrimary, // globalStyles.bodyLargePrimary 스타일 적용
          {
            color:
              disabled && !alwaysActive
                ? primaryColors.font
                : primaryColors.white, // 조건부 색상 적용
          },
        ]}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '85%', // 버튼의 너비를 200 픽셀로 설정
    height: 57,
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // 버튼을 부모 컨테이너의 중앙에 위치
  },
  disabledButton: {
    backgroundColor: primaryColors.component,
  },
});

export default CompleteButton;
