import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import MenuSvg from '../../assets/detail/menu.svg';

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
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '알림',
  headerRight: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <View>
        <Text>hi</Text>
      </View>
    </Pressable>
  ),
});

export default AlarmOptions;
