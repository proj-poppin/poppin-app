import React from 'react';
import {Alert, Pressable, View} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import SettingSvg from '../../assets/icons/setting.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import {useNavigation} from '@react-navigation/native';
import {EntryScreenNavigationProp} from '../../components/HomeLoginHeader.tsx';
import {PrivacyPolicyScreenNavigationProp} from '../../types/NavigateOptions.ts';

// HeaderOptions 컴포넌트
const AlarmOptions = ({
  navigation,
}: {
  navigation: PrivacyPolicyScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '알림',
  headerRight: () => (
    <Pressable
      onPress={() => navigation.navigate('AlarmSetting')}
      style={{padding: 10}}>
      <View>
        <SettingSvg />
      </View>
    </Pressable>
  ),
});

export default AlarmOptions;
