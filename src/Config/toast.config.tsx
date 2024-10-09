import React from 'react';
import {ToastConfig} from 'react-native-toast-message';
import {BottomBlackToast, NotificationToast} from 'src/Component/Toast';

/**
 * 앱에서 사용하는 토스트 메시지 디자인을 설정합니다.
 * @see toast.util.ts
 * @author 도형
 */
export const toastConfig: ToastConfig = {
  /** 하단에 표시되는 검은색 토스트 메세지 */
  blackToast: ({text1}) => <BottomBlackToast text1={text1} />,
  /** 푸시 알람이 왔을 때 상단에 표시되는 흰색 토스트 메세지 */
  notificationToast: ({
    text1,
    text2,
    props,
  }: {
    text1?: string;
    text2?: string;
    props?: {type?: string; researchId?: string; voteId?: string};
  }) => <NotificationToast text1={text1} text2={text2} props={props} />,
};
