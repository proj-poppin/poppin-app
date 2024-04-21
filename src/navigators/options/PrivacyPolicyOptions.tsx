import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'PrivacyPolicy'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const PrivacyPolicyOptions = ({
  navigation,
}: {
  navigation: PrivacyPolicyScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '위치정보 및 개인정보 처리방침',
});

export default PrivacyPolicyOptions;
