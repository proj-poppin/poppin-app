import React from 'react';
import {Pressable} from 'react-native';
import CloseSvg from '../../assets/icons/close.svg';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGetUser from '../../hooks/auth/useGetUser.tsx';

type PasswordResetScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'PasswordReset'
>;

export const PasswordResetOptions = ({
  navigation,
}: {
  navigation: PasswordResetScreenNavigationProp;
}) => {
  const {data: user} = useGetUser();
  return {
    headerTitle: '비밀번호 재설정',
    headerLeft: () => (
      <Pressable
        onPress={() =>
          user
            ? navigation.replace('PasswordChange')
            : navigation.replace('Entry')
        }
        style={{padding: 10}}>
        <CloseSvg />
      </Pressable>
    ),
  };
};
