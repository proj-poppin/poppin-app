// src/screens/MyProfileEdit/MyProfileEditScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {
  MypageProfileEditProvider,
  useProfileEdit,
} from './Mypage.profile.edit.context';
import {MyProfileEditContainer} from './Mypage.profile.edit.container';
import {ScreenHeader} from 'src/Component/View';
import CommonCompleteButton from 'src/Components/Common/common.complete.button';

export interface MypageProfileEditScreenProps {}

function ProfileEditContent() {
  const {onCompleteProfileEdit} = useProfileEdit();
  const handlePress = () => {
    console.log('Button pressed');
    onCompleteProfileEdit();
  };

  return (
    <>
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
            onPress={handlePress}
          />
        }
      />
      <MyProfileEditContainer />
    </>
  );
}

export function MypageProfileEditScreen({}: NativeStackScreenProps<
  AppStackProps,
  'MypageProfileEditScreen'
>) {
  return (
    <MypageProfileEditProvider>
      <ProfileEditContent />
    </MypageProfileEditProvider>
  );
}
