import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import globalColors from '../styles/color/globalColors.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts';

const CustomSelectDropdown = ({
  data,
  onSelect,
  buttonWidth,
  iconComponent,
  buttonTextAfterSelection,
  buttonTextStyle,
}) => {
  const dropdownWidth = buttonWidth;

  return (
    <SelectDropdown
      data={data.map((item: any) => item.label)}
      onSelect={onSelect}
      buttonTextAfterSelection={buttonTextAfterSelection}
      rowTextForSelection={(item, index) => item}
      dropdownStyle={[
        styles.dropdownStyle,
        {width: dropdownWidth}, // 여기에서 넓이 조정
      ]}
      buttonStyle={[styles.dropdownButtonStyle, {width: buttonWidth}]}
      rowTextStyle={{color: globalColors.font, textAlign: 'center'}}
      renderCustomizedButtonChild={(selectedItem, index) => (
        <View style={styles.buttonInnerContainer}>
          <Text style={[Text14M.text, buttonTextStyle]}>
            {selectedItem || data[0].label}
          </Text>
          {iconComponent}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    backgroundColor: 'white',
  },
  labelSmallBlue: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: globalColors.blue,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  calendarViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginLeft: 5, //small gap between the text and the icon
  },
  dropdownButtonStyle: {
    backgroundColor: 'white', // 버튼 배경색을 흰색으로 설정
    borderRadius: 20,
    // 필요한 경우 여기에 다른 스타일 추가
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'flex-start', // 내용물 사이의 공간 동일하게 배분
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 210,
    // 필요한 경우 여기에 추가 스타일 설정
  },
});

export default CustomSelectDropdown;
