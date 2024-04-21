import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OptionMultipleButton from '../../atoms/button/optionMultipleButton.tsx';
import MainTitle from '../header/MainTitle.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

const PreferenceSectionSecond = ({updatePreference, preferences}) => {
  const options = [
    {title: '💄 패션/뷰티', key: 'fashionBeauty'},
    {title: '🥰 캐릭터', key: 'characters'},
    {title: '🍽️ 식품/음료', key: 'foodBeverage'},
    {title: '📚 웹툰/애니메이션', key: 'webtoonAni'},
    {title: '🛋️ 인테리어/소품', key: 'interiorThings'},
    {title: '🎬 영화/드라마/예능', key: 'movie'},
    {title: '🎼 뮤지컬/연극', key: 'musical'},
    {title: '⚽ 스포츠', key: 'sports'},
    {title: '🎮 게임', key: 'game'},
    {title: '💻 IT/테크', key: 'itTech'},
    {title: '🎤 K-POP', key: 'kpop'},
    {title: '🍷 주류', key: 'alcohol'},
    {title: '🪴 동물/식물', key: 'animalPlant'},
  ];

  const handlePress = (key: string, isSelected: boolean) => {
    updatePreference('taste', key, isSelected);
    console.log('key:', key);
    console.log('preferences:', preferences);
  };

  return (
    <View>
      <MainTitle
        text1={'OO님의'}
        text2={'관심사가 궁금해요'}
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
