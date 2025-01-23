import React from 'react';
import styled from 'styled-components/native';
import {Screen} from '../../../Component/Screen/Screen.component';
import {MyPageLandingScreenHeader} from './Mypage.landing.screenHeader';
import {MyPageLandingProfileSection} from './Section/Mypage.landing.profile.section';
import {MyPageLandingReviewSection} from './Section/MyPage.landing.review.section';
import {MyPageLandingRecentPopupSection} from './Section/Mypage.landing.recentPopup.section';
import {MyPageLandingMenuSection} from './Section/Mypage.landing.menu.section';
import {moderateScale} from '../../../Util';
import {MyPageLandingReportSection} from './Section/MyPage.landing.report.section';
import {MypageLandingLogoutModal} from './Mypage.landing.logout.modal';

export type MyPageLandingScreenProps = {};

export const MyPageLandingScreen = () => {
  return (
    <Screen
      contentContainerStyle={{
        paddingTop: moderateScale(16),
      }}
      ScreenHeader={<MyPageLandingScreenHeader />}
      ScreenContent={
        <>
          <MyPagePaddingSection>
            <MyPageLandingProfileSection />
            <MyPageLandingReportSection />
            <MyPageLandingReviewSection />
          </MyPagePaddingSection>
          <MyPagePaddingSection>
            <MyPageLandingRecentPopupSection />
            <MyPageLandingMenuSection />
          </MyPagePaddingSection>
          <MypageLandingLogoutModal />
        </>
      }
    />
  );
};

const MyPagePaddingSection = styled.View`
  padding: ${moderateScale(12)}px ${moderateScale(12)}px ${moderateScale(32)}px;
`;
