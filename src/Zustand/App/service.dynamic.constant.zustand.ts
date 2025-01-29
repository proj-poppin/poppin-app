import create from 'zustand';
import {Destination, didDatePassedDeadline} from 'src/Util';

/** 학생 대상 이벤트. '학생 기능' 페이지에서 보여집니다. */
type StudentEvent = {
  startAt: string;
  endAt: string;
  name?: string;
  destination: Destination;
  imageUrl?: string;
};

/**
 * @ServerSync
 * 서버에서 동적으로 받아오는 서비스 관련 상수 타입
 * @author 도형
 */
export type DynamicServiceConstants = {
  // /** 크레딧을 이용해 결제 금액을 차감할 때 차감비율 */
  // CREDIT_VALUE: number;
  //
  // /** 서비스 상태 */
  // SERVICE_STATUS: {
  //   available: boolean;
  //   title: string;
  //   content: string;
  // };
  //
  // /** 서비스 상태 사전 안내 팝업  */
  // CAUTION_MODAL?: {
  //   name: string;
  //   title: string;
  //   subTitle: string;
  //   contents: string[];
  //   destination?: Destination;
  //   button: {text: string};
  // };
  //
  // /** 홈 피드에서 프로젝트 : 투표 섞는 비율 */
  // homeResearchVoteRatio: number;
  //
  // homeLandingGuideDestination: Destination;
  //
  // attendanceInduceText: string;
  // communityInduceTextInDailyContent: string;
  // communityInduceTextInDailyContentAfterParticipation: string;

  APP_VERSION_INFO: {
    recentVersion: string;
    requiredVersion: string; // 1.1.2 > 1.1.2
    requiredAndroidVersion: string;
    requiredIOSVersion: string;
    // requiredVersionForResearchUpload: string;
    // requiredVersionForVoteUpload: string;
    // updateList?: string[];
  };

  // feedbackTypes: EnumValueWithName[];

  // CONTACT_EMAIL: string;
  // WEB_SERVICE_URL: string;
  // GOOGLE_PLAY_STORE_URL: string;
  APPLE_APP_STORE_URL: string;
  KAKAO_CHAT_URL: string;

  // STORE_URL: string;
  // STORE_FIRST_URLs: string[];
  // PARTNER_URL: string;
  // PARTNER_FIRST_URLs: string[];

  SERVICE_TERMS: string;
  PRIVACY_TERMS: string;

  // /** 추후 operation zustand 에서 담당하게 합니다. */
  // studentEvents?: StudentEvent[];
  // getOngoingStudentEvent: () => StudentEvent | undefined;
};

type DynamicServiceConstantStoreProps = DynamicServiceConstants & {
  updateServiceConstants: (
    serviceConstants: Partial<DynamicServiceConstants>,
  ) => void;
};

/**
 * 앱 서비스 자체와 관련된 상수를 관리합니다.
 * 서버에서 동적으로 데이터가 변경될 수 있습니다.
 * @author 도형
 */
export const useDynamicServiceConstant =
  create<DynamicServiceConstantStoreProps>((set, get) => ({
    CREDIT_VALUE: 1,

    SERVICE_STATUS: {
      available: true,
      title: '',
      content: '',
    },

    homeResearchVoteRatio: 4,

    homeLandingGuideDestination: {noticeId: '653526a4ca5a0e149da0983a'},

    attendanceInduceText: '출석 체크하고 10크레딧 받아가세요!',
    communityInduceTextInDailyContent: '운세를 다 봤다면 투표도 참여하기! 🗳️',
    communityInduceTextInDailyContentAfterParticipation:
      '오늘은 HOT 투표에 도전해볼까요?!🔥',

    APP_VERSION_INFO: {
      recentVersion: '0.0.0',
      requiredVersion: '0.0.0',
      requiredAndroidVersion: '0.0.0',
      requiredIOSVersion: '0.0.0',
      requiredVersionForResearchUpload: '0.0.0',
      requiredVersionForVoteUpload: '0.0.0',
    },

    feedbackTypes: [
      {value: 'CONVENIENCE', displayName: '사용성 편의 개선'},
      {value: 'DESIGN', displayName: '디자인 개선 건의'},
      {value: 'NEW_UTIL', displayName: '기능 건의'},
      {value: 'BUG', displayName: '버그 제보'},
      {value: 'ETC', displayName: '기타'},
    ],

    CONTACT_EMAIL: 'contact@r2c.company',
    WEB_SERVICE_URL: 'https://pickply.com',
    GOOGLE_PLAY_STORE_URL:
      'https://play.google.com/store/apps/details?id=com.pickpleresearch&hl=ko',
    APPLE_APP_STORE_URL:
      'https://apps.apple.com/kr/app/팝핀-맞춤형-팝업-스토어-추천/id6482994685',

    KAKAO_CHAT_URL: 'http://pf.kakao.com/_CCtFG/chat',

    STORE_URL: 'https://pickply.com/products',
    STORE_FIRST_URLs: [],

    PARTNER_URL: 'https://pickply.com/partnersInApp',
    PARTNER_FIRST_URLs: [],

    SERVICE_TERMS:
      'https://docs.google.com/document/d/1gFo_QEY_lea3pzP9fJH9X0oWx7yF6PgefenNWsJDMvM/edit?usp=sharing',
    PRIVACY_TERMS:
      'https://docs.google.com/document/d/1KgYNHqbleQ3r9lbhuVjbCDEpxW-zPzDKka8D2qVZ2UI/edit?usp=sharing',

    // getOngoingStudentEvent: () => {
    //   return get().studentEvents?.find(
    //     event =>
    //       didDatePassedDeadline({
    //         deadline: event.startAt,
    //         defaultValue: true,
    //       }) &&
    //       !didDatePassedDeadline({
    //         deadline: event.endAt,
    //         defaultValue: false,
    //         strict: true,
    //       }),
    //   );
    // },

    updateServiceConstants: (
      serviceConstants: Partial<DynamicServiceConstants>,
    ) => {
      set({
        ...get(),
        ...serviceConstants,
      });
    },
  }));
