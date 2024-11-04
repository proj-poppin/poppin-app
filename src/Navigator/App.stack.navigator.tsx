import React, {useRef, useEffect} from 'react';
import {AppState, Linking} from 'react-native';
import {
  NavigationProp,
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {
  kakaoLinkingOption,
  KakaoLinkScreen,
  KakaoLinkScreenProps,
} from 'src/Screen/App/KakaoLink/App.kakaoLink.screen';
import {SplashScreen, SplashScreenProps} from '../Screen/Splash/Splash.screen';
import shallow from 'zustand/shallow';
import {useAppStore} from '../Zustand/App/app.zustand';
import {PushNotification} from '../Object/Type/app.type';
import {axiosCheckNotification} from '../Axios/User/user.patch.axios';
import {Destination, navigateInAppScreen, showNotificationToast} from '../Util';
import {WEB_ONELINK_URL_PREFIX} from '../Constant/app.constant';
import {
  ForceUpdateScreen,
  ForceUpdateScreenProps,
} from 'src/Screen/App/Update/App.forceUpdate.screen';
import {
  LandingBottomTabNavigator,
  LandingBottomTabProps,
} from './Landing.bottomTab.navigator';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../Config';
import {
  ServiceStatusScreen,
  ServiceStatusScreenProps,
} from '../Screen/App/ServiceStatus/App.serviceStatus.screen';
import {AlarmNotificationScreenProps} from '../Screen/Notification/Alarm.notification.screen';
import {
  AlarmNotificationDetailScreen,
  AlarmNotificationDetailScreenProps,
} from 'src/Screen/Notification/Detail/Mypage.notification.detail.screen';
import {AlarmNotificationTabScreen} from '../Screen/Notification/Alarm.notification.tab.screen';
import {
  PopupDetailScreen,
  PopupDetailScreenProps,
} from '../Screen/Popup/Detail/Popup.detail.screen';

import {PopupDetailReportScreen} from 'src/Screen/Popup/Report/Popup.detail.report.screen';

import '../Screen/Popup/Landing/Popup.landing.screen';
import PopupDetailEditScreen from '../Screen/Popup/Report/Popup.detail.edit.screen';
import PopupDetailReviewWriteScreen from '../Screen/Popup/Review/Popup.detail.review.write.screen';
import {
  AuthLandingScreen,
  AuthLandingScreenProps,
} from '../Screen/Auth/Landing/Auth.landing.Screen';
import {
  SignupScreen,
  SignupScreenProps,
} from '../Screen/Auth/Signup/Auth.signup.screen';
import {
  LoginScreen,
  LoginScreenProps,
} from '../Screen/Auth/Login/Auth.login.screen';
import ReportScreen, {
  ReportScreenProps,
} from '../Screen/MyPage/Report/Mypage.report.screen';
import {
  AuthPreferenceScreen,
  AuthPreferenceScreenProps,
} from '../Screen/Auth/Preference/Auth.preference.screen';

/**
 * 앱에서 사용되는 모든 스크린의 속성들을 정의합니다.
 * 이 type의 key에 해당하는 값은 AppStack.Screen의 name과 일치해야 합니다.
 * @author 도형
 */
export type AppStackProps = {
  // 앱 시작시 보이는 SplashScreen
  SplashScreen: SplashScreenProps;
  // 앱 업데이트 강제 페이지
  ForceUpdateScreen: ForceUpdateScreenProps;

  AuthLandingScreen: AuthLandingScreenProps;

  LoginScreen: LoginScreenProps;

  SignupScreen: SignupScreenProps;

  // 각 서비스별 랜딩 페이지 네비게이터
  LandingBottomTabNavigator: LandingBottomTabProps;

  ServiceStatusScreen: ServiceStatusScreenProps;

  KakaoLinkScreen: KakaoLinkScreenProps;

  AlarmNotificationScreen: AlarmNotificationScreenProps;

  AlarmNotificationDetailScreen: AlarmNotificationDetailScreenProps;

  PopupDetailScreen: PopupDetailScreenProps;

  PopupDetailReportScreen: PopupDetailScreenProps;

  PopupDetailEditScreen: PopupDetailScreenProps;

  PopupDetailReviewWriteScreen: PopupDetailScreenProps;

  ReportScreen: ReportScreenProps;

  AuthPreferenceScreen: AuthPreferenceScreenProps;
};

const AppStack = createNativeStackNavigator<AppStackProps>();

/**
 * 앱의 모든 화면들이 쌓이는 Stack Navigator입니다.
 * @author 도형
 */

export function AppStackNavigator() {
  //* Firebase Analytics - Screen 변경 감지용 Ref
  const navigationRef = useNavigationContainerRef();

  const routeNameRef = useRef<string>();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
      linking={kakaoLinkingOption}>
      <AppStackScreen />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

const AppStackScreen = () => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const {setInitialDestination, getDynamicConstants} = useAppStore(
    state => ({
      setInitialDestination: state.setInitialDestination,
      getDynamicConstants: state.getDynamicConstants,
    }),
    shallow,
  );

  /**
   * 앱 상태 변경 시 (이탈/복귀) 호출되는 함수입니다. (완전 종료가 아니라 background 상태 진입/복귀)
   * 상태 변경 시 firebase 로그를 남기고,
   * 앱 복귀 후에는 accessedAtLogs 기록을 서버에 추가하며 앱 상수를 다시 받아옵니다. (이 때 앱이 최신 버전인지 여부를 확인합니다)
   */
  const handleAppStateChange = async (appState: string) => {
    // makeFirebaseLogEvent(APP_LOGS.open_app);
    // if (appState === 'active') {
    //   makeFirebaseLogEvent(APP_LOGS.return_app);
    //   if (useUserStore.getState().isLoggedIn()) {
    //     axiosReportReturnApp();
    //   }
    //   await getDynamicConstants();
    //   //* 만약 새로 받아온 앱 최소 요구 버전을 충족하지 못하는 경우, 강제 업데이트 페이지로 이동합니다.
    //   if (!doesAppMeetRequiredVersion()) {
    //     navigation.navigate('ForceUpdateScreen', {});
    //   }
    //   //* 만약 새로 받아온 서비스 상태가 사용 불가인 경우, 서비스 상태 안내 페이지로 이동합니다.
    //   if (
    //     useDynamicServiceConstant.getState().SERVICE_STATUS.available === false
    //   ) {
    //     navigation.navigate('ServiceStatusScreen', {});
    //   }
    // }
    // if (appState === 'background') {
    //   makeFirebaseLogEvent(APP_LOGS.goto_background);
    // }
  };

  useEffect(() => {
    const eventListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => eventListener.remove();
  }, []);

  //* 푸시 알림 처리 로직
  //* 공식 문서: https://rnfirebase.io/messaging/notifications#handling-interaction
  /**
   * 공식 문서와는 다르게 loading 상태에 따라 Navigator 를 랜더링 하지 않는 로직을 구현하지 않았습니다.
   * 공식 문서를 그대로 따라하는 경우, 앱이 꺼진 상태에서 카카오톡 공유하기를 통해 앱에 접근했을 때
   * navigator 가 존재하지 않아서 화면으로 이동하지 못하는 문제가 발생하기 때문입니다.
   */
  useEffect(() => {
    //* background 상태에서 푸시 알림으로 진입한 경우: 곧바로 해당 화면으로 이동
    messaging().onNotificationOpenedApp(remoteMessage => {
      const pushNotification = remoteMessage as unknown as PushNotification;
      axiosCheckNotification(pushNotification.data.notificationId);
      // makeFirebaseLogEvent(APP_LOGS.goto_app_by_push(pushNotification.data));
      // navigateInAppScreen({navigation, destination: pushNotification.data});
    });

    //* 앱이 완전히 종료되었던 상태에서 알림으로 진입한 경우:
    //* 곧바로 해당 화면으로 이동하지 않고, 대신 initialDestination 을 설정합니다.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const pushNotification = remoteMessage as unknown as PushNotification;
          axiosCheckNotification(pushNotification.data.notificationId);
          // makeFirebaseLogEvent(
          //   APP_LOGS.open_app_by_push(pushNotification.data),
          // );
          setInitialDestination(pushNotification.data);
        }
      });

    //* foreground 상태에서 푸시 알람을 받은 경우: 상단에 토스트메세지를 띄웁니다
    const unsubscribe = messaging().onMessage(async pushNotification => {
      const message = pushNotification as unknown as PushNotification;
      if (message.notification) {
        const {title, body} = message.notification;
        const data = message.data;
        showNotificationToast({
          text1: title,
          text2: body,
          props: {detail: data.detail, type: data.type, destination: data},
        });
      }
    });

    return unsubscribe;
  }, []);

  const parseUrlParams = (url: string) => {
    const params: {[key: string]: string} = {};
    const queryString = url.split('?')[1];
    if (!queryString) {
      return params;
    }

    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });

    return params;
  };

  // oneLink 처리 로직
  const handleUrl = async (url: string, navigateDirectly: boolean) => {
    try {
      // URL에서 불필요한 prefix 제거
      const dynamicLinkUrl = decodeURI(url).replace(WEB_ONELINK_URL_PREFIX, '');

      // URL에서 필요한 파라미터 추출
      // const urlParams = new URLSearchParams(dynamicLinkUrl.split('?')[1]);

      const urlParams = parseUrlParams(dynamicLinkUrl);

      // deep_link_value 파라미터 추출 및 JSON 파싱
      const deepLinkValue = urlParams.deep_link_value;
      if (deepLinkValue) {
        const destination = JSON.parse(
          decodeURIComponent(deepLinkValue),
        ) as Destination;

        // makeFirebaseLogEvent(APP_LOGS.open_app_by_dynamicLink(destination));

        if (navigateDirectly) {
          navigateInAppScreen({navigation, destination});
        } else {
          setInitialDestination(destination);
        }
      }
    } catch (error) {
      console.error('Failed to handle deep link:', error);
    }
  };

  //* oneLink 처리 로직
  useEffect(() => {
    const handleInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url !== null) {
        handleUrl(url, false);
      }
    };

    handleInitialUrl();

    const linkingListener = Linking.addEventListener('url', ({url}) => {
      handleUrl(url, true);
    });

    return () => {
      linkingListener.remove();
    };
  }, [navigation]);

  return (
    <AppStack.Navigator
      //* 모든 앱 화면에 아래 옵션을 적용합니다.
      //* 스크린 헤더 감춤, 화면 전환 시 오른쪽에서 왼쪽으로 애니메이션 적용
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {/* 앱 시작 Splash Screen */}
      <AppStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{animation: 'none'}}
      />
      {/* 앱 업데이트 강제 페이지 */}
      <AppStack.Screen
        name="ForceUpdateScreen"
        component={ForceUpdateScreen}
        //! 업데이트 강제 페이지에서 iOS 뒤로 가기 제스쳐를 방지합니다.
        options={{gestureEnabled: false}}
      />
      <AppStack.Screen name="ReportScreen" component={ReportScreen} />

      {/* 서비스 상태 페이지 */}
      <AppStack.Screen
        name="ServiceStatusScreen"
        component={ServiceStatusScreen}
        //! 서비스 상태 페이지에서 iOS 뒤로 가기 제스쳐를 방지합니다.
        options={{gestureEnabled: false}}
      />
      {/* 카카오톡 공유하기 링크를 통해 앱 접근 시 자동으로 이동하는 Screen */}
      <AppStack.Screen name="KakaoLinkScreen" component={KakaoLinkScreen} />
      {/* Auth 관련 Screen 그룹 */}
      <AppStack.Group>
        <AppStack.Screen
          name="AuthLandingScreen"
          component={AuthLandingScreen}
        />
        <AppStack.Screen name="LoginScreen" component={LoginScreen} />
        <AppStack.Screen name="SignupScreen" component={SignupScreen} />
        <AppStack.Screen
          name="AuthPreferenceScreen"
          component={AuthPreferenceScreen}
        />
        {/*<AppStack.Screen*/}
        {/*  name="AuthPasswordResetScreen"*/}
        {/*  component={AuthPasswordResetScreen}*/}
        {/*/>*/}
        {/*<AppStack.Screen name="LoginScreen" component={LoginScreen} />*/}
        {/*<AppStack.Screen name="SignupScreen" component={SignupScreen} />*/}
        {/*<AppStack.Screen*/}
        {/*  name="AuthPasswordResetScreen"*/}
        {/*  component={AuthPasswordResetScreen}*/}
        {/*/>*/}
      </AppStack.Group>
      {/* 랜딩 페이지 BottomTab Navigator */}
      <AppStack.Screen
        name="LandingBottomTabNavigator"
        component={LandingBottomTabNavigator}
        options={{animation: 'none'}}
      />
      <AppStack.Group>
        <AppStack.Screen
          //* 알림 페이지
          name={'AlarmNotificationScreen'}
          component={AlarmNotificationTabScreen}
        />
        <AppStack.Screen
          //* 알림 상세 페이지
          name={'AlarmNotificationDetailScreen'}
          component={AlarmNotificationDetailScreen}
        />
      </AppStack.Group>
      <AppStack.Group>
        <AppStack.Screen
          name={'PopupDetailScreen'}
          component={PopupDetailScreen}
        />
        <AppStack.Screen
          name={'PopupDetailEditScreen'}
          component={PopupDetailEditScreen}
        />
        <AppStack.Screen
          name={'PopupDetailReportScreen'}
          component={PopupDetailReportScreen}
        />
        <AppStack.Screen
          name={'PopupDetailReviewWriteScreen'}
          component={PopupDetailReviewWriteScreen}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};
