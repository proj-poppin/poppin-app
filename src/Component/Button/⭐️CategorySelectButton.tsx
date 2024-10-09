import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import { PreferenceSchema } from "../../Schema/Preference/preference.schema";

interface CategorySelectButtonProps {
  item: keyof PreferenceSchema; // PreferenceSchema의 모든 키에 대해 선택 가능
  onClick: (item: keyof PreferenceSchema) => void; // 클릭 시 해당 항목을 처리
  selectedTag?: keyof PreferenceSchema; // 선택된 항목
  isMultipleNeeded?: boolean; // 다중 선택 여부
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({

item,onClick, selectedTag, isMultipleNeeded = false,
                                                                   }) => {
  const isSelected = isMultipleNeeded
    ? Array.isArray(selectedTag) && selectedTag.includes(item)
    : selectedTag === item;

  return (
    <Pressable onPress={() => onClick(item)}>
      {isSelected ? (
        <LinearGradient
          colors={globalColors.blueToPurpleGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.innerContent}>
            <Text>{item}</Text> {/* item 자체를 텍스트로 출력 */}
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.tag}>
          <Text>{item}</Text> {/* item 자체를 텍스트로 출력 */}
        </View>
      )}
    </Pressable>
  );
};

export default CategorySelectButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  tag: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: globalColors.warmGray,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  selectedTag: {
    backgroundColor: globalColors.blueLight,
    borderWidth: 1,
    borderColor: globalColors.blue,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  gradientBorder: {
    borderRadius: 30,
    padding: 1.5,
  },
  innerContent: {
    borderRadius: 28,
    backgroundColor: globalColors.blueLight,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
