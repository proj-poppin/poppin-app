/**
 * 유저 알림 설정 스키마입니다.
 * @author 도형
 */

// /** 유저 이미지 URL */
// userImageUrl: string;
//
// /** 이메일 */
// email: string;
export type UserNotificationSettingSchema = {
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
