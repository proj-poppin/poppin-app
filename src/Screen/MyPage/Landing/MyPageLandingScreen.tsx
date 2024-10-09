import {useUserStore} from '../../../Zustand/User/user.zustand';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {LandingBottomTabProps} from '../../../Navigator/Landing.bottomTab.navigator';
import {BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {DetailText} from '../../../StyledComponents/Text';
import {themeColors} from '../../../Theme/theme';
import {Screen} from '../../../Component/Screen/Screen.component';
import {SectionContainer} from '../../../Unit/View';

export type MyPageLandingScreenProps = {};

export const MyPageLandingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<LandingBottomTabProps, 'MyPageLandingScreen'>) => {
  /**
   * 뒤로 가기 버튼을 누르면 홈 랜딩 페이지로 이동합니다.
   * @author 도형
   */
  const bottomTabNavigation =
    useNavigation<
      BottomTabNavigationProp<LandingBottomTabProps, 'MyPageLandingScreen'>
    >();

  return (
    <Screen
      fullScreen
      ScreenContent={
        <SectionContainer fullPage style={{position: 'relative'}}>
          <DetailText>sss</DetailText>
        </SectionContainer>
      }
    />
  );

  // return (
  //   <Container>
  //     {/*<Screen*/}
  //     {/*  contentContainerStyle={{*/}
  //     {/*    paddingTop: moderateScale(16),*/}
  //     {/*    paddingBottom: moderateScale(80),*/}
  //     {/*  }}*/}
  //     {/*  ScreenHeader={<MypageLandingScreenHeader />}*/}
  //     {/*  ScreenContent={*/}
  //     {/*    <>*/}
  //     {/*      <MypageLandingProfile />*/}
  //     {/*      <MypageLandingPartnerCreditSection />*/}
  //     {/*      <MypageLandingCreditSection />*/}
  //     {/*      <MypageLandingNoticeBannerSection />*/}
  //     {/*      <MypageLandingMyActivitySection />*/}
  //     {/*      <MypageLandingQuickMenuSection />*/}
  //     {/*      <MypageLandingFunctionSection />*/}
  //     {/*      /!* <MypageLandingEvent /> *!/*/}
  //     {/*      /!* <MypageLandingFollow /> *!/*/}
  //     {/*      <MypageLandingAdBannerSection />*/}
  //     {/*      <MypageLandingAboutSection />*/}
  //     {/*    </>*/}
  //     {/*  }*/}
  //     {/*/>*/}
  //     {/*기획 다시 나올 때까지 주석처리 */}
  //     {/* <MyPageLandingCreateIconSection /> */}
  //   </Container>
  // );
};

const Container = styled.View`
  position: relative;
  flex: 1;
`;

/**
 * 마이페이지 랜딩 페이지에서만 사용되는 스타일
 * @author 도형
 */
// export const mypageLandingScreenStyles = StyleSheet.crate({
//   /** 섹션 구분선 */
//   boundary: {
//     borderBottomWidth: 6,
//     borderBottomColor: themeColors().purple.mild,
//   },
// });
