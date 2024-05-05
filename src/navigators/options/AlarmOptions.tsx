import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import SettingSvg from '../../assets/icons/setting.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

// HeaderOptions 컴포넌트
const AlarmOptions = ({
  navigation,
}: {
  navigation: PrivacyPolicyScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{padding: 10, backgroundColor: 'yellow'}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '알림',
  headerRight: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <View>
        <SettingSvg />
      </View>
    </Pressable>
  ),
});

export default AlarmOptions;
