import Toast, {ToastShowParams} from 'react-native-toast-message';

/**
 * 푸시 알람이 왔을 때 화면 상단에 검은색 바탕, 흰 글씨의 토스트 메세지를 띄웁니다.
 * 해당 메세지의 구성 요소는 Notification.toast.component.tsx 를 참고하세요.
 * @author 도형
 */
export function showNotificationToast(param: ToastShowParams) {
  Toast.show({
    type: 'notificationToast',
    position: 'top',
    visibilityTime: 3000,
    ...param,
  });
}

/**
 * 화면 하단에 검은색 바탕, 흰 글씨의 토스트 메세지를 띄웁니다
 * 해당 메세지의 구성 요소는 BottomBlack.toast.component.tsx 를 참고하세요.
 * @author 도형
 */
export function showBlackToast(param: ToastShowParams) {
  Toast.show({
    type: 'blackToast',
    position: 'bottom',
    visibilityTime: 2500,
    ...param,
  });
}
