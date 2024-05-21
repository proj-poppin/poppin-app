import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import MenuSvg from '../../assets/detail/menu.svg';
import globalColors from '../../styles/color/globalColors.ts';
import SelectDropdown from 'react-native-select-dropdown';

type PopUpDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

const PopUpDetailOptions = ({
  navigation,
}: {
  navigation: PopUpDetailScreenNavigationProp;
}) => {
  const menuOptions = [
    {label: '신고하기', route: 'Report'},
    {label: '수정 요청하기', route: 'PopUpEditRequest'},
  ];

  const handleSelect = (selectedItem: any) => {
    navigation.navigate(selectedItem.route);
  };

  return {
    headerLeft: () => (
      <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
        <BackSvg />
      </Pressable>
    ),
    headerTitle: () => (
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>팝업 상세</Text>
      </View>
    ),
    headerRight: () => (
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={menuOptions}
          onSelect={handleSelect}
          buttonTextAfterSelection={selectedItem => selectedItem.label}
          rowTextForSelection={item => item.label}
          renderCustomizedButtonChild={() => <MenuSvg />}
          buttonStyle={styles.dropdownButtonStyle}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowTextStyle}
          defaultButtonText=""
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 20,
  },
  dropdownButtonStyle: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownStyle: {
    borderRadius: 8,
    backgroundColor: globalColors.white,
    marginTop: 20,
    minWidth: 100,
  },
  rowTextStyle: {
    color: globalColors.font,
    textAlign: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PopUpDetailOptions;
