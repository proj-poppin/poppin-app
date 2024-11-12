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
  headerTitle: '취향 설정하기',
  headerLeft: () => (
    <Pressable
      onPress={() => {
        navigation.navigate('ProfileEdit');
      }}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
