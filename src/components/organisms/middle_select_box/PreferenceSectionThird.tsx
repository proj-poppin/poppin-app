import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainTitle from '../header/MainTitle.tsx';
import OptionMultipleButton from '../../optionMultipleButton.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

const PreferenceSectionThird = () => {
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
        {[
          '나 혼자 방문해요',
          '친구와 방문해요',
          '가족과 방문해요',
          '연인과 방문해요',
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
