import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainTitle from '../header/MainTitle.tsx';
import OptionMultipleButton from '../../optionMultipleButton.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

const PreferenceSectionFirst = () => {
  return (
    <View>
      <MainTitle
        text1={'OO님이'}
        text2={'선호하시는 팝업을 알려주세요'}
        isNeedCenter={true}
      />
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>*복수 선택 가능</Text>
      </View>
      <View style={styles.optionsContainer}>
        {[
          '🛍️ 소비형',
          '🖼️ 전시형',
          '🏃 체험형',
          '무료 체험이었으면 좋겠어요',
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

export default PreferenceSectionFirst;
