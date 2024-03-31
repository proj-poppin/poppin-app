import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SignInEmailScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
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
      onPress={() => navigation.replace('MainTabNavigator')}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
