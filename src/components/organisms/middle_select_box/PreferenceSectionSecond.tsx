import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OptionMultipleButton from '../../optionMultipleButton.tsx';
import MainTitle from '../header/MainTitle.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

const PreferenceSectionSecond = () => {
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
        {[
          '💄 패션/뷰티',
          '🥰 캐릭터',
          '🍽️ 식품/음료',
          '📚 웹툰/애니메이션',
          '🛋️ 인테리어/소품',
          '🎬 영화/드라마/예능',
          '🎼 뮤지컬/연극',
          '⚽ 스포츠',
          '🎮 게임',
          '💻 IT/테크',
          '🎤 K-POP',
          '🍷 주류',
          '🪴 동물/식물',
        ].map((option, index) => (
          <OptionMultipleButton
            key={index}
            id={index.toString()}
            title={option}
            onPress={() => console.log(`${option} 선택됨, id: ${index}`)}
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
