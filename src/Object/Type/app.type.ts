import {Destination} from 'src/Util';

/**
 * 푸시알림, 이벤트 팝업 등을 통해 앱 내 페이지로 이동하는 경우 수신하는 변수 타입입니다.
 * @author 도형
 */
export type InAppLinkType = 'POPUP' | 'NOTICE' | 'UPDATE';

/**
 * 수신하는 푸시알림
 * 이 가지고 있는 타입입니다.
 * @author 도형
 */

export type PushNotification = {
  notification?: {
    title: string;
    body: string;
  };
  data: {
    notificationId: string;
    type: string;
    detail?: string;
    //? 아래부터는 푸시알림을 통해 이동하게 되는 화면에 대한 정보를 가지고 있습니다.
    popupId?: string;
    outerLink?: string;
    inAppLink?: InAppLinkType;
  } & Destination;
};
