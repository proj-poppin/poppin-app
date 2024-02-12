import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer.ts';
import FindScreen from './src/screens/find/FindScreen.tsx';
import HomeScreen from './src/screens/home/HomeScreen.tsx';
import LikesScreen from './src/screens/likes/LikesScreen.tsx';
import MyPageScreen from './src/screens/myPage/MyPageScreen.tsx';
import NickNameSettingScreen from './src/screens/sign/NicknameSettingScreen.tsx';
import PasswordFindScreen from './src/screens/sign/PasswordFindScreen.tsx';
import SignInEmailScreen from './src/screens/sign/SignInEmailScreen.tsx';
import SignInPasswordScreen from './src/screens/sign/SignInPasswordScreen.tsx';
import SignUpScreen from './src/screens/sign/SignUpScreen.tsx';
import SignUpSucceedScreen from './src/screens/sign/SignUpSucceedScreen.tsx';

import CloseSvgIcon from './src/assets/icons/close.svg';
import LeftSvgIcon from './src/assets/icons/left.svg';
import ProtectInfoScreen from './src/screens/sign/ProtectInfoScreen.tsx';
import ServiceInfoScreen from './src/screens/sign/ServiceInfoScreen.tsx';
import PreferenceScreen from './src/screens/preference/PreferenceScreen.tsx';
import SplashScreen from './src/screens/SplashScreen.tsx';

import Tab1Svg from './src/assets/icons/tab1.svg';
import Tab2Svg from './src/assets/icons/tab2.svg';
import Tab3Svg from './src/assets/icons/tab3.svg';
import Tab4Svg from './src/assets/icons/tab4.svg';
import Tab1SvgOn from './src/assets/icons/tab1On.svg';
import Tab2SvgOn from './src/assets/icons/tab2On.svg';
import Tab3SvgOn from './src/assets/icons/tab3On.svg';
import Tab4SvgOn from './src/assets/icons/tab4On.svg';
import primaryColors from './src/style/primaryColors.ts';
import {globalStyles} from './src/style/textStyles.ts';

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// import SplashScreen from 'react-native-splash-screen';
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let IconComponent;
          // 아이콘 선택 로직은 이전과 동일
          if (route.name === 'Home') {
            IconComponent = focused ? Tab1SvgOn : Tab1Svg;
          } else if (route.name === 'Find') {
            IconComponent = focused ? Tab2SvgOn : Tab2Svg;
          } else if (route.name === 'Likes') {
            IconComponent = focused ? Tab3SvgOn : Tab3Svg;
          } else if (route.name === 'MyPage') {
            IconComponent = focused ? Tab4SvgOn : Tab4Svg;
          }
          return <IconComponent />;
        },
        tabBarLabel: (() => {
          switch (route.name) {
            case 'Home':
              return '홈';
            case 'Find':
              return '팝업 찾기';
            case 'Likes':
              return '즐겨 찾기';
            case 'MyPage':
              return '마이 페이지';
            default:
              return route.name;
          }
        })(),
        tabBarActiveTintColor: primaryColors.blue, // 활성 탭 텍스트 색상
        tabBarInactiveTintColor: primaryColors.font, // 비활성 탭 텍스트 색상
        tabBarStyle: {
          height: 70, // 바텀 네비게이션 바의 높이 조정
          paddingBottom: 5, // 아이콘과 텍스트 사이의 패딩 조정
          paddingTop: 5, // 상단 패딩 조정
          borderTopLeftRadius: 25, // 왼쪽 상단 모서리 둥글게
          borderTopRightRadius: 25, // 오른쪽 상단 모서리 둥글게
          position: 'absolute', // 필요에 따라 추가
        },
        tabBarLabelStyle: globalStyles.labelPrimary,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="SignInEmail"
        component={SignInEmailScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('Main')} />
          ),
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
          },
          headerShadowVisible: false,
          headerShown: true,
        })}
      />
      <AuthStack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <AuthStack.Screen
        name="SignInPassword"
        component={SignInPasswordScreen}
        options={({navigation}) => ({
          headerTitle: '로그인',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignInEmail')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({navigation}) => ({
          headerTitle: '회원가입',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignInEmail')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen
        name="NicknameSetting"
        component={NickNameSettingScreen}
        options={({navigation}) => ({
          headerTitle: '닉네임 설정',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen
        name="SignUpSucceed"
        component={SignUpSucceedScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="ServiceInfo"
        component={ServiceInfoScreen}
        options={({navigation}) => ({
          headerTitle: '서비스 이용 약관',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen
        name="ProtectInfo"
        component={ProtectInfoScreen}
        options={({navigation}) => ({
          headerTitle: '개인 정보 보호 정책',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen name="PasswordFind" component={PasswordFindScreen} />
      <AuthStack.Screen
        name="Preference"
        component={PreferenceScreen}
        options={({navigation}) => ({
          headerTitle: '나의 취향 설정하기',
          headerLeft: () => '',
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
    </AuthStack.Navigator>
  );
}

export type LoggedInParamList = {
  DetailScreen: {storeId: string}; // 특정 팝업 스토어 상세 페이지
  FindScreen: undefined;
  HomeScreen: undefined;
  LikesScreen: undefined;
  MyPageScreen: undefined;
};

export type RootStackParamList = {
  SignInEmailScreen: undefined;
  SignInPasswordScreen: undefined;
  SignUpScreen: undefined;
  SignUpSucceedScreen: undefined;
  NickNameScreen: undefined;
  PasswordFindScreen: undefined;
  PreferenceCategoryScreen: undefined;
  PreferenceInterestScreen: undefined;
  PreferenceWhoScreen: undefined;
};

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log(isLoggedIn);
  const [isSplashScreenVisible, setIsSplashScreenVisible] =
    React.useState(true);
  // 예를 들어, 앱이 로딩되고 필요한 데이터를 불러온 후 스플래시 스크린을 숨기는 로직을 구현
  useEffect(() => {
    const loadDataAsync = async () => {
      // 필요한 데이터 로딩 로직 구현
      // 예: 사용자 세션 확인, 초기 설정 불러오기 등

      // 데이터 로딩 완료 후 스플래시 스크린 숨김
      setIsSplashScreenVisible(false);
    };

    loadDataAsync();
  }, []);

  if (isSplashScreenVisible) {
    // 스플래시 스크린이 활성화되어 있으면, SplashScreen 컴포넌트를 렌더링
    return <SplashScreen />;
  }
  // return (
  //   <MainStack.Navigator screenOptions={{headerShown: false}}>
  //     <MainStack.Screen name="Auth" component={AuthStackNavigator} />
  //     <MainStack.Screen name="Main" component={MainTabNavigator} />
  //   </MainStack.Navigator>
  // );

  // 홈쪽 UI 구현 위한 !isLoggedIn
  return !isLoggedIn ? (
    // 로그인이 되어 있다면 메인 탭 네비게이터를 표시
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Main" component={MainTabNavigator} />
    </MainStack.Navigator>
  ) : (
    // 로그인이 되어 있지 않다면 인증 스택 네비게이터를 표시
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Auth" component={AuthStackNavigator} />
    </MainStack.Navigator>
  );
}

export default AppInner;
