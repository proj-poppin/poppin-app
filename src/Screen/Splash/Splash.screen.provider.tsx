import React, {createContext, useContext, useReducer} from 'react';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  doesAppMeetRequiredVersion,
  getEncryptedStorage,
  getStorage,
  getStringKeyStorage,
  setEncryptedStorage,
  setStorage,
} from 'src/Util';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {useAppStore} from '../../Zustand/App/app.zustand';
import {useDynamicServiceConstant} from '../../Zustand/App/service.dynamic.constant.zustand';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosLoginWithAccessToken} from '../../Axios/Auth/auth.axios';
import {Alert} from 'react-native';
import {axiosAutoLogin} from '../../Axios/axios.core';
import EncryptedStorage from 'react-native-encrypted-storage';

/** */
type SplashScreenState = {
  loading: boolean;
};

/** */
const initialSplashScreenState: SplashScreenState = {
  loading: true,
};

/** */
function splashScreenReducer(
  splashScreenState: SplashScreenState,
  action: {type: string; payload: Partial<SplashScreenState>},
): SplashScreenState {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {...splashScreenState, ...action.payload};
  }
  return splashScreenState;
}

/** */
type SplashScreenContextType = SplashScreenState & {
  bootstrap: () => Promise<void>;
};

/** */
const SplashScreenContext = createContext<SplashScreenContextType | undefined>(
  undefined,
);

/** */
export function useSplashScreenContext() {
  const context = useContext(SplashScreenContext);
  if (context === undefined) {
    throw new Error('스플래시 화면 콘텍스트가 제공되지 않았습니다.');
  }
  return context;
}

/** */
export function SplashScreenProvider({
  screenProps,
  children,
}: {
  screenProps: NativeStackScreenProps<AppStackProps, 'SplashScreen'>;
  children: React.ReactNode;
}) {
  const [splashScreenState, dispatch] = useReducer(
    splashScreenReducer,
    initialSplashScreenState,
  );

  /** */
  function updateStatus(state: Partial<SplashScreenState>) {
    dispatch({type: 'UPDATE_STATE', payload: state});
  }

  // function appsFlyerSetting() {

  //   let deepLinkFlag = false

  //   appsFlyer.onInstallConversionData(
  //     res => {
  //       //  Alert.alert('onInstallConversionData', JSON.stringify(res));
  //     },
  //   );

  //   appsFlyer.onInstallConversionFailure(res => {

  //   });

  //   // OneLink ID를 설정
  //   appsFlyer.setAppInviteOneLinkID('Ui2T', () => { });

  //   appsFlyer.onDeepLink(res => {
  //     //     //console.log(res);
  //     Alert.alert('onDeepLink', JSON.stringify(res));
  //     if (res.isDeferred === true) {
  //       if (res.data.deep_link_value) {
  //         const deep_link_value = JSON.parse(res.data.deep_link_value)

  //         if (deep_link_value.researchId) {

  //           deepLinkFlag = true

  //           screenProps.navigation.navigate('ResearchDetailScreen', {
  //             researchId: deep_link_value.researchId,
  //             sharerId: deep_link_value.sharerId,
  //           });

  //         }

  //       }

  //     }
  //   })

  //   // //* AppsFlyer SDK 초기화
  //   appsFlyer.initSdk(
  //     {
  //       devKey: 'trYFVCQL4CSnwYeifCJNxa',
  //       isDebug: true,
  //       appId: '1640390682',
  //       onInstallConversionDataListener: true,
  //       onDeepLinkListener: true,
  //       timeToWaitForATTUserAuthorization: 60,
  //     },
  //     result => {
  //       // console.log(result);
  //       // Alert.alert('AppsFlyer', JSON.stringify(result));
  //     },
  //     error => {
  //       // console.error(error);
  //       // Alert.alert('AppsFlyer', JSON.stringify(error));
  //     },
  //   );

  //   appsFlyer.startSdk();

  //   return deepLinkFlag

  // }

  /**
   * 앱 실행 시 자동 호출합니다.
   */
  async function bootstrap() {
    dispatch({type: 'UPDATE_STATE', payload: {loading: true}});

    /** 저장된 access token */
    const accessToken = await getEncryptedStorage('ACCESS_TOKEN');
    /** 웰컴 화면을 봤는지 여부 */
    const sawWelcomeScreen = await getStringKeyStorage('saw-welcome-screen');
    if (accessToken === '') {
      useUserStore.getState().setNonMemberUserInfo();
    }
    /** 먼저 자동 로그인부터 처리합니다 */
    const userStatus = await handleAutoLogin();

    // // Check if userStatus is valid; exit early if it fails
    // if (!userStatus) {
    //   console.error('Auto-login failed');
    //   updateStatus({loading: false});
    //   return;
    // }

    const loadDataResult = await Promise.all([
      setInAppMessagingVisible(),
      useAppStore.getState().getDynamicConstants(),
      useAppStore.getState().loadInitialData(),
    ]).then(([_, dynamicConstants, loadInitialData]) => {
      return {loadInitialData, userStatus};
    });

    //* Check if initial data fetch was successful
    if (loadDataResult.loadInitialData === false) {
      updateStatus({loading: false});
      return;
    }

    //* Mark as bootstrapped in appStore
    useAppStore.getState().setBootStrapped(true);

    /** 현재 앱이 최신 버전인지 여부 */
    const isAppRecent = doesAppMeetRequiredVersion();

    //* 1) 서비스 상태 확인 후 ServiceStatusScreen으로 이동
    if (!useDynamicServiceConstant.getState().SERVICE_STATUS.available) {
      screenProps.navigation.replace('ServiceStatusScreen', {});
      return;
    }

    //* 2) 앱이 최소 요구 버전 미충족시 ForceUpdateScreen으로 이동
    if (!isAppRecent) {
      screenProps.navigation.replace('ForceUpdateScreen', {});
      return;
    }

    //* 3) 성공적인 데이터 수신 후 홈 랜딩 화면으로 이동
    if (loadDataResult.loadInitialData) {
      screenProps.navigation.replace('LandingBottomTabNavigator', {
        HomeLandingScreen: {},
        PopupSearchLandingScreen: {},
        PopupLikesLandingScreen: {},
        MyPageLandingScreen: {},
      });
    }

    /** */
    async function setInAppMessagingVisible() {
      await inAppMessaging().setMessagesDisplaySuppressed(false);
    }
  }

  /** */
  async function handleAutoLogin() {
    // await setEncryptedStorage('ACCESS_TOKEN', '');
    // await setEncryptedStorage('REFRESH_TOKEN', '');

    const refreshToken = await getEncryptedStorage('REFRESH_TOKEN');

    if (
      refreshToken === null ||
      refreshToken === '' ||
      typeof refreshToken === 'undefined'
    ) {
      console.log('refreshToken is null');
      useUserStore.getState().setNonMemberUserInfo();
      return;
    }

    const loginData = await axiosAutoLogin(refreshToken!);

    if (loginData !== null) {
      await setStorage('EMAIL', loginData.data.user.email);
      await useUserStore.getState().setLoggedInUserInfo(loginData);
      return {success: true};
    }
    return;
  }

  const value: SplashScreenContextType = {
    ...splashScreenState,
    bootstrap,
  };

  return (
    <SplashScreenContext.Provider value={value}>
      {children}
    </SplashScreenContext.Provider>
  );
}
