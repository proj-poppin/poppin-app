/**
 * 팝업 스토어 방문 정보 스키마
 * @author 도형
 */
export type PopupVisitSchema = {
  /** 팝업 아이디 */
  id: number;

  /** 방문한 팝업 ID */
  popupId: string;

  /** 방문한 유저 ID */
  userId: string;

  /** 방문 일시 */
  createdAt: string;
};
