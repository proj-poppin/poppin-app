/**
 * 팝업 유형에 관한 스키마
 * @author 도형
 */
export type PreferencePopupStore = {
  id: number;
  market: boolean; // 소비형
  display: boolean; // 전시형
  experience: boolean; // 체험형
  wantFree: boolean; // 무료였으면 좋겠어요
};
