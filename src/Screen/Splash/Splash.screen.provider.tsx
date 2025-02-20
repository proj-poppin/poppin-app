import React, {createContext, useContext, useReducer} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  doesAppMeetRequiredVersion,
  getEncryptedStorage,
  getStringKeyStorage,
  setStorage,
} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {axiosAutoLogin} from 'src/Axios/Auth/auth.axios';

/** */
type SplashScreenState = {
  loading: boolean;
};

/** */
const initialSplashScreenState: SplashScreenState = {
  loading: true,
};

/**
 * Partial을 사용하여 부분적인 상태 업데이트를 일괄적으로 허용합니다.
 * ex) dispatch({loading: false})
 * @author 도형
 */
function splashScreenReducer(
  state: SplashScreenState,
  updatedState: Partial<SplashScreenState>,
): SplashScreenState {
  return {...state, ...updatedState};
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
    dispatch(state);
  }

  /**
   * 앱 실행 시 자동 호출합니다.
   */
  async function bootstrap() {
    dispatch({loading: true});

    /** 저장된 access token */
    const accessToken = await getEncryptedStorage('ACCESS_TOKEN');
    /** 웰컴 화면을 봤는지 여부 */
    const sawWelcomeScreen = await getStringKeyStorage('saw-welcome-screen');
    if (accessToken === '') {
      useUserStore.getState().setNonMemberUserInfo();
    }

    /**
     * 앱 서비스 자체와 관련된 상수를 받아옵니다. 앱 버전, 앱 스토어 링크 등
     * 이후 AutoLogin 을 진행합니다.
     * */
    const result = await Promise.all([
      setInAppMessagingVisible(),
      useAppStore.getState().getDynamicConstants(),
      useAppStore.getState().loadInitialData(),
      handleAutoLogin(),
    ]).then(([_, __, loadInitialData, userStatus]) => {
      return {loadInitialData, userStatus};
    });

    //* 최초 정보를 받아오는 데 실패한 경우:
    //* loading 플래그를 false 로 설정합니다
    if (result === undefined || result.loadInitialData === false) {
      dispatch({loading: false});
      return;
    }

    //* 최초 정보를 받아오는 데 성공한 경우:
    //* appStore 의 bootstrapped 값을 true 로 설정합니다.
    useAppStore.getState().setBootStrapped(true);

    /** 현재 앱이 최신 버전인지 여부 */
    const isAppRecent = doesAppMeetRequiredVersion();

    //* 1) 앱 초기 정보를 가져왔을 때 현재 서비스가 가능한 상태가 아닌 경우: 서비스 상태 안내 화면으로 이동합니다.
    // if (!useDynamicServiceConstant.getState().SERVICE_STATUS.available) {
    //   screenProps.navigation.replace('ServiceStatusScreen', {});
    //   return;
    // }

    //* 2) 앱이 최소 요구 버전 미충족시 ForceUpdateScreen으로 이동
    if (!isAppRecent) {
      screenProps.navigation.replace('ForceUpdateScreen', {});
      return;
    }

    //* 3) 성공적인 데이터 수신 후 홈 랜딩 화면으로 이동
    if (result.loadInitialData) {
      screenProps.navigation.replace('LandingBottomTabNavigator', {
        HomeLandingScreen: {},
        PopupLandingScreen: {},
        PopupLikesLandingScreen: {},
        MyPageLandingScreen: {},
      });
    }

    /**
     * UI/UX 를 우선 개발해야 될때 replace()에 해당 스크린을 기입하여 우선 개발합니다.
     * 귀찮게 하나하나 클릭해서 해당 페이지까지 접근하는 일이 없도록 하기 위함
     * @author 도형
     */
    // if (loadDataResult.loadInitialData) {
    //   screenProps.navigation.replace('AuthPreferenceScreen', {});
    // }

    /** */
    async function setInAppMessagingVisible() {
      //* #SETTING #Firebase #InAppMessaging Firebase 인앱 메세지가 보이도록 설정합니다.
      // await inAppMessaging().setMessagesDisplaySuppressed(false);
    }
  }

  /**
   * refreshToken 을 확인하고, 자동 로그인을 진행합니다.
   * @author 규진
   */
  async function handleAutoLogin() {
    const refreshToken = await getEncryptedStorage('REFRESH_TOKEN');

    //* refreshToken 이 저장되어 있지 않거나 (로그인한 적 없음), 빈 문자열인 경우 (로그아웃 함):
    //* 비회원 상태로 로그인합니다.
    if (refreshToken === null || refreshToken === '') {
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
