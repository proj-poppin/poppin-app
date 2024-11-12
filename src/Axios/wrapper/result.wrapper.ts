/**
 * 단순히 작업 성공 여부와 에러만을 전달해야 하는 경우 사용
 * @author 도형
 */
export interface ResultWrapper {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}
