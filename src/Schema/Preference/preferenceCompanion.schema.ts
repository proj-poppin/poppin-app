/**
 * 함께 가는 대상 선호 스키마
 * @author 도형
 */
export type PreferenceCompanion = {
  id: number;
  solo: boolean; // 혼자 선호 여부
  withFriend: boolean; // 친구와 함께 선호 여부
  withFamily: boolean; // 가족과 함께 선호 여부
  withLover: boolean; // 연인과 함께 선호 여부
};
