import create from 'zustand';
import {BlankUser, UserSchema} from 'src/Schema/User/user.schema';
import {
  BlankUserNotice,
  UserNoticeSchema,
} from '../../Schema/User/userNotice.schema';
import {
  BlankUserNotificationSetting,
  UserNotificationSettingSchema,
} from '../../Schema/User/userNotificationSetting.schema';
import {axiosGetSelfInfo} from 'src/Axios/User/user.get.axios';
import {
  axiosLoginWithEmailPassword,
  axiosLogout,
  axiosSignUp,
  axiosSocialLogin,
  LoginResponse,
  UserActivities,
} from 'src/Axios/Auth/auth.axios';
import {setEncryptedStorage, setStorage, showBlackToast} from '../../Util';
import {
  SocialAccountType,
  TotalAccountType,
} from 'src/Object/Enum/account.type';
import {
  BlankPreference,
  PreferenceSchema,
} from '../../Schema/Preference/preference.schema';
import {
  subscribeAllFirebaseTopics,
  unsubscribeAllFirebaseTopics,
} from '../../Util/Firebase/firebase.messaging.util';
import {useNotificationStore} from './notification.zustand';
import {
  axiosBlockUser,
  axiosUpdateUserNotificationSetting,
} from '../../Axios/User/user.patch.axios';
import {axiosReportPopupReview} from '../../Axios/Report/report.post.axios';
import {
  BlankUserRelation,
  UserRelationSchema,
} from 'src/Schema/User/userRelation.schema';
import {usePopupStore} from '../Popup/popup.zustand';

type UserStoreProps = {
  accessToken: string;
  refreshToken: string;

  user: UserSchema;
  userNotice: UserNoticeSchema;
  userNotificationSetting: UserNotificationSettingSchema;
  userPreferenceSetting: PreferenceSchema;
  userRelation: UserRelationSchema;

  setUser: (user: UserSchema) => void;
  setUserPreferenceSetting: (userPreferenceSetting: PreferenceSchema) => void;

  /** 유저 기본 정보와 특성 정보를 갱신합니다. */
  refreshUserInfo: () => Promise<void>;

  isLoggedIn: () => boolean;

  /**
   * 회원가입합니다.
   * @author 도형
   */
  signup: (param: {
    accountType: TotalAccountType;
    email: string;
    password?: string;
    passwordConfirm?: string;
    nickname: string;
    fcmToken: string;
    agreedToPrivacyPolicy: boolean;
    agreedToServiceTerms: boolean;
  }) => Promise<boolean>;

  /**
   * 이메일, 비밀번호 입력을 받아 로그인합니다.(Email Login)
   * @author 도형
   */
  emailLogin: (emailLoginParam: {
    email: string;
    password: string;
  }) => Promise<{success: boolean}>;

  /**
   * 4종 소셜 로그인 타입과 토큰을 받아 로그인합니다.(Social Login)
   * @author 도형
   */
  socialLogin(socialLoginParam: {
    type: SocialAccountType;
    token: string;
  }): Promise<{
    success: boolean;
  }>;

  /**
   * 로그인 / 자동 로그인 이후 받아 온 정보를 저장합니다.
   * 내부적으로 setUserActivities, setFirebaseTopicSubscription 를 호출합니다.
   * @author 도형
   */
  setLoggedInUserInfo: (loginResponse: LoginResponse) => Promise<void>;

  /**
   * 비회원으로 앱을 사용하기 위해 상태값을 변경합니다.
   * 모든 Firebase Topic 을 구독하고, 비회원 상태에서 참여한 프로젝트/투표 정보를 가져옵니다.
   */
  setNonMemberUserInfo: () => void;

  /**
   * 로그인하여 얻어온 유저 활동 정보들(조회/스크랩/참여/업로드한 프로젝트와 투표)을
   * setLoggedInUserInfo 를 통해 넘겨받아 저장합니다
   */
  setUserActivities: (userActivities: UserActivities) => void;
  /**
   * 받아온 유저의 알림 설정 정보를 바탕으로 Firebase Topic 구독 여부를 업데이트 합니다.
   */
  setFirebaseTopicSubscription: (
    userNotificationSetting: UserNotificationSettingSchema,
  ) => void;

  /**
   * 사용자를 신고합니다.
   */
  reportUser: (targetUserId: string, content: string) => Promise<void>;
  /**
   * 사용자를 차단합니다.
   */
  blockUser: (blockedUserId: string) => Promise<void>;

  /**
   * 알림 설정을 업데이트합니다. 서버에도 동일한 내용의 요청을 보냅니다.
   * v1.1.18~) 이 때, appPush 설정을 바꾸는 경우 Firebase Topic 구독 여부를 업데이트 합니다.
   */
  setUserNotificationSetting: (
    userNotificationSetting: Partial<UserNotificationSettingSchema>,
  ) => Promise<void>;

  /**
   * 로그아웃 후 상태값을 반영합니다. 유저 정보, 유저 활동 정보(크레딧 변동내역, 알림)와
   * 프로젝트 및 투표에 대한 활동 정보를 모두 초기화하고 비회원 참여 정보를 대신 불러옵니다.
   * v1.1.18~) 또한, 해당 기기에서 모든 Firebase 토픽을 구독합니다.
   */
  logout: () => Promise<void>;

  /** 회원 탈퇴 후 상태값을 반영합니다 */
  resign: () => Promise<void>;
};

/**
 * 유저 상태를 끌어다 쓸 수 있는 zustand 입니다.
 * @author 도형
 */

export const useUserStore = create<UserStoreProps>((set, get) => ({
  accessToken: '',
  refreshToken: '',
  user: BlankUser,
  userNotice: BlankUserNotice,
  userNotificationSetting: BlankUserNotificationSetting,
  userPreferenceSetting: BlankPreference,
  userRelation: BlankUserRelation,

  setUser: (user: UserSchema) => set({user}),
  setUserPreferenceSetting: (userPreferenceSetting: PreferenceSchema) =>
    set({userPreferenceSetting}),

  refreshUserInfo: async () => {
    const userInfo = await axiosGetSelfInfo();
    if (userInfo !== null) {
      set({
        user: userInfo.user,
        userPreferenceSetting: userInfo.userPreferenceSetting,
      });
      return;
    }
  },

  isLoggedIn: () => get().user.id !== '',

  signup: async (param: {
    accountType: TotalAccountType;
    email: string;
    password?: string;
    passwordConfirm?: string;
    nickname: string;
    fcmToken: string;
    agreedToPrivacyPolicy: boolean;
    agreedToServiceTerms: boolean;
  }) => {
    const result = await axiosSignUp(param);

    if (result === null) {
      return false;
    }

    if (param.accountType === 'EMAIL') {
      await setStorage('EMAIL', result.data.user.email);
    }
    await setEncryptedStorage('ACCESS_TOKEN', result.data.accessToken);
    await setEncryptedStorage('REFRESH_TOKEN', result.data.refreshToken);

    set({
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
      user: result.data.user,
      userNotice: result.data.userNotice,
      userNotificationSetting: result.data.userNotificationSetting,
      userPreferenceSetting: result.data.userPreferenceSetting,
      // userRelation: result.data.userRelation,
    });

    get().setUserActivities(result.data.userActivities);
    get().setFirebaseTopicSubscription(result.data.userNotificationSetting);

    return true;
  },

  emailLogin: async (emailLoginParam: {email: string; password: string}) => {
    const loginResponse = await axiosLoginWithEmailPassword(emailLoginParam);
    if (loginResponse === null) {
      return {success: false};
    }
    await useUserStore.getState().setLoggedInUserInfo(loginResponse);

    return {success: true};
  },

  socialLogin: async (socialLoginParam: {
    type: SocialAccountType;
    token: string;
  }) => {
    const loginResponse = await axiosSocialLogin(socialLoginParam);
    if (loginResponse == null) {
      return {success: false};
    }
    await useUserStore.getState().setLoggedInUserInfo(loginResponse);
    return {success: true};
  },

  setLoggedInUserInfo: async (loginResponse: LoginResponse) => {
    const accountType = loginResponse.data.user.accountType;
    if (accountType === 'EMAIL') {
      await setStorage('EMAIL', loginResponse.data.user.email);
    }
    await setEncryptedStorage('ACCESS_TOKEN', loginResponse.data.accessToken);
    await setEncryptedStorage('REFRESH_TOKEN', loginResponse.data.refreshToken);

    set({
      user: loginResponse.data.user,
      userNotice: loginResponse.data.userNotice,
      userNotificationSetting: loginResponse.data.userNotificationSetting,
      userPreferenceSetting: loginResponse.data.userPreferenceSetting,
      accessToken: loginResponse.data.accessToken,
      refreshToken: loginResponse.data.refreshToken,
    });
  },

  setNonMemberUserInfo: async () => {
    subscribeAllFirebaseTopics();
  },

  setUserActivities: (userActivities: UserActivities) => {
    useNotificationStore
      .getState()
      .setNotifications(userActivities.notifications);
  },
  setFirebaseTopicSubscription: async (
    userNotificationSetting: UserNotificationSettingSchema,
  ) => {
    if (userNotificationSetting.appPush) {
      // Add topic subscription logic here
    } else {
      unsubscribeAllFirebaseTopics();
    }
  },

  //* UserInfo
  reportUser: async (targetUserId: string, content: string) => {
    const result = await axiosReportPopupReview({
      targetReviewId: targetUserId,
      content,
    });
    if (result !== null) {
      showBlackToast({text1: '사용자 신고가 완료되었습니다'});
    }
  },

  blockUser: async (blockedUserId: string) => {
    const result = await axiosBlockUser(blockedUserId);
    if (result !== null) {
      const userRelation = get().userRelation;
      set({
        userRelation: {
          ...userRelation,
          blockedUserIds: [blockedUserId, ...userRelation.blockedUserIds],
        },
      });
      showBlackToast({text1: '사용자 차단이 완료되었습니다'});
    }
  },

  setUserNotificationSetting: async (
    userNotificationSetting: Partial<UserNotificationSettingSchema>,
  ) => {
    //* 서버측 알림 설정 정보 업데이트
    axiosUpdateUserNotificationSetting(userNotificationSetting);
    //* 로컬에서 표시되는 알림 설정 정보 업데이트
    set({
      userNotificationSetting: {
        ...get().userNotificationSetting,
        ...userNotificationSetting,
      },
    });
  },

  logout: async () => {
    await axiosLogout();
    set({
      accessToken: '',
      refreshToken: '',
      user: BlankUser,
      userNotice: BlankUserNotice,
      userNotificationSetting: BlankUserNotificationSetting,
      userPreferenceSetting: BlankPreference,
      userRelation: BlankUserRelation,
    });
    await setEncryptedStorage('ACCESS_TOKEN', '');
    await setEncryptedStorage('REFRESH_TOKEN', '');
    useNotificationStore.getState().clearNotificationStates();
    await usePopupStore.getState().logout();
    subscribeAllFirebaseTopics();
  },

  resign: async () => {
    await setStorage('EMAIL', '');
    await get().logout();
  },
}));
