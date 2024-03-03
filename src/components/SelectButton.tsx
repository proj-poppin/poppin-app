import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';
import LinearGradient from 'react-native-linear-gradient';

interface SelectButtonProps {
  onPress: () => void;
  title: string;
  selected?: boolean;
  buttonWidth?: number | string;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  onPress,
  title,
  selected = false,
  buttonWidth = '45%',
}) => {
  const gradientColors = selected
    ? [primaryColors.purple, primaryColors.blue]
    : [primaryColors.font, primaryColors.font]; // 선택되지 않았을 때는 단색으로 표시

  const contentBackgroundColor = selected
    ? `${primaryColors.blue}1A`
    : primaryColors.white;

  return (
    <View style={{width: buttonWidth, alignItems: 'center'}}>
      <LinearGradient
        locations={[0.2, 1]}
        start={{x: 0.3, y: 1}}
        end={{x: 0.5, y: 0}}
        colors={gradientColors}
        style={[styles.button, {borderRadius: 24}]}>
        <Pressable
          onPress={onPress}
          style={({pressed}) => [
            styles.innerButton,
            {
              opacity: pressed ? 0.3 : 1, // 선택된 상태에 따라 투명도 조정으로 버튼 효과 제공
            },
          ]}>
          <View style={styles.content}>
            <Text
              style={[
                globalStyles.bodyMediumPrimary,
                {color: selected ? primaryColors.black : primaryColors.font},
              ]}>
              {title}
            </Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    padding: 1.5, // 테두리 두께
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: '100%', // LinearGradient가 부모 View의 너비를 차지하도록 설정
  },
  innerButton: {
    width: '100%', // 내부 버튼의 너비 (전체 너비와 동일하게 설정해도 됩니다, padding 때문에 자동으로 테두리가 생깁니다)
    height: 40, // 내부 버튼의 높이, 조절하여 테두리의 두께를 결정
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white', // 내부 버튼 색상
    borderRadius: 22, // 내부 버튼의 모서리 둥글기
    width: '100%', // 테두리를 고려한 너비 조정
    height: '100%', // 테두리를 고려한 높이 조정
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectButton;
