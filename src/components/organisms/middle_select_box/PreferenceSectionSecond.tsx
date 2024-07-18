import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OptionMultipleButton from '../../atoms/button/optionMultipleButton.tsx';
import MainTitle from '../header/MainTitle.tsx';
import globalColors from '../../../styles/color/globalColors.ts';
import {
  preferenceOptionsSecond,
  PreferenceCategories,
} from '../../../constants/PreferenceTypes.ts';

const PreferenceSectionSecond = ({updatePreference, preferences, nickname}) => {
  const handlePress = (key: string, isSelected: boolean) => {
    updatePreference(PreferenceCategories.TASTE, key, isSelected);
    console.log('preferences:', preferences);
  };

  return (
    <View>
      <MainTitle
        text1={`${nickname}님의`}
        text2={'관심사가 궁금해요'}
        isNeedCenter={true}
      />
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>*복수 선택 가능</Text>
      </View>
      <View style={styles.optionsContainer}>
        {preferenceOptionsSecond.map((option, index) => (
          <OptionMultipleButton
            key={index}
            id={option.key}
            title={option.title}
            isSelected={preferences.taste[option.key]} // Pass the current selection state
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
  noteText: {
    color: globalColors.blue,
  },
  noteContainer: {
    width: '100%', // 컨테이너가 화면 너비 전체를 차지하도록 설정
    alignItems: 'center', // 수평 중앙 정렬
    marginTop: 30, // 상단 여백
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default PreferenceSectionSecond;
