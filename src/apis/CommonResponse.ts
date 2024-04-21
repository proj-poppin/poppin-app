interface CommonResponse<T> {
  success: boolean;
  data?: T; // `data` 필드를 선택적으로 만듦
  error?: {
    // `error` 필드를 선택적으로 만듦
    code: string;
    message: string;
  };
}
