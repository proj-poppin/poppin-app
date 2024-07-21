import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type SignUpEmailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'SignUpAuthCode'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const SignUpEmailOptions = ({
  navigation,
}: {
  navigation: SignUpEmailScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.replace('Entry')}
      style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '이메일 확인',
});

export default SignUpEmailOptions;
