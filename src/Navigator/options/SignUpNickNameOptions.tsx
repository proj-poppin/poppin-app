import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type SignUpNickNameScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'SignUpNickName'
>;

const SignUpNickNameOptions = ({
  navigation,
}: {
  navigation: SignUpNickNameScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.replace('Entry')}
      style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '정보입력',
});

export default SignUpNickNameOptions;
