import {Destination} from 'src/Util';

/**
 * 푸시알림, 이벤트 팝업 등을 통해 앱 내 페이지로 이동하는 경우 수신하는 변수 타입입니다.
 * @author 도형
 */
export type InAppLinkType = 'POPUP' | 'NOTICE' | 'UPDATE';

/**
 * 수신하는 푸시알림이 가지고 있는 타입이며 자유도를 갖기 위하여 커스텀으로 정의합니다.
 * @author 도형
 */

export type PushNotification = {
  notification?: {
    title: string;
    ios: {
      badge: number;
    };
    sound: string;
    body: string;
  };
  data: {
    id: string;
    type: 'popup' | 'notice' | 'keyword' | 'inform'; // popup: 팝업, notice: 공지사항, keyword: 키워드(이 역시 'popup' 과 UX Writing은 동일함)
    detail?: string;
    //? 아래부터는 푸시알림을 통해 이동하게 되는 화면에 대한 정보를 가지고 있습니다.
    popupId?: string;
    outerLink?: string;
    inAppLink?: InAppLinkType;
  } & Destination;
};
