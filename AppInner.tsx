import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer.ts';
import FindScreen from './src/screens/find/FindScreen.tsx';
import HomeScreen from './src/screens/home/HomeScreen.tsx';
import LikesScreen from './src/screens/likes/LikesScreen.tsx';
import MyPageScreen from './src/screens/myPage/MyPageScreen.tsx';
import NickNameSettingScreen from './src/screens/sign/NicknameSettingScreen.tsx';
import FirstPasswordResetScreen from './src/screens/password/FirstPasswordResetScreen.tsx';
import SignInEmailScreen from './src/screens/sign/SignInEmailScreen.tsx';
import SignInPasswordScreen from './src/screens/sign/SignInPasswordScreen.tsx';
import SignUpScreen from './src/screens/sign/SignUpScreen.tsx';
import SignUpSucceedScreen from './src/screens/sign/SignUpSucceedScreen.tsx';

import CloseSvgIcon from './src/assets/icons/close.svg';
import LeftSvgIcon from './src/assets/icons/left.svg';
import ProtectInfoScreen from './src/screens/sign/ProtectInfoScreen.tsx';
import ServiceInfoScreen from './src/screens/sign/ServiceInfoScreen.tsx';

import Tab1Svg from './src/assets/icons/tab/tab1.svg';
import Tab2Svg from './src/assets/icons/tab/tab2.svg';
import Tab3Svg from './src/assets/icons/tab/tab3.svg';
import Tab4Svg from './src/assets/icons/tab/tab4.svg';
import Tab1SvgOn from './src/assets/icons/tab/tab1On.svg';
import Tab2SvgOn from './src/assets/icons/tab/tab2On.svg';
import Tab3SvgOn from './src/assets/icons/tab/tab3On.svg';
import Tab4SvgOn from './src/assets/icons/tab/tab4On.svg';
import primaryColors from './src/style/primaryColors.ts';
import {globalStyles} from './src/style/textStyles.ts';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen.tsx';
import {Pressable, Text} from 'react-native';
import SecondPasswordResetScreen from './src/screens/password/SecondPasswordResetScreen.tsx';
import MyProfileEditScreen from './src/screens/myPage/ProfileEditScreen.tsx';
import MemberDeleteScreen from './src/screens/myPage/MemberDeleteScreen.tsx';
import PasswordChangeScreen from './src/screens/myPage/PasswordChangeScreen.tsx';
import GoBackSvg from './src/assets/icons/goBack.svg';
import PreferenceSettingScreen from './src/screens/myPage/PreferenceSettingScreen.tsx';
import FAQScreen from './src/screens/myPage/FAQScreen.tsx';
import PolicyScreen from './src/screens/myPage/PolicyScreen.tsx';
import KeywordAlarmScreen from './src/screens/myPage/KeywordAlarmScreen.tsx';
import UserRegisterScreen from './src/screens/myPage/UserRegisterScreen.tsx';

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
              return '관심';
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
        tabBarLabelStyle: globalStyles.bottomNavigationTab, // color 설정은 X
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
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="SignInEmail"
        component={SignInEmailScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                console.log('replacing to MainTabNavigator');
                navigation.replace('MainTabNavigator');
              }}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              style={{padding: 10}}>
              <CloseSvgIcon />
            </Pressable>
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
            <Pressable
              onPress={() => {
                console.log('Navigating back to SignInEmail');
                navigation.navigate('SignInEmail');
              }}
              style={{padding: 5}}>
              <LeftSvgIcon />
            </Pressable>
          ),

          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <AuthStack.Screen
        name="FirstPasswordReset"
        component={FirstPasswordResetScreen}
        options={({navigation}) => ({
          headerTitle: '비밀번호 재설정', // 헤더 제목 설정
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.replace('SignInPassword')}
              style={{padding: 10}}>
              <CloseSvgIcon />
            </Pressable>
          ),
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0, // Android에서 헤더 경계선 제거
            shadowOpacity: 0, // iOS에서 헤더 그림자 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 보이지 않도록 설정
          headerShown: true, // 헤더 보이기 설정
        })}
      />
      <AuthStack.Screen
        name="SecondPasswordReset"
        component={SecondPasswordResetScreen}
        options={({navigation}) => ({
          headerTitle: '비밀번호 재설정', // 헤더 제목 설정
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.replace('SignInPassword')}
              style={{padding: 10}}>
              <CloseSvgIcon />
            </Pressable>
          ),
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0, // Android에서 헤더 경계선 제거
            shadowOpacity: 0, // iOS에서 헤더 그림자 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 보이지 않도록 설정
          headerShown: true, // 헤더 보이기 설정
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
      <AuthStack.Screen
        name="PreferenceSetting"
        component={PreferenceSettingScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '취향 설정하기',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                console.log('replacing to MainTabNavigator');
                navigation.goBack();
              }}
              style={{padding: 10}}>
              <CloseSvgIcon />
            </Pressable>
          ),
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
          },
          headerShadowVisible: false,
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
  OnboardingScreen: undefined;
};

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        // 서버 통신을 시뮬레이션하는 부분
        // 예: 사용자 세션 확인, 초기 설정 불러오기 등
        await new Promise(resolve => setTimeout(resolve, 4000)); // 서버로부터 데이터 로딩 시간을 4초로 가정

        // 데이터 로딩이 완료되면 스플래시 스크린 숨기기
        setIsSplashScreenVisible(false);
      } catch (error) {
        console.error('Data loading failed:', error);
        // 오류 발생 시에도 스플래시 스크린을 숨깁니다.
        setIsSplashScreenVisible(false);
      }
    };

    loadDataAsync();
  }, []);

  if (isSplashScreenVisible) {
    // 스플래시 스크린이 활성화되어 있으면, SplashScreen 컴포넌트를 렌더링
    // return <SplashScreen />;
  }

  // 로그인 상태에 따라 적절한 네비게이션 스택을 렌더링
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        // 로그인한 사용자를 위한 스크린
        <>
          <MainStack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
          />
          {/* 로그인 상태와 무관하게 접근 가능한 스크린을 추가 */}
          <MainStack.Screen
            name="ProfileEdit"
            component={MyProfileEditScreen}
          />
          <MainStack.Screen name="FAQ" component={FAQScreen} />
        </>
      ) : (
        // 로그인하지 않은 사용자를 위한 스크린
        <>
          <MainStack.Screen
            name="Auth"
            screenOptions={{headerShown: false}}
            component={AuthStackNavigator}
          />
          {/* 로그인 상태와 무관하게 접근 가능한 스크린을 추가 */}
          <MainStack.Screen
            name="ProfileEdit"
            component={MyProfileEditScreen}
            options={({navigation}) => ({
              headerShown: true,
              title: '프로필 설정',
              headerRight: () => (
                <Text onPress={() => navigation.goBack()}>
                  <Text style={{color: primaryColors.blue, marginRight: 10}}>
                    완료
                  </Text>
                </Text>
              ),
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              headerShadowVisible: false, //⭐️ Appbar(Header)에서 gray 지우기 ⭐️
            })}
          />
          <AuthStack.Screen
            name="PasswordChange"
            component={PasswordChangeScreen}
            options={{
              headerShadowVisible: false, //⭐️ Appbar(Header)에서 gray 지우기 ⭐️
            }}
          />
          <MainStack.Screen
            name="FAQ"
            component={FAQScreen}
            options={({navigation}) => ({
              headerShadowVisible: false, // Appbar(Header)에서 그림자 제거
              headerShown: true,
              title: '문의하기/FAQ', // 헤더 타이틀 설정
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              // 기타 헤더 스타일링 옵션
            })}
          />
          <AuthStack.Screen
            name="KeywordAlarm"
            component={KeywordAlarmScreen}
            options={({navigation}) => ({
              headerShadowVisible: false, // Appbar(Header)에서 그림자 제거
              headerShown: true,
              title: '키워드 알림', // 헤더 타이틀 설정
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              // 기타 헤더 스타일링 옵션
            })}
          />
          <AuthStack.Screen
            name="UserRegister"
            component={UserRegisterScreen}
            options={({navigation}) => ({
              headerShadowVisible: false, // Appbar(Header)에서 그림자 제거
              headerShown: true,
              title: '이용자 제보하기', // 헤더 타이틀 설정
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              gestureEnabled: false, // 뒤로가기 제스처 비활성화
              // 기타 헤더 스타일링 옵션
            })}
          />
          <AuthStack.Screen
            name="Policy"
            component={PolicyScreen}
            options={({navigation}) => ({
              headerShadowVisible: false, // Appbar(Header)에서 그림자 제거
              headerShown: true,
              title: '이용 약관 및 정책', // 헤더 타이틀 설정
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              // 기타 헤더 스타일링 옵션
            })}
          />
          <AuthStack.Screen
            name="MemberDelete"
            component={MemberDeleteScreen}
            options={({navigation}) => ({
              headerShadowVisible: false, // Appbar(Header)에서 그림자 제거
              headerShown: true,
              title: '회원 탈퇴', // 헤더 타이틀 설정
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <GoBackSvg />
                </Pressable>
              ),
              // 기타 헤더 스타일링 옵션
            })}
          />
          <AuthStack.Screen
            name="PreferenceSetting"
            component={PreferenceSettingScreen}
            options={({navigation}) => ({
              headerShown: true,
              headerTitle: '취향 설정하기',
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    console.log('replacing to MainTabNavigator');
                    navigation.goBack();
                  }}
                  style={{padding: 10}}>
                  <CloseSvgIcon />
                </Pressable>
              ),
              headerStyle: {
                borderBottomWidth: 0,
                elevation: 0, // For Android
                shadowOpacity: 0, // For iOS
              },
              headerShadowVisible: false,
            })}
          />
        </>
      )}
    </MainStack.Navigator>
  );
}

export default AppInner;
