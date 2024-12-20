/**
 * 유저 알림 설정 스키마입니다.
 * @author 도형
 */

export type UserNotificationSettingSchema = {
  /** 마지막으로 알림을 확인한 시간 */
  lastCheck: string;

  // 알림 설정 변경 시간
  lastUpdatedAt?: string;

  /** 푸시 알림을 위한 fcm 토큰 */
  fcmToken: string;

  /** 앱 푸시 알림 수신 자체에 대한 설정 */
  appPush: boolean; // 기존 pushYn

  /** 야간 푸쉬알림 */
  nightPush: boolean; // 기존 pushNightYn

  /** 도움이 된 후기 리뷰 알림 */
  helpfulReviewPush: boolean; //기존 hoogiYn

  /** 관심 팝업 오픈 알림 */
  interestedPopupOpenPush: boolean; //기존 openYn

  /** 관심 팝업 마감 D-1 알림 */
  interestedPopupDeadlinePush: boolean; // 기존 magamYn

  /** 관심 팝업 정보 변경 알림 */
  interestedPopupInfoUpdatedPush: boolean; // 기존 changeInfoYn
};

export const BlankUserNotificationSetting: UserNotificationSettingSchema = {
  lastCheck: '',
  fcmToken: '',
  appPush: true,
  nightPush: true,
  helpfulReviewPush: true,
  interestedPopupOpenPush: true,
  interestedPopupDeadlinePush: true,
  interestedPopupInfoUpdatedPush: true,
};
