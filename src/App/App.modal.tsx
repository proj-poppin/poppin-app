import React from 'react';
import {BlackBackgroundModal} from 'src/Component/Modal';
import shallow from 'zustand/shallow';
import {useAppStore} from '../Zustand/App/app.zustand';
import {SuccessModal} from './Modal/App.popupReportSuccess.modal';

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
    switch (appModalType) {
      case 'POPUP_REPORT_COMPLETED':
        return (
          <SuccessModal
            mainTitle="소중한 제보 감사합니다!"
            subTitle={`제보하신 팝업은\nPOPPIN에서 검토 후 업로드됩니다.\n다시 한 번 POPPIN을 찾아주셔서 감사합니다.`}
            showIcon={true}
            onConfirm={() => {
              // 확인 버튼 클릭 시 추가 동작
              console.log('확인 버튼 클릭');
            }}
          />
        );
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
