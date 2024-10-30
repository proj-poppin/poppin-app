import {ScrollView} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {Screen} from '../../../Component/Screen/Screen.component';
import {SectionContainer} from '../../../Unit/View';
import {MyPageLandingScreenHeader} from './Mypage.landing.screenHeader';
import {MyPageLandingProfileSection} from './Section/Mypage.landing.profile.section';
import {MyPageLandingReportSection} from './Section/MyPage.landing.report.section';
import {MyPageLandingReviewSection} from './Section/MyPage.landing.review.section';
import {MyPageLandingRecentPopupSection} from './Section/Mypage.landing.recentPopup.section';
import {MyPageLandingMenuSection} from './Section/Mypage.landing.menu.section';
import {moderateScale} from '../../../Util';

export type MyPageLandingScreenProps = {};

export const MyPageLandingScreen = () => {
  /**
   * 뒤로 가기 버튼을 누르면 홈 랜딩 페이지로 이동합니다.
   * @author 도형
   */

  return (
    <Screen
      fullScreen
      ScreenContent={
        <SectionContainer fullPage style={{position: 'relative'}}>
          <MyPageLandingScreenHeader />

          <ScrollView>
            <MyPagePaddingSection>
              <MyPageLandingProfileSection />
              <MyPageLandingReportSection />
              <MyPageLandingReviewSection />
            </MyPagePaddingSection>
            <MyPagePaddingSection>
              <MyPageLandingRecentPopupSection />
              <MyPageLandingMenuSection />
            </MyPagePaddingSection>
          </ScrollView>
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

const MyPagePaddingSection = styled.View`
  padding: ${moderateScale(4)}px ${moderateScale(12)}px;
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
