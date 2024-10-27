import React from 'react';
import {createContext, useContext, useState} from 'react';
import {usePopupDetailContext} from './Popup.detail.provider';
import {PopupReportOptions} from '../../../../Constant/popup.constant';
import {showBlackToast} from '../../../../Util';
import {axiosReportPopup} from '../../../../Axios/Popup/popup.post.axios';

type PopupDetailReportProviderProp = {
  /** 팝업 신고 옵션들 */
  popupReportOptions: string[];
  /** 선택된 팝업 신고 옵션 인덱스들 */
  selectedReportOptionIndexes: number[];
  /** 팝업 신고 옵션 터치시 실행 함수 */
  onPressReportOption: (index: number) => void;

  /** 투표 및 (대)댓글 신고 중 여부 */
  reporting: boolean;
  /** 투표를 신고합니다 */
  reportPopup: (etcInput: string) => Promise<void>;
};

const PopupDetailReportContext = createContext<PopupDetailReportProviderProp>({
  popupReportOptions: [],
  selectedReportOptionIndexes: [],
  onPressReportOption: () => {},
  reporting: false,
  reportPopup: async () => {},
});

export const usePopupDetailReportContext = () =>
  useContext(PopupDetailReportContext);

/**
 * 팝업 상세 페이지에서 신고와 관련된 상태값을 제공하는 Context Provider입니다.
 * @author 도형
 */

export const PopupDetailReportProvider = ({children}: {children: any}) => {
  const [selectedReportOptionIndexes, setSelectedReportOptionIndexes] =
    useState<number[]>([]);
  const [reporting, setReporting] = useState<boolean>(false);

  const {popupDetail, showPopupDetailModal, setPopupDetailModalVisible} =
    usePopupDetailContext();

  const popupReportOptions = PopupReportOptions;

  const onPressReportOption = (index: number) => {
    console.log('index', index);
    setSelectedReportOptionIndexes([index]);
  };

  const reportPopup = async (etcInput: string) => {
    //* 신고 사유 선택이 되지 않았거나 이미 신고 중인 경우
    //* 곧바로 return 합니다.
    if (reporting) return;
    if (selectedReportOptionIndexes.length === 0) {
      showBlackToast({text1: `신고 항목을 선택해주세요`});
      return;
    }
    setReporting(true);

    const result = await axiosReportPopup({
      popupId: popupDetail.id,
      //* 신고 사유로 '기타'를 선택한 경우, 사용자가 입력한 내용을 사용합니다.
      reportContent: selectedReportOptionIndexes.includes(
        popupReportOptions.length - 1,
      )
        ? `기타: ${etcInput}`
        : popupReportOptions[selectedReportOptionIndexes[0]],
    });
    //* 신고가 성공적으로 이뤄진 경우
    //* 신고 관련 상태값을 모두 초기화하며, 신고 모달 대신 신고 완료 모달을 띄웁니다.
    if (result) {
      setSelectedReportOptionIndexes([]);
      showPopupDetailModal('REPORT_SUCCESS');
    }

    setReporting(false);
    return;
  };

  const popupDetailReportContext = {
    popupReportOptions,
    selectedReportOptionIndexes,
    onPressReportOption,
    reporting,
    reportPopup,
  };

  return (
    <PopupDetailReportContext.Provider
      value={popupDetailReportContext}
      children={children}
    />
  );
};
