import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainTitle from '../header/MainTitle.tsx';
import OptionMultipleButton from '../../atoms/button/optionMultipleButton.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

const PreferenceSectionThird = ({updatePreference, preferences}) => {
  // 훅에서 updatePreferences 함수 사용

  const options = [
    {title: '나 혼자 방문해요', key: 'solo'},
    {title: '친구와 방문해요', key: 'withFriend'},
    {title: '가족과 방문해요', key: 'withFamily'},
    {title: '연인과 방문해요', key: 'withLover'},
  ];

  const handlePress = (key: string, isSelected: boolean) => {
    updatePreference('whoWith', key, isSelected);
    console.log('key:', key);
    console.log('preferences:', preferences);
  };

  return (
    <View>
      <MainTitle
        text1={'OO님은'}
        text2={'주로 누구와 팝업에 방문하시나요?'}
        isNeedCenter={true}
      />
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>*복수 선택 가능</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <OptionMultipleButton
            key={index}
            id={option.key}
            title={option.title}
            isSelected={preferences.whoWith[option.key]} // Pass the current selection state
            onPress={(isSelected: boolean) =>
              handlePress(option.key, isSelected)
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    width: '100%', // 컨테이너가 화면 너비 전체를 차지하도록 설정
    alignItems: 'center', // 수평 중앙 정렬
    marginTop: 30, // 상단 여백
  },
  noteText: {
    color: globalColors.blue,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default PreferenceSectionThird;
