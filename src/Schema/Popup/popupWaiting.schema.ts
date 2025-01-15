/**
 * 팝업 스토어 재오픈 알림 요청 스키마
 * @author 도형
 */
export type PopupWaitingSchema = {
  // 오픈 알림 신청함으로써 Auto Created unique id
  id: string;

  // (재오픈 알림) 구독 대상 팝업 스토어의 id
  popupId: string;
};
