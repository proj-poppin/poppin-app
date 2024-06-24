import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PreferenceSettingScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PreferenceSetting'
>;

export const MyPagePreferenceSettingScreenOptions = ({
  navigation,
}: {
  navigation: PreferenceSettingScreenNavigationProp;
}) => ({
  headerTitle: '',
  headerLeft: () => (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
