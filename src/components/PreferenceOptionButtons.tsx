import React from 'react';
import {StyleSheet, View} from 'react-native';
import OptionButton from './optionButton.tsx';

const PreferenceOptionButtons = ({step, onSelectOption}) => {
  const optionsForSteps = {
    1: ['🛍️ 소비형', '🖼️ 전시형', '🏃 체험형', '무료 체험이었으면 좋겠어요'],
    2: [
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
    ],
    3: [
      '나 혼자 방문해요',
      '친구와 방문해요',
      '가족과 방문해요',
      '연인과 방문해요',
    ],
  };

  const currentOptions = optionsForSteps[step];

  return (
    <View style={styles.optionsContainer}>
      {currentOptions.map((option, index) => (
        <OptionButton
          key={index}
          title={option}
          onPress={() => {
            onSelectOption(option, index);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  progressBarFill: {
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  // optionsContainer 및 기타 스타일 유지
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSkip: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 10,
  },
  buttonSetNow: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
  },
  overlayStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 검은색 배경에 50% 불투명도
  },
});

export default PreferenceOptionButtons;
