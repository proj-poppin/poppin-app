import {Destination} from 'src/Util';
import create from 'zustand';
import {axiosLoadInitialData} from 'src/Axios/App/app.axios';
import {usePopupStore} from '../Popup/popup.zustand';
import Config from 'react-native-config';
import {PopupSearchParams} from '../../Object/Type/filtering.type';
import {PopupSortOrder} from '../../Object/Type/popupSortOrder.type';
import {usePopupScreenStore} from '../../Screen/Popup/Landing/Popup.landing.zustand';
import {OperationStatus} from '../../Object/Type/operationStatus.type';

export type HomeLandingSectionType =
  | 'NEWLY_OPENED'
  | 'CLOSING_SOON'
  | 'POPULAR_TOP5'
  | 'PREFERENCE_TARGETED';

/** 앱 전역 모달 표시 사유 */
export type AppModalType =
  | undefined
  | 'INDUCE_UPDATE'
  | 'REQUIRE_LOGIN'
  | 'COMPLETE_SIGNUP'
  | 'ALREADY_REGISTERED_EMAIL'
  | 'REGISTERED_WITH_DIFFERENT_METHOD'
  | 'NO_POPUP_STORES_NEARBY' // 50M 근처 팝업 스토어 없음
  | 'REPORT_SUCCESS' // 신고 성공
  | 'POPUP_REPORT_SUCCESS'
  | 'ERROR_TRY_AGAIN' // 오류 발생, 재시도 요청
  | 'SUBMIT_REVIEW_CONFIRMATION' // 후기를 제출할 것인지 확인
  | 'REVIEW_SUBMITTED' // 후기 제출 완료
  | 'MODIFY_REQUEST_SUCCESS' // 요청이 정상적으로 접수됨
  | 'RESIGN_CONFIRMATION' // 계정 탈퇴 확인
  | 'INQUIRY_SUBMISSION_CONFIRMATION'
  | 'PROFILE_UPDATED' // 프로필 설정 변경 완료
  | 'POPUP_REPORT_COMPLETED';

/** 로그인 요구 모달 타입 (표시된 이유) */
type RequireLoginModalType =
  | 'POPUP_SCRAP'
  | 'POPUP_VISIT'
  | 'POPUP_REVIEW'
  | 'POPUP_MODIFY'
  | 'POPUP_REPORT'
  | 'POPUP_BLOCK'
  | 'POPUP_MODIFY_REQUEST'
  | 'REVIEW_REPORT'
  | 'POPUP_INQUIRY'
  | 'ALARM'
  | 'USER_BLOCK'
  | 'PROFILE_INFO_UPDATE';

type AppModalProps = {
  requireLogin?: {type: RequireLoginModalType};
};

type AppStoreProps = {
  bootstrapped: boolean;
  setBootStrapped: (status: boolean) => void;

  initialDestination: undefined | Destination;
  setInitialDestination: (destination: undefined | Destination) => void;

  /** 앱 전반에서 사용되는 모달 표시 여부 */
  appModalVisible: boolean;
  setAppModalVisible: (status: boolean) => void;

  /** 표시될 앱 모달 종류 */
  appModalType: AppModalType;
  showAppModal: (type: AppModalType, props?: AppModalProps) => void;

  appModalProps: AppModalProps;
  setAppModalProps: (props: AppModalProps) => void;

  getDynamicConstants: () => Promise<void>;

  /** 앱 시작 후 최초 정보들(최신 팝업정보, 공지사항 등)을 받아오고 저장합니다. */
  loadInitialData: () => Promise<boolean>;

  /**
   * 로그인이 필요한 기능에 접근할 때 호출합니다.
   * 사용자가 로그인 했는지 확인하고
   * 로그인 되어있지 않은 경우 로그인 요구 모달을 띄우며 false 를 반환합니다.
   * 로그인한 상태인 경우 true 를 반환합니다.
   */
  checkLoginAndShowModal: (type: RequireLoginModalType) => boolean;
  // /**
  //  * 본인인증이 필요한 기능에 접근할 때 호출합니다.
  //  * 사용자가 본인인증을 했는지 확인하고
  //  * 본인인증 되어있지 않은 경우 본인인증 요구 모달을 띄우며 false 를 반환합니다.
  //  * 본인인증한 상태인 경우 true 를 반환합니다.
  //  */
  // checkCertificateAndShowModal: (type: RequireCertificateModalType) => boolean;
  // /**
  //  * 학생증이 필요한 기능에 접근할 때 호출합니다.
  //  * 사용자가 학생 인증을 진행했는지 확인하고
  //  * 학생증이 등록되어있지 않은 경우 학생증 요구 모달을 띄우며 false 를 반환합니다.
  //  * 학생증이 등록되어있는 경우 true 를 반환합니다.
  //  */
  // checkStudentCertificateAndShowModal: (action: string) => boolean;
  // /** 본인인증 요구 모달 내용 */
  // requireCertificateModalType: RequireCertificateModalType;
};

/**
 * 앱 전체에서 사용되거나, 하나의 페이지에 지정하기 어려운 상태값들입니다.
 * @author 도형
 */

export const useAppStore = create<AppStoreProps>((set, get) => ({
  bootstrapped: false,
  setBootStrapped: (status: boolean) => {
    set({bootstrapped: status});
  },

  initialDestination: undefined,
  setInitialDestination: (destination: undefined | Destination) => {
    set({initialDestination: destination});
  },

  appModalVisible: false,
  setAppModalVisible: (status: boolean) => {
    set({appModalVisible: status});
  },
  appModalType: undefined,
  showAppModal: (type: AppModalType, props?: AppModalProps) => {
    set({
      appModalType: type,
      appModalVisible: true,
      ...(props ? {appModalProps: props} : {}),
    });
  },

  appModalProps: {},
  setAppModalProps: (props: AppModalProps) => {
    set({appModalProps: props});
  },

  getDynamicConstants: async () => {
    // const constants = await axiosGetAppConstants();
    // if (constants !== null) {
    //   useDynamicServiceConstant
    //     .getState()
    //     .updateServiceConstants(constants.service);
    //   useDynamicResearchConstant
    //     .getState()
    //     .updateResearchConstants(constants.research);
    //   useDynamicUserConstant.getState().updateUserConstants(constants.user);
    //   useDynamicVoteConstant.getState().updateVoteConstants(constants.vote);
    //   useDynamicCompanyConstant
    //     .getState()
    //     .updateCompanyConstants(constants.company);
    //   useDynamicCreditConstant
    //     .getState()
    //     .updateCreditConstants(constants.credit);
    // }
  },

  loadInitialData: async () => {
    const initialData = await axiosLoadInitialData();
    console.log('initialData', initialData);
    if (initialData === null) return false;

    // Load initial data for each operation status
    const notyetTabSearchParams: PopupSearchParams = {
      operationStatus: OperationStatus.NOTYET,
      searchName: '',
      filteringThreeCategories: '000',
      order: PopupSortOrder.RECENTLY_OPENED,
      filteringFourteenCategories: '00000000000000',
      page: 0,
      size: 10,
    };
    const operatingTabSearchParams: PopupSearchParams = {
      operationStatus: OperationStatus.OPERATING,
      searchName: '',
      filteringThreeCategories: '000',
      order: PopupSortOrder.RECENTLY_OPENED,
      filteringFourteenCategories: '00000000000000',
      page: 0,
      size: 10,
    };
    const terminatedTabSearchParams: PopupSearchParams = {
      operationStatus: OperationStatus.TERMINATED,
      searchName: '',
      filteringThreeCategories: '000',
      order: PopupSortOrder.RECENTLY_OPENED,
      filteringFourteenCategories: '00000000000000',
      page: 0,
      size: 10,
    };

    // Load for each operation status
    await usePopupScreenStore
      .getState()
      .getFilteredPopupStores(OperationStatus.NOTYET, operatingTabSearchParams);
    await usePopupScreenStore
      .getState()
      .getFilteredPopupStores(
        OperationStatus.OPERATING,
        operatingTabSearchParams,
      );
    await usePopupScreenStore
      .getState()
      .getFilteredPopupStores(
        OperationStatus.TERMINATED,
        terminatedTabSearchParams,
      );

    usePopupStore.getState().setInitialPopupStores({
      recommendedPopupStores: initialData.data.recommendedPopupStores,
      popularTop5PopupStores: initialData.data.popularTop5PopupStores,
      newlyOpenedPopupStores: initialData.data.newlyOpenedPopupStores,
      closingSoonPopupStores: initialData.data.closingSoonPopupStores,
      searchedPopupStores: initialData.data.filteredPopupStores,
      interestedPopupStores: initialData.data.interestedPopupStores,
    });

    // 디버깅용으로 저장된 상태 확인
    const currentState = usePopupStore.getState();
    console.log('State after initial load:', {
      newlyOpenedPopupStores: currentState.newlyOpenedPopupStores,
      closingSoonPopupStores: currentState.closingSoonPopupStores,
      popularTop5PopupStores: currentState.popularTop5PopupStores,
      recommendedPopupStores: currentState.recommendedPopupStores,
    });
    return true;
  },

  checkLoginAndShowModal: (type: RequireLoginModalType) => {
    // if (!useUserStore.getState().isLoggedIn()) {
    //   set({
    //     appModalVisible: true,
    //     appModalType: 'REQUIRE_LOGIN',
    //     appModalProps: {requireLogin: {type}},
    //   });
    //   return false;
    // }
    return true;
  },

  //   checkCertificateAndShowModal: (type: RequireCertificateModalType) => {
  //     if (!useUserStore.getState().isCertified()) {
  //       set({
  //         appModalVisible: true,
  //         appModalType: 'REQUIRE_CERTIFICATE',
  //         appModalProps: { requireCertificate: { type } },
  //       });
  //       makeFirebaseLogEvent(APP_LOGS.try_action_without_cert(type));
  //       return false;
  //     }
  //     return true;
  //   },
  //
  //   checkStudentCertificateAndShowModal: (action: string) => {
  //     if (!useUserStore.getState().isStudentUser({ strict: false })) {
  //       set({
  //         appModalVisible: true,
  //         appModalType: 'REQUIRE_STUDENT_CERTIFICATE',
  //       });
  //       makeFirebaseLogEvent(APP_LOGS.try_action_without_stud_cert(action));
  //       return false;
  //     }
  //     return true;
  //   },
  //
  //   requireCertificateModalType: 'RESEARCH_PARTICIPATE',
}));
