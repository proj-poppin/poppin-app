/**
 * 유저 취향설정 스키마입니다.
 * @author 도형
 */

export type Preference = {
  id: number;
  market: boolean;
  display: boolean;
  experience: boolean;
  wantFree: boolean;
};

// 사용자의 취향 카테고리
export type Taste = {
  id: number;
  fashionBeauty: boolean;
  characters: boolean;
  foodBeverage: boolean;
  webtoonAni: boolean;
  interiorThings: boolean;
  movie: boolean;
  musical: boolean;
  sports: boolean;
  game: boolean;
  itTech: boolean;
  kpop: boolean;
  alcohol: boolean;
  animalPlant: boolean;
};

// 사용자와 동행 관련 설정
export type WhoWith = {
  id: number;
  solo: boolean;
  withFriend: boolean;
  withFamily: boolean;
  withLover: boolean;
};

// 최종 UserPreferenceSchema 정의
export type UserPreferenceSchema = {
  preference: Preference;
  taste: Taste;
  whoWith: WhoWith;
};
