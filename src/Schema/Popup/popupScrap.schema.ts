/**
 * 팝업 스토어 스크랩(관심등록) 정보 스키마
 * @author 도형
 */
export type PopupScrapSchema = {
  _id: string;

  // 스크랩 대상 팝업 _id
  popupId: string;

  // 스크랩한 유저 _id
  userId: string;

  // 스크랩 일시
  createdAt: string;
};
