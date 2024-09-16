import axios, {AxiosError} from 'axios';
import {ToastShowParams} from 'react-native-toast-message';
import {showBlackToast} from './toast.util';
import {ResponseWrapper} from 'Axios/wrapper/response.wrapper.ts';

/**
 * Axios 요청 중 에러가 났을 때 토스트 메세지를 보여주는 방식을 지정합니다.
 * 서버에서 전달해준 에러 메세지가 있는 경우 그대로 사용하고,
 * 없는 경우 인자로 전달된 메세지를 띄웁니다.
 * @author 도형
 */
export async function handleAxiosError(param: {
  error: AxiosError<ResponseWrapper> | any; // ResponseWrapper 타입으로 변경
  errorMessage?: string;
  toastShowParams?: ToastShowParams;
}) {
  //* 발생한 에러가 AxiosError인지 검증하고 response 데이터를 가져올 수 있는지 확인합니다.
  if (axios.isAxiosError(param.error)) {
    const responseData = param.error.response?.data;

    //* 서버에서 code가 '500'인 경우 처리
    if (responseData?.error?.code === '500') {
      showBlackToast({
        ...param.toastShowParams,
        text1:
          '서버 에러입니다. 잠시 후 다시 시도해 주세요.\n문제가 지속되는 경우, 고객센터를 통해 문의해 주세요',
      });
      return;
    }

    //* 서버에서 ResponseWrapper.error 필드로 에러 메시지를 보내온 경우
    if (responseData?.error?.message) {
      showBlackToast({
        ...param.toastShowParams,
        text1: responseData.error.message, // 서버에서 받은 에러 메시지를 표시
      });
      return;
    }
  }

  //* AxiosError가 아니거나 서버에서 에러 메시지를 보내지 않은 경우, 미리 지정한 메세지를 toast로 띄웁니다.
  showBlackToast({
    ...param.toastShowParams,
    text1: param.errorMessage || '알 수 없는 오류가 발생했습니다.',
  });
  return;
}
