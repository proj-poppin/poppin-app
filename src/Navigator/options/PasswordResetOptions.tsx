import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PasswordResetScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PasswordReset'
>;

export const PasswordResetOptions = ({
  navigation,
}: {
  navigation: PasswordResetScreenNavigationProp;
}) => ({
  headerTitle: '비밀번호 재설정',
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.replace('Entry')}
      style={{padding: 10}}>
      <CloseSvg />
    </Pressable>
  ),
});
