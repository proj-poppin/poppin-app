import {Platform, Linking} from 'react-native';
import {APP_VERSION} from '../Constant/app.constant';
import {useDynamicServiceConstant} from '../Zustand/App/service.dynamic.constant.zustand';

/** 픽플리 앱 스토어 링크를 엽니다. 사용자의 OS 에 따라 링크가 달라집니다. */
export function openAppStore() {
  if (Platform.OS === 'android') {
    Linking.openURL(useDynamicServiceConstant.getState().GOOGLE_PLAY_STORE_URL);
    return;
  }
  if (Platform.OS === 'ios') {
    Linking.openURL(useDynamicServiceConstant.getState().APPLE_APP_STORE_URL);
    return;
  }
  Linking.openURL(useDynamicServiceConstant.getState().WEB_SERVICE_URL);
}

/** 현재 앱 버전이 인자로 받은 최소 요구 버전보다 같거나 앞서는지 확인합니다. */
export const doesAppMeetGivenVersion = (requiredVersion: string) => {
  //* 현재 앱 버전
  const [appMajor, appMinor, appPatch] = APP_VERSION.split('.').map(n =>
    parseInt(n),
  );
  //* 요구되는 앱 버전
  const [minVersionMajor, minVersionMinor, minVersionPatch] = requiredVersion
    .split('.')
    .map(n => parseInt(n));

  //* patch 버전이 낮더라도 major, minor 버전이 높다면 최신 버전입니다.
  if (appMajor > minVersionMajor) {
    return true;
  }
  if (appMajor === minVersionMajor) {
    if (appMinor > minVersionMinor) {
      return true;
    }
    if (appMinor === minVersionMinor) {
      if (appPatch >= minVersionPatch) {
        return true;
      }
    }
  }
  return false;
};

/** 현재 앱이 최신 버전인지 확인합니다. */
export const doesAppMeetRequiredVersion = () => {
  //* 서버에서 받아온 앱 버전 정보. 안드로이드, iOS 별로 별도의 버전 요구 정보를 적용합니다.
  const APP_VERSION_INFO =
    useDynamicServiceConstant.getState().APP_VERSION_INFO;

  let requiredVersion = APP_VERSION_INFO.requiredVersion;
  if (Platform.OS === 'android') {
    requiredVersion = APP_VERSION_INFO.requiredAndroidVersion;
  } else if (Platform.OS === 'ios') {
    requiredVersion = APP_VERSION_INFO.requiredIOSVersion;
  }
  return doesAppMeetGivenVersion(requiredVersion);
};

/**
 * 카카오 상담 채팅을 엽니다.
 * @author 도형
 */
export function openKakaoChatURL() {
  Linking.openURL(useDynamicServiceConstant.getState().KAKAO_CHAT_URL);
}

/** 이용약관 문서를 엽니다 */
export function openServiceTerms() {
  Linking.openURL(useDynamicServiceConstant.getState().SERVICE_TERMS);
}

/** 개인정보 처리방침 문서를 엽니다 */
export function openPrivacyTerms() {
  Linking.openURL(useDynamicServiceConstant.getState().PRIVACY_TERMS);
}
