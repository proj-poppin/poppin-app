import {Linking} from 'react-native';
import {NavigationProp, StackActions} from '@react-navigation/native';
import {openAppStore} from './service.util';
import {PopupSchema} from '../Schema/Popup/popup.schema';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {useUserStore} from '../Zustand/User/user.zustand';

export type Destination = {
  type?: 'popup' | 'keyword' | 'notice' | 'inform';
  outerLink?: string;
  screen?: string;
  inAppLink?: string;
  inAppLinkDetailUrl?: string;
  noticeId?: string;
  popupId?: string;
  sharerId?: string;
  signingupEmail?: string;
  screenAfterSignup?: string;
};

/**
 * Generates a Destination object for navigation.
 */
export const getContentDestination = (contents: {
  popup: PopupSchema;
}): Destination => {
  const loggedIn = useUserStore.getState().isLoggedIn;
  return {
    popupId: contents.popup.id.toString(), // popupId를 포함
  };
};

/**
 * @important
 * 푸시알림, 딥링크, 카카오톡 공유하기 등으로 인해 앱이 실행되었거나 앱 내부의 이벤트 모달 버튼 등을 눌러
 * 해당 앱의 화면으로 이동하기 위한 함수입니다.
 *
 * @author 도형
 */
export const navigateInAppScreen = (params: {
  navigation: NavigationProp<AppStackProps>;
  destination?: Destination;
  onSuccessFirebaseLog?: string;
  onFailure?: {
    screen: keyof AppStackProps;
    params: AppStackProps[keyof AppStackProps];
  };
}) => {
  if (!params.destination) {
    return;
  }
  const {navigation, destination, onFailure} = params;
  //* iOS 에서 navigation 이 초기화되지 않아 undefined 로 들어오는 경우가 있습니다. 이 경우 처리하지 않습니다.
  //* (undefined 처리를 하지 않으면 앱이 터집니다.)
  if (navigation === undefined) {
    return;
  }

  if (destination.outerLink) {
    Linking.openURL(destination.outerLink);
    return;
  }

  // Handle app-specific links
  switch (destination.inAppLink) {
    case 'UPDATE':
      openAppStore();
      return;
    case 'GUIDE':
      // navigation.navigate('GuideScreen', {});
      return;
    case 'CREDIT':
      // navigation.navigate('MypageCreditHistoryScreen', {});
      return;
    default:
      break;
  }

  if (destination?.popupId) {
    navigation.navigate('PopupDetailScreen', {
      popupId: destination.popupId,
    });
    return;
  }

  // Handle notice-specific navigation
  if (
    destination.noticeId ||
    destination.type === 'notice' ||
    destination.type === 'inform'
  ) {
    navigation.navigate('AlarmNotificationScreen', {});
    navigation.navigate('AlarmNotificationDetailScreen', {
      noticeId: destination.noticeId!,
    });
    return;
  }

  // Handle signup-specific navigation
  if (destination.signingupEmail || destination.screenAfterSignup) {
    navigation.navigate('SignupScreen', {
      initialSignupState: {email: destination.signingupEmail},
    });
    return;
  }

  console.warn('No destination matched, and no failure handler provided1');

  // Handle failure case if defined
  if (onFailure) {
    navigation.navigate(onFailure.screen, onFailure.params);
  } else {
    console.warn('No destination matched, and no failure handler provided2');
  }
};
