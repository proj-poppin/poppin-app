// // type ResearchDetailModalType =
// //   | undefined
// //   | 'ALREADY_DELETED'
// //   | 'ASK_PROPERTY'
// //   | 'CAUTIONS'
// //   | 'SHARE'
// //   | 'UNSCRAP'
// //   | 'UNAVAILABLE'
// //   | 'INDUCE_LOGIN'
// //   | 'INDUCE_SHARING'
// //   | 'ACHIEVE_GOAL'
// //   | 'BEFORE_CONFIRM'
// //   | 'BEFORE_PAID'
// //   | 'CLOSE'
// //   | 'DELETE'
// //   | 'PULLUP'
// //   | 'UNABLE_TO_DELETE'
// //   | 'UNABLE_TO_EDIT'
// //   | 'COMMENT'
// //   | 'REPORT_COMMENT'
// //   | 'REPORT'
// //   | 'REPORT_SUCCEED'
// //   | 'ZERO_REWARD_CAUTION';
//
// import create from 'zustand';
// import {ScrollView} from 'react-native';
// import {RefObject} from 'react';
// import { BlankPopup, PopupSchema } from "../../../Schema/Popup/popup.schema";
// import {PopupDetailScreenProps} from '../../../Screen/Detail/Popup.detail.screen';
// import { AppModalType } from "../../App/app.zustand";
//
// type VisitButtonType =
//   | 'VISIT_NOW' // 방문하기
//   | 'VISIT_COMPLETE' // 방문 완료
//   | 'RECEIVE_REOPEN_ALERT'; // 재오픈 알림받기
//
// type PopupDetailScreenStoreProps = {
//   scrollViewRef: RefObject<ScrollView>;
//   screenAccessed: boolean;
//   /** 화면에 보여지는 팝업 정보 */
//   popupDetail: PopupSchema;
//   setPopupDetail: (popupDetail: PopupSchema) => void;
//
//   /** 화면에 접근할 때마다 호출. 화면에 보여질 정보를 업데이트합니다. */
//   setScreenInfo: (props: PopupDetailScreenProps) => Promise<void>;
//   /** 최신 프로젝트 정보를 받아오고 있는 중인지 여부. 이 값이 true 라면, 하단 버튼이 보이지 않습니다. */
//   loading: boolean;
//   /** 프로젝트 상세페이지에서 async 응답 대기 중인지 여부 */
//   inProgress: boolean;
//
//   /**
//    * 최신 프로젝트 정보를 가져와 업데이트합니다.
//    * 프로젝트 상태에 따라 아래의 모달 중 하나를 띄울 수 있습니다.
//    *
//    *  - ALREADY_DELETED: 이미 삭제된 프로젝트인 경우
//    *  - ACHIEVE_GOAL: (작성자) 목표 참여자 인원을 달성한 경우
//    *  - BEFORE_CONFIRM: (작성자) 검수 대기 중인 프로젝트에 접근한 경우
//    *  - BEFORE_PAID: (작성자) 결제 대기 중인 프로젝트에 접근한 경우
//    *  - USER_PROPERTY: (참여자) 고급 스크리닝 조건을 사용하는 프로젝트이면서, 사용자가 해당 조건에 대한 정보가 없는 경우
//    *  - UNAVAILABLE: (참여자) 승인/결제가 완료되지 않은 프로젝트에 접근한 경우
//    */
//   updatePopupVisitDetail: (
//     popupId: number,
//     options?: {silent?: boolean},
//   ) => Promise<void>;
//   /** 모달을 띄우지 않고 최신 프로젝트 정보를 가져와 업데이트합니다. */
//   silentlyUpdateResearchDetail: (researchId?: string) => Promise<void>;
//
//   popupDetailModalVisible: boolean;
//   setPopupDetailModalVisible: (status: boolean) => void;
//   showPopupDetailModal: (type: AppModalType) => void;
//
// };
//
// export const usePopupDetailScreenStore = create<PopupDetailScreenStoreProps>((set, get) => ({
//   scrollViewRef: { current: null },
//
//   popupDetail: BlankPopup,
//   setPopupDetail: (popupDetail: PopupSchema) => set({popupDetail}),
//
//   loading: false,
//   inProgress: false,
//
//     setScreenInfo: async (props: PopupDetailScreenProps) => {
//       let popupId = 1;
//       if ('popup' in props) {
//         popupId = props.popup.id;
//         set({ popupDetail: props.popup });
//       } else {
//         popupId = props.popupId;
//       }
//       if (popupId === '') return;
//
//       await Promise.all([
//         get().updatePopupVisitDetail(popupId, {
//           //* 이미 접근했던 프로젝트인 경우, 정보만 업데이트 하고 모달을 띄우지 않습니다.
//           silent: get().screenAccessed,
//         }),
//       ]);
//     },
//
//     },

// import {RefObject} from 'react';
// import {ScrollView} from 'react-native';
// import {PopupSchema} from '../../../Schema/Popup/popup.schema';
// import {PopupDetailScreenProps} from '../../../Screen/Detail/Popup.detail.screen';
//
// type PopupDetailModalType =
//   | undefined
//   | 'UNSCRAP'
//   | 'UNAVAILABLE'
//   | 'INDUCE_LOGIN'
//   | 'INDUCE_SHARING';
//
// type PopupDetailScreenStoreProps = {
//   scrollViewRef: RefObject<ScrollView>;
//   screenAccessed: boolean;
//
//   /** 팝업을 공유한 유저 id */
//   sharerId?: string;
//   setSharerId: (sharerId?: string) => void;
//   /** 화면에 보여지는 프로젝트 정보 */
//   popupDetail: PopupSchema;
//   setPopupDetail: (researchDetail: PopupSchema) => void;
//   /** 화면에 접근할 때마다 호출. 화면에 보여질 정보를 업데이트합니다. */
//   setScreenInfo: (props: PopupDetailScreenProps) => Promise<void>;
//   /** 최신 프로젝트 정보를 받아오고 있는 중인지 여부. 이 값이 true 라면, 하단 버튼이 보이지 않습니다. */
//   loading: boolean;
//   /** 프로젝트 상세페이지에서 async 응답 대기 중인지 여부 */
//   inProgress: boolean;
//
//   updatePopupDetail: (
//     popupId: number,
//     options?: {silent?: boolean},
//   ) => Promise<void>;
//   /** 모달을 띄우지 않고 최신 프로젝트 정보를 가져와 업데이트합니다. */
//   silentlyUpdateResearchDetail: (popupId?: number) => Promise<void>;
//
//   checkAndShowResearchDetailModal: (param: {research: ResearchSchema}) => void;
//
//   /** 프로젝트 상세 페이지 모달 표시 여부 */
//   researchDetailModalVisible: boolean;
//   setResearchDetailModalVisible: (status: boolean) => void;
//   researchDetailModalType: ResearchDetailModalType;
//   showResearchDetailModal: (type: ResearchDetailModalType) => void;
//   changeResearchDetailModalType: (type: ResearchDetailModalType) => void;
//
//   /** 프로젝트를 조회합니다. */
//   viewResearch: () => Promise<void>;
//   /** 프로젝트를 스크랩합니다. */
//   scrapResearch: () => Promise<void>;
//   /** 프로젝트를 스크랩을 취소합니다. */
//   unscrapResearch: () => Promise<boolean>;
//
//   clearStates: () => void;
// };
