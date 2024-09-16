/**
 * 유저 스키마입니다.
 * @author 도형
 */

export type UserSchema = {
  /** 유저 이미지 URL */
  userImageUrl: string;

  /** 이메일 */
  email: string;

  /** 닉네임 */
  nickname: string;

  /** 계정 인증 타입(ex. DEFAULT(EMAIL), KAKAO, APPLE) */
  accountType: string;

  /** 작성 완료한 후기 아래 숫자 */
  writtenReviewCnt: number;

  /** 후기 작성하기 아래 숫자 */
  visitedPopupCnt: number;
};
