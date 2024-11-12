import {Linking} from 'react-native';
import {NavigationProp, StackActions} from '@react-navigation/native';
import {openAppStore} from './service.util';
import {PopupSchema} from '../Schema/Popup/popup.schema';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {useUserStore} from '../Zustand/User/user.zustand';

/**
 * 다이나믹 링크, 카카오톡 공유하기 기능 등을 사용하여 앱 링크를 생성하는 경우, 해당 인자에 포함되어야 하는 정보입니다.
 * @author 도형
 */
export type Destination = {
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
 * 프로젝트, 투표, (추후) 이벤트를 인자로 받아 Destination 객체를 반환합니다.
 * 로그인한 경우, sharerId 를 자동으로 인자에 포함합니다.
 * @author 도형
 */
export const getContentDestination = (contents: {
  // research?: ResearchSchema;
  // vote?: VoteSchema;
  popup: PopupSchema;
}): Destination => {
  const loggedIn = useUserStore.getState().isLoggedIn;

  return {
    // researchId: contents.research?._id,
    // voteId: contents.vote?._id,
    // sharerId: loggedIn ? useUserStore.getState().user._id : undefined,
    popupId: contents.popup.id.toString(),
  };
};

/**
 * @important
 * 푸시알림, 딥링크, 카카오톡 공유하기 등으로 인해 앱이 실행되었거나 앱 내부의 이벤트 모달 버튼 등을 눌러
 * 해당 앱의 화면으로 이동하기 위한 함수입니다.
 *
 * @author 도형
 */
export const navigateInAppScreen = (param: {
  navigation: NavigationProp<AppStackProps>;
  destination?: Destination;
  onSuccessFirebaseLog?: string;
  onFailure?: {
    screen: keyof AppStackProps;
    params: AppStackProps[keyof AppStackProps];
  };
}) => {
  if (!param.destination) {
    return;
  }

  const {navigation, destination, onSuccessFirebaseLog} = param;
  //* iOS 에서 navigation 이 초기화되지 않아 undefined 로 들어오는 경우가 있습니다. 이 경우 처리하지 않습니다.
  //* (undefined 처리를 하지 않으면 앱이 터집니다.)
  if (navigation === undefined) {
    return;
  }

  if (destination.outerLink) {
    Linking.openURL(destination.outerLink);
    return;
  }

  switch (destination.inAppLink) {
    case 'UPDATE':
      openAppStore();
      break;
    case 'GUIDE':
      navigation.navigate('GuideScreen', {});
      break;
    case 'CREDIT':
      navigation.navigate('MypageCreditHistoryScreen', {});
      break;
    // case 'STORE':
    //   navigation.navigate('StoreLandingScreen', {
    //     detailUrl: destination.inAppLinkDetailUrl,
    //   });
    //   break;
    // case 'DAILY_CONTENT':
    //   navigation.navigate('OperationDailyContentScreen', {});
    //   break;
    // case 'NOTICE':
    //   navigation.navigate('MypageNoticeScreen', {});
    //   break;
    // case 'STUDENT':
    //   navigation.navigate('MypageStudentFunctionScreen', {});
    //   break;
    // case 'PARTNER':
    //   navigation.navigate('PartnerLandingScreen', {
    //     detailUrl: destination.inAppLinkDetailUrl,
    //   });
    //   break;
    // case 'PARTNER_FUNCTION':
    //   navigation.navigate('MypagePartnerFunctionScreen', {});
    //   break;
    // case 'PARTNER_REGISTRATION':
    //   navigation.navigate('PartnerRegistrationScreen', {});
    //   break;
    // case 'FEEDBACK':
    //   navigation.navigate('FeedbackUploadScreen', {});
    //   break;
  }

  if (destination.screen) {
    const screen = destination.screen as keyof AppStackProps;
    try {
      navigation.navigate(screen, {
        detailUrl: destination?.inAppLinkDetailUrl,
      });
      return;
    } catch (e) {
      console.error(`Screen not Found: ${screen}`);
      console.error(e);
    }
  }

  if (destination.noticeId) {
    //* 공지사항 상세페이지로 이동하는 경우, 자연스러운 UX를 위해 공지사항 목록 화면을 한번 거쳐서 갑니다.
    navigation.navigate('MypageNoticeScreen', {});
    navigation.navigate('MypageNoticeDetailScreen', {
      noticeId: destination.noticeId,
    });
    return;
  }
  if (destination?.popupId) {
    //* 프로젝트 상세페이지로 이동해야 할 때 현재 화면도 프로젝트 상세페이지라면, navigate() 대신 replace() 를 사용합니다.

    const routes = navigation.getState()?.routes;

    if (!routes) {
      //!routes가 존재하지 않는 경우가 있기에 해당 조건문이 없으면 앱이 터집니다. ios release 모드에서 터집니다.
      navigation.navigate('PopupDetailScreen', {
        popupId: destination.popupId.toString(),
      });
      return;
    }

    const currentRoute = routes[routes.length - 1];
    if (currentRoute.name === 'PopupDetailScreen') {
      navigation.dispatch(
        StackActions.replace('PopupDetailScreen', {
          popupId: destination.popupId,
        }),
      );
    } else {
      navigation.navigate('PopupDetailScreen', {
        popupId: destination.popupId,
      });
    }
    return;
  }
  // if (destination.voteId) {
  //   navigation.navigate('VoteDetailScreen', {voteId: destination.voteId});
  //   return;
  // }
  //* 회원가입 시도 시, 이메일 인증을 건너뛰거나 회원가입 후 이동할 화면을 지정된 경우
  if (destination.signingupEmail || destination.screenAfterSignup) {
    navigation.navigate('SignupScreen', {
      initialSignupState: {email: destination.signingupEmail},
    });
    return;
  }
  // if (destination.productId) {
  //   navigation.navigate('StoreLandingScreen', {  });
  //   navigation.navigate('StoreProductScreen', { productId: destination.productId});
  //   return;
  // }
  //* 만약 모든 조건에 해당하지 않을 때 onFailure가 존재한다면, onFailure 에서 지정해준 화면으로 이동합니다.
  if (param.onFailure) {
    navigation.navigate(param.onFailure.screen, param.onFailure.params);
  }
};
