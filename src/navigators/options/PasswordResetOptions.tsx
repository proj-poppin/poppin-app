import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PasswordResetScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
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
