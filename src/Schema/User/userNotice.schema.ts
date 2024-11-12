export type UserNoticeSchema = {
  /** 마지막으로 공지를 확인한 시각 */
  lastCheck: string;

  /** 확인한 공지 _id */
  checkedNoticeIds: string[];
};

export const BlankUserNotice: UserNoticeSchema = {
  lastCheck: '',
  checkedNoticeIds: [],
};
