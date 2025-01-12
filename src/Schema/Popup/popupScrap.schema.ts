/**
 * 팝업 스토어 스크랩(관심등록) 정보 스키마
 * @author 도형
 */
export type PopupScrapSchema = {
  id: string;

  // 관심등록한 팝업 id
  popupId: string;

  // 관심등록한 유저 id
  userId: string;

  // 관심등록한 일시
  createdAt: string;
};
