/**
 * 팝업 유형에 관한 스키마
 * @author 도형
 */
export type PreferencePopupStore = {
  id: number;
  market: boolean; // 마켓 선호 여부
  display: boolean; // 디스플레이 선호 여부
  experience: boolean; // 경험 선호 여부
  wantFree: boolean; // 무료 혜택 선호 여부
};
