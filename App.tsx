import * as React from 'react';
import {Provider} from 'react-redux';
import AppInner from './AppInner.tsx';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import appleAuth from '@invertase/react-native-apple-authentication';
import store from './src/store';
import LoadingScreen from './src/screens/splash/LoadingScreen.tsx';
import {Alert, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// Provider 바깥에서는 useSelector 사용불가(따로 빼서 거기에 +)

import {LocaleConfig} from 'react-native-calendars/src';

// 한국어 설정
LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

function App() {
  useEffect(() => {
    SplashScreen.hide(); // 앱 시작 시 SplashScreen 숨기기
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    // return appleAuth.onCredentialRevoked(async () => {
    //   console.warn(
    //     'If this function executes, User Credentials have been Revoked',
    //   );
    // });
    if (Platform.OS === 'ios' && appleAuth.isSupported) {
      // Apple 인증 실행 코드
    } else {
      // 지원하지 않는 경우의 처리 로직
      Alert.alert('안내', '애플로그인 기능은 iOS 기기에서만 사용 가능합니다.');
      console.log('애플 로그인은 iOS 13 이상에서만 지원됩니다.');
    }

    // TODO localStorage, AsyncStorage 등을 사용하여 온보딩 완료 여부를 저장하고 조회하는 로직을 구현.
    // 예: AsyncStorage.getItem('onboardingComplete').then(value => setIsOnboardingComplete(!!value));
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white', // 배경색을 흰색으로 설정
    },
  };

  // 리덕스 스토어의 로딩 상태(isLoading)에 따라 LoadingScreen이 전역적으로 표시되거나 숨겨지도록 함
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
              <AppInner />
              {/*<LoadingScreen />*/}
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
