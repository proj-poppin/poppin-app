import React from 'react';
import {Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GoBackSvg from '../../assets/icons/goBack.svg';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
type PasswordChangeScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PasswordChange'
>;
export const PasswordChangeOptions = ({
  navigation,
}: {
  navigation: PasswordChangeScreenNavigationProp;
}) => ({
  headerTitle: '비밀번호 변경',
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <GoBackSvg />
    </Pressable>
  ),
});
