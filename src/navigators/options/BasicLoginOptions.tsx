import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';

type BasicLoginScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'BasicLogin'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const BasicLoginOptions = ({
  navigation,
}: {
  navigation: BasicLoginScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '로그인',
});

export default BasicLoginOptions;
