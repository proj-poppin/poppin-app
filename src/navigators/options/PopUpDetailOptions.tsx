import React from 'react';
import {Pressable, StyleSheet, View, Text, Alert} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import MenuSvg from '../../assets/detail/menu.svg';
import globalColors from '../../styles/color/globalColors.ts';
import SelectDropdown from 'react-native-select-dropdown';
import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

interface PopUpDetailOptionsProps {
  navigation: NativeStackNavigationProp<AppNavigatorParamList, 'PopUpDetail'>;
  id: number;
  name: string;
  isLoggedIn: boolean;
  openLoginModal: (message: string, isBlocked?: boolean) => void;
  openBlockModal: () => void;
}

const PopUpDetailOptions = ({
  navigation,
  id,
  name,
  isLoggedIn,
  openLoginModal,
  openBlockModal,
}: PopUpDetailOptionsProps): Partial<NativeStackNavigationOptions> => {
  const menuOptions = [
    {label: '신고하기', route: 'Report'},
    {label: '수정 요청하기', route: 'PopUpEditRequest'},
    {label: '차단하기', route: 'Block'},
  ];

  const handleSelect = async (selectedItem: any) => {
    if (!isLoggedIn) {
      if (selectedItem.route === 'Report') {
        openLoginModal('팝업을 신고하려면 로그인이 필요합니다.');
      } else if (selectedItem.route === 'PopUpEditRequest') {
        openLoginModal('팝업 정보수정을 요청하려면 로그인이 필요합니다.');
      } else if (selectedItem.route === 'Block') {
        openLoginModal('차단하려면 로그인이 필요합니다.');
      }
      return;
    }

    if (selectedItem.route === 'Report') {
      navigation.navigate(selectedItem.route, {id, isReview: false});
    } else if (selectedItem.route === 'PopUpEditRequest') {
      navigation.navigate(selectedItem.route, {id, name});
    } else if (selectedItem.route === 'Block') {
      openBlockModal();
    }
  };

  return {
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.navigate('MainTabNavigator')}
        style={{padding: 10}}>
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
    width: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
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
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: globalColors.white,
    marginTop: 20,
    marginLeft: -100,
    minWidth: 150,
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
