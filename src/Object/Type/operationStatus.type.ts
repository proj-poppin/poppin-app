/**
 * 운영 상태 타입
 * @author 도형
 */

export enum OperationStatus {
  NOT_OPENED = 'NOT_OPENED', // 오픈 전
  OPERATING = 'OPERATING', // 운영 중
  CLOSED = 'CLOSED', // 운영 종료
}

// export type OperationStatus = 'NOTYET' | 'OPERATING' | 'TERMINATED';
