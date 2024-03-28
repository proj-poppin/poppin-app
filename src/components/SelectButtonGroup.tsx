import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';
import Text18B from './texts/body_large/Text18B.ts';

interface SelectButtonsGroupProps {
  titles: [string, string]; // 두 개의 선택지 타이틀
  selected: string | null; // 현재 선택된 항목
  onSelect: (selection: string) => void; // 선택 변경 콜백
}

const SelectButtonsGroup: React.FC<SelectButtonsGroupProps> = ({
  titles,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {titles.map((title, index) => (
        <Pressable
          key={index}
          style={[
            styles.button,
            {
              borderColor:
                selected === title ? globalColors.blue : globalColors.warmGray,
              backgroundColor:
                selected === title
                  ? `${globalColors.blue}1A`
                  : globalColors.white,
            },
          ]}
          onPress={() => onSelect(title)}>
          <Text
            style={[
              Text18B.text,
              {
                color:
                  selected === title
                    ? globalColors.black
                    : selected
                    ? globalColors.warmGray
                    : globalColors.black,
              },
            ]}>
            {title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  button: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: `${globalColors.blue}1A`, // 투명도 10% 적용
  },
});

export default SelectButtonsGroup;
