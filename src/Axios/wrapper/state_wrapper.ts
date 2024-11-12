/**
 * 상태를 관리하거나 특정 데이터와 함께 성공 여부를 확인하는 경우 사용
 * @author 도형
 */
export interface StateWrapper<T> {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data: T;
}
