import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type SignInEmailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'Entry'
>;

export const EntryScreenOptions = ({
  navigation,
}: {
  navigation: SignInEmailScreenNavigationProp;
}) => ({
  headerTitle: '',
  headerLeft: () => (
    <Pressable
      onPress={() => {
        navigation.replace('MainTabNavigator');
      }}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
