import React from 'react';
import {Pressable} from 'react-native';
import BackSvg from '../../assets/icons/goBack.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PopUpEditRequestScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpEditRequest'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const PopUpEditRequestOptions = ({
  navigation,
}: {
  navigation: PopUpEditRequestScreenNavigationProp;
}) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
      <BackSvg />
    </Pressable>
  ),
  headerTitle: '정보 수정 요청',
});

export default PopUpEditRequestOptions;
