import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {AppStackProps} from './App.stack.navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeLandingScreen,
  HomeLandingScreenProps,
} from '../Screen/Home/Landing/Home.landing.screen';
import {
  PopupLandingScreen,
  PopupLandingScreenProps,
} from '../Screen/Popup/Landing/Popup.landing.screen';
import {
  PopupLikesLandingScreen,
  PopupLikesLandingScreenProps,
} from '../Screen/PopupLikes/Landing/PopupLikes.landing.screen';

import {
  MyPageLandingScreen,
  MyPageLandingScreenProps,
} from '../Screen/MyPage/Landing/MyPageLandingScreen';
import {moderateScale} from '../Util';
import styled from 'styled-components/native';
import {DetailText} from '../StyledComponents/Text';
import {themeColors} from 'src/Theme/theme';
import {HomeSymbol} from '../Symbol/svg/Home.symbol';
import {SearchSymbol} from '../Symbol/svg/Search.symbol';
import {StarSymbol} from '../Symbol/svg/Star.symbol';
import {MyPageSymbol} from '../Symbol/svg/MyPage.symbol';
import {useHomeLandingScreenStore} from '../Screen/Home/Landing/Home.landing.zustand';
import shallow from 'zustand/shallow';

const LandingBottomTab = createBottomTabNavigator<LandingBottomTabProps>();

export type LandingBottomTabProps = {
  HomeLandingScreen: HomeLandingScreenProps;
  PopupLandingScreen: PopupLandingScreenProps;
  PopupLikesLandingScreen: PopupLikesLandingScreenProps;
  MyPageLandingScreen: MyPageLandingScreenProps;
};

/**
 * 홈/팝업 찾기/관심팝업/프로필의 랜딩페이지가 모이는 네비게이터입니다.
 * @author 도형
 */
export const LandingBottomTabNavigator = ({
  navigation,
}: BottomTabScreenProps<LandingBottomTabProps>) => {
  const appStackNavigation =
    useNavigation<NavigationProp<AppStackProps, 'LandingBottomTabNavigator'>>();
  const {homeFeedRef} = useHomeLandingScreenStore(
    state => ({homeFeedRef: state.homeFeedRef}),
    shallow,
  );

  const onPressHome = () => {
    homeFeedRef.current?.scrollToOffset({offset: 0, animated: false});

    navigation.navigate('HomeLandingScreen', {});
  };

  const onPressPopupSearch = () => {
    navigation.navigate('PopupLandingScreen', {});
  };

  const onPressPopupLikes = () => {
    navigation.navigate('PopupLikesLandingScreen', {});
  };

  const onPressMyPage = () => {
    navigation.navigate('MyPageLandingScreen', {});
  };

  return (
    <LandingBottomTab.Navigator
      initialRouteName="HomeLandingScreen"
      screenOptions={({route}) => ({
        //? headerShown: bottomTabNavigator 상에서의 위치를 나타내는 헤더를 표시하지 않습니다.
        //? tabBarShowLabel: 기본 tabBarLabel을 표시하지 않습니다.
        //? tabBarHideOnKeyBoard: 키보드를 사용하면 tabBar를 숨깁니다.
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.bottomTabBar,
      })}>
      {/* 프로젝트 랜딩 페이지 */}
      <LandingBottomTab.Screen
        name={'HomeLandingScreen'}
        component={HomeLandingScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TabBarIcon label="홈" focused={focused} onPress={onPressHome} />
          ),
        })}
      />
      <LandingBottomTab.Screen
        name={'PopupLandingScreen'}
        component={PopupLandingScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              label="팝업 찾기"
              focused={focused}
              onPress={onPressPopupSearch}
            />
          ),
        })}
      />
      <LandingBottomTab.Screen
        name={'PopupLikesLandingScreen'}
        component={PopupLikesLandingScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              label="관심 팝업"
              focused={focused}
              onPress={onPressPopupLikes}
            />
          ),
        })}
      />
      <LandingBottomTab.Screen
        name={'MyPageLandingScreen'}
        component={MyPageLandingScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              label="마이 페이지"
              focused={focused}
              onPress={onPressMyPage}
            />
          ),
        })}
      />
    </LandingBottomTab.Navigator>
  );
};

/**
 * 홈 아이콘을 제외한 BottomTab의 Icon 컴포넌트
 * @author 도형
 */
function TabBarIcon({label, focused, onPress}: TabBarIconProps) {
  return (
    <TabBarIcon__Container activeOpacity={1} onPress={onPress}>
      <TabBarSvgIcon label={label} focused={focused} />
      <TabBarIcon__Text focused={focused}>{label}</TabBarIcon__Text>
    </TabBarIcon__Container>
  );
}

type TabBarIconProps = {
  label: '홈' | '팝업 찾기' | '관심 팝업' | '마이 페이지';
  focused: boolean;
  onPress?: () => void;
};

/**
 * BottomTab의 Icon에 들어갈 Svg 이미지 컴포넌트
 * @author 도형
 */
function TabBarSvgIcon({label, focused}: TabBarIconProps) {
  const fill = focused ? themeColors().blue.main : themeColors().grey.icon;
  switch (label) {
    case '홈':
      return <HomeSymbol size={28} fill={fill} />;
    case '팝업 찾기':
      return <SearchSymbol size={28} fill={fill} />;
    case '관심 팝업':
      return <StarSymbol size={28} fill={fill} />;
    case '마이 페이지':
      return <MyPageSymbol size={28} fill={fill} />;
  }
}
const TabBarIcon__Container = styled.TouchableOpacity`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${moderateScale(10)}px;
`;

const TabBarIcon__Text = styled(DetailText)<{focused: boolean}>`
  color: ${({focused, theme}) =>
    focused ? theme.color.blue.main : theme.color.grey.icon};
  margin-top: ${moderateScale(3)}px;
`;

const styles = StyleSheet.create({
  //하단바 전체 스타일
  //TODO: #SETTING(style) 그림자 설정 Android, iOS 다르게 해야함
  bottomTabBar: {
    paddingTop: moderateScale(20),
    // borderTopLeftRadius: moderateScale(20),
    // borderTopRightRadius: moderateScale(20),
    position: 'absolute',
    borderTopColor: 'white',
    borderTopWidth: 1,
    height: moderateScale(66),
    backgroundColor: 'white',
    // iOS 그림자 스타일
    shadowColor: '#000000',
    shadowOffset: {
      width: moderateScale(1),
      height: moderateScale(20),
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // android 그림자 스타일
    elevation: 25,
  },

  // tab bar 홈 아이콘 컨테이너
  tabBarHomeIcon: {
    marginBottom: moderateScale(25),
  },
});
