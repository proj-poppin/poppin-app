/**
 * 토큰 스키마입니다.
 * @author 도형
 */

export type UserJwtTokenSchema = {
  /** accessToken */
  accessToken: string;
  /** refreshToken */
  refreshToken: string;
};
