// src/screens/MyProfileEdit/MyProfileEditScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {MypageProfileEditProvider} from './Mypage.profile.edit.context';
import {MyProfileEditContainer} from './Mypage.profile.edit.container';
import {ScreenHeader} from 'src/Component/View';
import CommonCompleteButton from 'src/Screen/Popup/Landing/common.complete.button';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export interface MypageProfileEditScreenProps {}

export function MypageProfileEditScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageProfileEditScreen'>) {
  return (
    <MypageProfileEditProvider>
      <ScreenHeader
        LeftComponents={'BACK_BUTTON'}
        title={'프로필 설정'}
        RightComponents={
          <CommonCompleteButton
            title="완료"
            style={{backgroundColor: 'white', marginLeft: 30}}
            textStyle={{
              color: '#0EB5F9',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          />
        }
        onPressRightComponent={() => console.log('나가긴')}
      />
      <MyProfileEditContainer />
    </MypageProfileEditProvider>
  );
}
