import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type ReportScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'Report'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const ReportOptions = ({
  navigation,
}: {
  navigation: ReportScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '신고하기',
});

export default ReportOptions;
