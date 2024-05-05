import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type SignInEmailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'Entry'
>;

export const NoticeDetailOptions = ({
  navigation,
}: {
  navigation: SignInEmailScreenNavigationProp;
}) => ({
  headerTitle: '알림 내용',
  headerLeft: () => (
    <Pressable
      onPress={() => {
        navigation.replace('Alarm');
      }}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
