import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import MenuSvg from '../../assets/detail/menu.svg';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
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
  headerTitle: '팝업 상세',
  headerRight: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <MenuSvg />
    </Pressable>
  ),
});

export default PrivacyPolicyOptions;
