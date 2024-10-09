import {Destination} from 'src/Util';
import {NotificationCategory} from 'src/Zustand/User/notification.zustand';

/**
 * 알림 스키마
 * @author 도형
 */
export type NotificationSchema = Destination & {
  id: string;

  // 알림 대상 유저
  userId: string;

  // 알림 타입
  type: string;

  // 알림 카테고리: 팝업 관련 / 공지 관련 / 기타
  category: NotificationCategory;

  // 알림 제목
  title: string;

  // 알림 내용
  content: string;

  // 알림 세부 내용
  detail?: string;

  // 알림 확인 여부
  checked: boolean;

  // 알림 생성 시간
  createdAt: string;

  // 팝업 _id
  popupId?: string;

  // 공지 _id
  notificationId?: string;

  destination?: Destination;
};

export const BlankNotification: NotificationSchema = {
  id: '',
  userId: '',
  type: '',
  category: 'POPUP',
  title: '',
  content: '',
  checked: false,
  createdAt: '',
};
