// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CommonResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}
