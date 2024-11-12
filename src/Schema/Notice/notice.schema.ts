export type NoticeSchema = {
  _id: string;

  /** 공지 제목 */
  title: string;

  /** 공지 내용 */
  content?: string;

  /** 생성 날짜 */
  createdAt: string;

  /** 이미지 URL */
  imageUrls?: string[];

  /** WebView 로 보여줄 공지 내용 링크 */
  contentUrl?: string;
};

export const BlankNotice: NoticeSchema = {
  _id: '',
  title: '',
  createdAt: '',
  imageUrls: [],
};
