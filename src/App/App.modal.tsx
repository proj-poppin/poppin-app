import React from 'react';
import {BlackBackgroundModal} from 'src/Component/Modal';
import shallow from 'zustand/shallow';
import {useAppStore} from '../Zustand/App/app.zustand';
import {RequireLoginModal} from './Modal/App.requiredLogin.modal';
import {PopupReportCancelModal} from './Modal/App.popupReportCancel.modal';
import {AppReviewImageModal} from './Modal/App.review.image.modal';

/**
 * 특정 페이지에 종속되지 않고 앱 전반에서 사용되는 앱 모달입니다.
 * @author 규진
 */

export const AppModal = () => {
  const {appModalVisible, setAppModalVisible, appModalProps, appModalType} =
    useAppStore(
      state => ({
        appModalVisible: state.appModalVisible,
        setAppModalVisible: state.setAppModalVisible,
        appModalProps: state.appModalProps,
        appModalType: state.appModalType,
      }),
      shallow,
    );

  const requireLoginModalType = appModalProps.requireLogin?.type;

  const unableToIgnore = appModalType === 'POPUP_REPORT_SUCCESS';

  const ModalContent = () => {
    //TODO-[규진] 이거 모든 모달쪽 싹 다 이걸로 바꿔야 할 것 같아요
    switch (appModalType) {
      case 'REQUIRE_LOGIN':
        return <RequireLoginModal />;
      case 'POPUP_REPORT_CANCEL':
        return <PopupReportCancelModal />;
    case 'POPUP_REVIEW_IMAGE':
        return <AppReviewImageModal/>;
    }
    return null;
  };

  return (
    <BlackBackgroundModal
      allowIgnore={!unableToIgnore}
      modalVisible={appModalVisible}
      setModalVisible={setAppModalVisible}>
      <ModalContent />
    </BlackBackgroundModal>
  );
};
