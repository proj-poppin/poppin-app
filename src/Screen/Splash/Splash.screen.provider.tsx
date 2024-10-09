import React, {createContext, useContext, useReducer} from 'react';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  doesAppMeetRequiredVersion,
  getEncryptedStorage,
  getStorage,
  getStringKeyStorage,
  setStorage,
} from 'src/Util';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {useAppStore} from '../../Zustand/App/app.zustand';
import {useDynamicServiceConstant} from '../../Zustand/App/service.dynamic.constant.zustand';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosLoginWithAccessToken} from '../../Axios/Auth/auth.axios';
import {Alert} from 'react-native';

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

    /** 최초 정보 수신 성공 여부만 반환 받습니다. */
    const result = await Promise.all([
      setInAppMessagingVisible(),
      useAppStore.getState().getDynamicConstants(),
      useAppStore.getState().loadInitialData(),
      handleAutoLogin(accessToken),
    ]).then(([_, __, loadInitialData, userStatus]) => {
      return {loadInitialData, userStatus};
    });

    //* 최초 정보를 받아오는 데 실패한 경우:
    //* loading 플래그를 false 로 설정합니다
    if (result === undefined || result.loadInitialData === false) {
      updateStatus({loading: false});
      return;
    }

    //* 최초 정보를 받아오는 데 성공한 경우:
    //* appStore 의 bootstrapped 값을 true 로 설정합니다.
    useAppStore.getState().setBootStrapped(true);
    /** 현재 앱이 최신 버전인지 여부 */
    const isAppRecent = doesAppMeetRequiredVersion();

    //* 1) 앱 초기 정보를 가져왔을 때 현재 서비스가 가능한 상태가 아닌 경우: 서비스 상태 안내 화면으로 이동합니다.
    if (!useDynamicServiceConstant.getState().SERVICE_STATUS.available) {
      screenProps.navigation.replace('ServiceStatusScreen', {});
      return;
    }
    //* 2) 앱 초기 정보를 가져왔을 때 최소 요구 버전을 충족하지 못하는 경우: 앱 강제 업데이트 화면으로 이동합니다.
    if (!isAppRecent) {
      screenProps.navigation.replace('ForceUpdateScreen', {});
      return;
    }
    //* 3) 앱이 최신 버전이고, 초기 데이터를 성공적으로 받아온 경우: 홈 랜딩 화면으로 이동합니다.
    if (result.loadInitialData) {
      screenProps.navigation.replace('LandingBottomTabNavigator', {
        HomeLandingScreen: {},
        PopupSearchLandingScreen: {},
        PopupLikesLandingScreen: {},
        MyPageLandingScreen: {},
      });

      // //* 4) 로그인한 적이 없고, 웰컴 화면도 본 적 없는 경우: 추가로 웰컴 화면으로 이동합니다.
      // if (
      //   (accessToken === null || accessToken === '') &&
      //   (sawWelcomeScreen === null || sawWelcomeScreen === 'false')
      // ) {
      //   screenProps.navigation.navigate('WelcomeScreen', {});
      // }

      // //* 5) 자동 로그인한 유저가 다중 계정을 사용하는 경우: 추가로 다중 계정 선택 페이지로 이동합니다. (팝핀은 다중허용 X)
      // if (result.userStatus) {
      //   screenProps.navigation.navigate('MultiAccountScreen', {
      //     jwt: result.userStatus.jwt,
      //   });
      // }
    }
    /** */
    async function setInAppMessagingVisible() {
      //* #SETTING #Firebase #InAppMessaging Firebase 인앱 메세지가 보이도록 설정합니다.
      await inAppMessaging().setMessagesDisplaySuppressed(false);
    }
  }
  /** */
  async function handleAutoLogin(accessToken: string | null) {
    //* accessToken 가 저장되어 있지 않거나 (로그인한 적 없음), 빈 문자열인 경우 (로그아웃 함):
    //* 비회원 상태로 로그인합니다.
    if (accessToken === null || accessToken === '') {
      useUserStore.getState().setNonMemberUserInfo();
      return;
    }

    //* 자동 로그인 조건을 충족하는 경우엔 JWT 를 이용해 자동 로그인합니다.
    const loginData = await axiosLoginWithAccessToken(accessToken);
    if (loginData !== null) {
      await setStorage('EMAIL', loginData.data.user.email);
      await useUserStore.getState().setLoggedInUserInfo(loginData);
      return {success: true};
      //* 이 때, 로그인 한 유저가 다중 계정을 사용 중인 경우 'MULTI_ACCOUNT' 를 반환합니다.(팝핀은 다중허용 X)
      // if (
      //   loginData.userInfo.user.multiAccountIds &&
      //   loginData.userInfo.user.multiAccountIds.length > 1
      // ) {
      //   return {jwt: loginData.jwt};
      // }
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
