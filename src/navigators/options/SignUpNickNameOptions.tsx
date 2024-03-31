import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';

type SignUpNickNameScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'SignUpNickName'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const SignUpNickNameOptions = ({
  navigation,
}: {
  navigation: SignUpNickNameScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.replace('SignUpNickName')}
      style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '정보입력',
});

export default SignUpNickNameOptions;
