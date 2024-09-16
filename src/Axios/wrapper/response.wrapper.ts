/**
 * 일반적인 key-value 형태의 데이터를 받는경우 사용
 * @author 도형
 */
export interface ResponseWrapper {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data?: Map<string, any>;
}
