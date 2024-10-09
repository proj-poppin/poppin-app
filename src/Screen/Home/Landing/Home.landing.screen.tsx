import React, {useEffect, useState} from 'react';
import {DetailText} from 'src/StyledComponents/Text';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, View} from 'react-native';
import shallow from 'zustand/shallow';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {moderateScale, navigateInAppScreen} from 'src/Util';
import styled from 'styled-components/native';
import {HomeLandingScreenHeader} from './Section/Home.landing.screenHeader';
import {TitleText} from 'src/StyledComponents/Text/title.component';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import ActionPromptBox from 'src/Box/ActionPromptBox';
import DividerLine from 'src/Component/DividerLine/DividerLine';
import HomeLandingPopularTop5PopupSection from './Section/Home.landing.popularTop5Popup.section';
import HomeLandingPopupSection from './Section/Home.landing.popup.section';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import {useHomeLandingScreenStore} from './Home.landing.zustand';

export const HomeLandingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'LandingBottomTabNavigator'>) => {
  const {initialDestination, setInitialDestination} = useAppStore(
    state => ({
      initialDestination: state.initialDestination,
      setInitialDestination: state.setInitialDestination,
    }),
    shallow,
  );

  const {
    homeFeedRef,
    refreshing,
    refreshHomePopupStores,
    gettingOlder,
    // getOlderHomePopupStores,
  } = useHomeLandingScreenStore(
    state => ({
      homeFeedRef: state.homeFeedRef,
      refreshing: state.refreshing,
      refreshHomePopupStores: state.refreshHomePopupStores,
      gettingOlder: state.gettingOlder,
      // getOlderHomePopupStores: state.getOlderHomePopupStores,
    }),
    shallow,
  );

  const {
    popularTop5PopupStores,
    newlyOpenedPopupStores,
    closingSoonPopupStores,
    recommendedPopupStores,
  } = usePopupStore(
    state => ({
      popularTop5PopupStores: state.popularTop5PopupStores,
      newlyOpenedPopupStores: state.newlyOpenedPopupStores,
      closingSoonPopupStores: state.closingSoonPopupStores,
      recommendedPopupStores: state.recommendedPopupStores,
    }),
    shallow,
  );

  const {user, isLoggedIn} = useUserStore(
    state => ({user: state.user, isLoggedIn: state.isLoggedIn}),
    shallow,
  );

  const loggedin = isLoggedIn();

  const renderContent = () => (
    <>
      {loggedin ? (
        <>
          <TitleText>
            어서오세요, {user.nickname}님{'\n'}취향저격 팝업 알려드릴게요
          </TitleText>
          {user.isPreferenceSetting ? (
            <DetailText>취향 설정 완료</DetailText>
          ) : (
            <ActionPromptBox
              boxType="PREFERENCE"
              onPress={() => {
                // 취향 설정 화면으로 이동하는 로직 추가
              }}
            />
          )}
        </>
      ) : (
        <ActionPromptBox
          boxType="LOGIN"
          onPress={() => {
            // 로그인 화면으로 이동하는 로직 추가
          }}
        />
      )}
      <DividerLine style={{marginTop: moderateScale(10)}} />
      <HomeLandingPopularTop5PopupSection popups={popularTop5PopupStores} />
      <HomeLandingPopupSection
        popups={newlyOpenedPopupStores}
        sectionType={'NEWLY_OPENED'}
      />
      <HomeLandingPopupSection
        popups={closingSoonPopupStores}
        sectionType={'CLOSING_SOON'}
      />
    </>
  );

  //* 만약 푸시 알림/다이나믹 링크/카카오톡 공유하기를 통해 종료되어 있던 앱을 실행한 경우,
  //* 목적지가 initialDestination 에 저장됩니다.
  //* initialDestination 이 존재하는 경우, 해당 목적지로 이동합니다.
  useEffect(() => {
    if (initialDestination !== undefined) {
      navigateInAppScreen({navigation, destination: initialDestination});
      setInitialDestination(undefined);
    }
  }, [initialDestination]);

  return (
    <Container>
      {/* 상단 앱바(고정) */}
      <HomeLandingScreenHeader />

      {/* 스크롤 가능한 FlatList */}
      <FlatList
        style={{flex: 1}}
        ref={homeFeedRef}
        ListHeaderComponent={<View style={{height: moderateScale(20)}} />} // 헤더와 콘텐츠 사이의 여유 공간
        data={[{key: 'content'}]} // 더미 데이터
        renderItem={() => renderContent()} // 실제 렌더링할 콘텐츠
        keyExtractor={item => item.key}
        refreshing={refreshing} // 새로 고침 상태
        onRefresh={refreshHomePopupStores} // 새로 고침 함수
        // onEndReached={getOlderHomePopupStores} // 스크롤 끝에서 추가 데이터 가져오기(랜딩화면 확장시 사용하기)
        onEndReachedThreshold={0.8}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
  margin-bottom: ${moderateScale(30)}px;
  background-color: ${({theme}) => theme.color.grey.white};
`;
