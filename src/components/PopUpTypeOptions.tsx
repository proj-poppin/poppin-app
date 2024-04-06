import React from 'react';
import {StyleSheet, View} from 'react-native';
import OptionSingleButton from './OptionSingleButton.tsx';
import OptionMultipleButton from './optionMultipleButton.tsx';

const PopupTypeOptions = ({onSelectOption, selectedPopUpType}) => {
  const options = [
    {label: '🛍️ 소비형', value: '소비형'},
    {label: '🖼️ 전시형', value: '전시형'},
    {label: '🏃 체험형', value: '체험형'},
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <OptionMultipleButton
          key={index}
          id={index.toString()}
          title={option.label}
          onPress={() => onSelectOption(option.value)}
          isSelected={undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -5,
  },
});

export default PopupTypeOptions;
