export type AppNavigatorParamList = {
  Report: {id: number; isReview?: boolean; reviewId?: number};
  PopUpEditRequest: {name: string; id: number};
  Entry: undefined;
  BasicLogin: undefined;
  PasswordReset: undefined;
  PrivacyPolicy: undefined;
  ServicePolicy: undefined;
  SignUpPreferenceSetting: undefined;
  SignUpNickNameSocial: undefined;
  SignUpEmail: undefined;
  SignUpAuthCode: undefined;
  SignUpNickName: undefined;
  SignUpSucceed: undefined;
  MainTabNavigator: undefined;
  ProfileEdit: undefined;
  PasswordChange: undefined;
  FAQ: undefined;
  KeywordAlarm: undefined;
  UserRegister: undefined;
  Policy: undefined;
  ReviewWrite: {name: string; id: number; isVisited: boolean};
  OperatorRegister: undefined;
  MemberDelete: undefined;
  PreferenceSetting: undefined;
  PopUpDetail: {
    id: number;
    name: string;
    isAlarm: boolean;
    alarmId?: number;
    isLoggedIn: boolean;
  };
  Alarm: undefined;
  AlarmSetting: undefined;
  NoticeDetail: {nid: number};
  findInputScreen: undefined;
  FAQForm: undefined;
  PasswordCheck: undefined;
  MyReviewsList: undefined;
  FAQFormScreen: undefined;
};
