import React from 'react';
import {BlankPopup, PopupSchema} from '../../../../Schema/Popup/popup.schema';
import {createContext, useContext, useState} from 'react';
import {axiosGetPopupById} from '../../../../Axios/Popup/popup.get.axios';
import {usePopupStore} from '../../../../Zustand/Popup/popup.zustand';
import {useAppStore} from '../../../../Zustand/App/app.zustand';
import {axiosVisitPopupStore} from '../../../../Axios/Popup/popup.post.axios';

export type VisitButtonType =
  | 'VISIT_NOW'
  | 'VISIT_COMPLETE'
  | 'RECEIVE_REOPEN_ALERT';

export type PopupDetailModalType =
  | undefined
  | 'NO_POPUP_STORES_NEARBY' // 50M 근처 팝업 스토어 없음
  | 'REVIEW_REPORT' // 리뷰 신고
  | 'REPORT_SUCCESS' // 신고 성공
  | 'CLOSE' // 팝업 마감
  | 'ERROR_TRY_AGAIN' // 오류 발생, 재시도 요청
  | 'UNSCRAP'; // 스크랩 취소

type PopupDetailContextProp = {
  randomizeOffset: number;

  /** 팝업 상세 정보 */
  popupDetail: PopupSchema;
  setPopupDetail: (popupDetail: PopupSchema) => void;
  /**
   * 최신 팝업 정보를 가져옵니다. 팝업이 삭제되거나 블락된 경우,
   * 팝업 삭제됨 모달을 띄우고 해당 내용을 전파합니다.
   */
  getRecentPopupDetail: (popupId: string) => Promise<void>;

  /** 팝업 상세 페이지에서 보여주는 모달 표시 여부 */
  popupDetailModalVisible: boolean;
  setPopupDetailModalVisible: (status: boolean) => void;
  /** 투표 상세 페이지에서 보여주는 모달 종류 */
  popupDetailModalType: PopupDetailModalType;
  showPopupDetailModal: (type: PopupDetailModalType) => void;

  setPopupDetailModalProps: (props: any) => void;

  /** 팝업 처리중 여부 */
  scrapping: boolean;
  /** 팝업을 스크랩합니다 */
  scrapPopup: () => Promise<void>;
  /** 팝업 스크랩을 취소합니다 */
  unScrapPopup: () => Promise<boolean>;

  /** 방문 참여 중 여부 */
  visiting: boolean;
  setVisiting: (status: boolean) => void;

  /** 방문 참여 버튼 타입 */
  visitPopup: () => Promise<void>;
  visitButtonType: VisitButtonType;
};

const PopupDetailContext = createContext<PopupDetailContextProp>({
  randomizeOffset: 0,
  popupDetail: BlankPopup,
  setPopupDetail: () => {},
  getRecentPopupDetail: async () => {},
  popupDetailModalVisible: false,
  setPopupDetailModalVisible: () => {},
  popupDetailModalType: undefined,
  showPopupDetailModal: () => {},
  setPopupDetailModalProps: () => {},
  scrapping: false,
  scrapPopup: async () => {},
  unScrapPopup: async () => false,
  visiting: false,
  setVisiting: () => {},
  visitPopup: async () => {},
  visitButtonType: 'VISIT_NOW',
});

/**
 * 팝업 상세 페이지의 상태값을 사용하고 싶다면, 이 함수를 import 하여 사용하면 됩니다.
 *
 * @example
 * ```
 * const { popupDetail, setPopupDetail } = usePopupDetailContext();
 * ```
 */

export const usePopupDetailContext = () => useContext(PopupDetailContext);

/**
 * 팝업 상세 페이지에서 사용되는 상태값을 제공하는 Context Provider 입니다.
 * 팝업 상세 페이지는 여러 개가 존재할 수 있기 때문에 Zustand 대신 useContext 를 사용합니다.
 * @author 도형
 */

export const PopupDetailProvider = ({children}: {children: any}) => {
  const [popupDetail, setPopupDetail] = useState<PopupSchema>(BlankPopup);
  const [visitButtonType, setVisitButtonType] =
    useState<VisitButtonType>('VISIT_NOW');

  const visitPopup = async () => {
    const response = await axiosVisitPopupStore(popupDetail.id);
    if (response?.updatedPopup) {
      setPopupDetail(response.updatedPopup);
      setVisitButtonType('VISIT_COMPLETE');
    }
  };

  const [popupDetailModalVisible, setPopupDetailModalVisible] =
    useState<boolean>(false);
  const [popupDetailModalType, setPopupDetailModalType] =
    useState<PopupDetailModalType>(undefined);
  const [popupDetailModalProps, setPopupDetailModalProps] = useState<any>({});
  const [scrapping, setScrapping] = useState<boolean>(false);

  const [visiting, setVisiting] = useState<boolean>(false);
  const [randomizeOffset, setRandomizeOffset] = useState(Math.random());

  const getRecentPopupDetail = async (popupId: string) => {
    // 팝업 상세 정보 가져오기
    const popup = await axiosGetPopupById(popupId);

    if (popup === null) return;
    setPopupDetail(popup);
    usePopupStore.getState().spreadPopupUpdated(popup);
  };

  const showPopupDetailModal = (type: PopupDetailModalType) => {
    setPopupDetailModalType(type);
    setPopupDetailModalVisible(true);
  };

  const scrapPopup = async () => {
    if (!useAppStore.getState().checkLoginAndShowModal('POPUP_SCRAP')) return;

    if (scrapping) return;
    setScrapping(true);
    const {updatedPopup} = await usePopupStore
      .getState()
      .togglePopupScrap(popupDetail.id);
    if (updatedPopup) {
      setPopupDetail(updatedPopup);
    }
    setScrapping(false);
  };
  const unScrapPopup = async () => {
    console.log('unScrapPopup');
    if (scrapping) return false;

    setScrapping(true);
    const {updatedPopup} = await usePopupStore
      .getState()
      .togglePopupScrap(popupDetail.id);
    if (updatedPopup) {
      setPopupDetail(updatedPopup);
    }
    setScrapping(false);
    return true;
  };

  const popupDetailContext = {
    randomizeOffset,
    popupDetail,
    setPopupDetail,
    getRecentPopupDetail,
    popupDetailModalVisible,
    setPopupDetailModalVisible,
    popupDetailModalType,
    showPopupDetailModal,
    setPopupDetailModalProps,
    scrapping,
    scrapPopup,
    unScrapPopup: unScrapPopup,
    visiting,
    setVisiting,
    visitPopup,
    visitButtonType,
  };

  return (
    <PopupDetailContext.Provider
      value={popupDetailContext}
      children={children}
    />
  );
};
