import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type ServicePolicyScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'ServicePolicy'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const ServicePolicyOptions = ({
  navigation,
}: {
  navigation: ServicePolicyScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '서비스 이용약관',
});

export default ServicePolicyOptions;
