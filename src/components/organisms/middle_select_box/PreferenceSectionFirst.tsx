import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainTitle from '../header/MainTitle.tsx';
import OptionMultipleButton from '../../atoms/button/optionMultipleButton.tsx';
import globalColors from '../../../styles/color/globalColors.ts';
import {
  preferenceOptionsFirst,
  PreferenceCategories,
} from '../../../constants/PreferenceTypes.ts';

const PreferenceSectionFirst = ({updatePreference, preferences, nickname}) => {
  const handlePress = (key: string, isSelected: boolean) => {
    updatePreference(PreferenceCategories.PREFERENCE, key, isSelected);
    console.log('key:', key);
    console.log('preferences:', preferences);
  };

  return (
    <View>
      <MainTitle
        text1={`${nickname}님이`}
        text2={'선호하시는 팝업을 알려주세요'}
        isNeedCenter={true}
      />
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>*복수 선택 가능</Text>
      </View>
      <View style={styles.optionsContainer}>
        {preferenceOptionsFirst.map((option, index) => (
          <OptionMultipleButton
            key={index}
            id={option.key}
            title={option.title}
            isSelected={preferences.preference[option.key]}
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
  noteContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
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
