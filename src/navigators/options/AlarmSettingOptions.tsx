import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

// HeaderOptions 컴포넌트
const AlarmSettingOptions = ({
  navigation,
}: {
  navigation: PrivacyPolicyScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '알림 설정',
});

export default AlarmSettingOptions;
