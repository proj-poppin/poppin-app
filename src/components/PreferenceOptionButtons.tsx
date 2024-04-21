import React from 'react';
import {StyleSheet, View} from 'react-native';
import OptionSingleButton from './atoms/button/OptionSingleButton.tsx';

const PreferenceOptionButtons = ({
  step,
  onSelectOption,
  isEmojiRemoved = false,
  isSingleSelect = false,
  selectedCategory = '',
  selectedCategories = [],
}) => {
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
      '기타',
    ],
    3: [
      '나 혼자 방문해요',
      '친구와 방문해요',
      '가족과 방문해요',
      '연인과 방문해요',
    ],
    4: ['전체', '7세 이상', '12세 이상', '15세 이상', '성인'],
  };
  const handlePress = option => {
    if (isSingleSelect) {
      // 이모지 제거 로직을 적용
      const optionWithoutEmoji = removeEmoji(option);
      onSelectOption(optionWithoutEmoji); // 수정된 옵션 값을 onSelectOption에 전달
    } else {
      // 복수 선택 모드 로직 (변경 없음)
      onSelectOption(option, step);
    }
  };
  const currentOptions = optionsForSteps[step];

  // 이모티콘을 제거하는 함수
  const removeEmoji = text =>
    text
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{E000}-\u{F8FF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}]/gu,
        '',
      )
      .trim();

  return (
    <View style={styles.optionsContainer}>
      {currentOptions.map((option, index) => (
        <OptionSingleButton
          key={index}
          id={index.toString()}
          title={isEmojiRemoved ? removeEmoji(option) : option}
          onPress={() => handlePress(option)}
          isSelected={
            isSingleSelect
              ? removeEmoji(option.toString()) === selectedCategory // 단일 선택 모드에서는 selectedCategory를 기준으로 판단
              : selectedCategories.includes(option) // 복수 선택 모드에서는 기존 로직 유지
          }
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
