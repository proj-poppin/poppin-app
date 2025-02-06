import create from 'zustand';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {useUserStore} from '../User/user.zustand';
import {
  axiosScrapInterestPopup,
  axiosUnscrapInterestPopup,
} from '../../Axios/Popup/popup.patch.axios';
import {PopupScrapSchema} from '../../Schema/Popup/popupScrap.schema';
import {
  addPopupListItem,
  appendVoteListItem,
  updateVoteListItem,
} from '../../Util/popup.util';
import {getJsonStorage, showBlackToast} from 'src/Util';
import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import {PopupVisitSchema} from 'src/Schema/Popup/popupVisit.schema';
import {axiosGetPopupsBySearchFiltering} from '../../Axios/Popup/popup.get.axios';
import {PageInfoType} from '../../Object/Type/pageInfo.type';
import {Alert} from 'react-native';
import {PopupWaitingSchema} from '../../Schema/Popup/popupWaiting.schema';
import {axiosRequestReopenPopup} from '../../Axios/Popup/popup.post.axios';
import {NotificationSchema} from '../../Schema/User/notification.schema';

type PopupStoreProps = {
  loadingStates: Record<string, boolean>; // 팝업 ID별 로딩 상태
  setLoadingState: (popupId: string, status: boolean) => void;
  recommendedPopupStores: PopupSchema[];
  popularTop5PopupStores: PopupSchema[];
  newlyOpenedPopupStores: PopupSchema[];
  closingSoonPopupStores: PopupSchema[];
  searchedPopupStores: PopupSchema[];
  pageInfo: PageInfoType; // Add pageInfo here
  interestedPopupStores: PopupSchema[];

  scrappedPopups: PopupScrapSchema[];
  waitingPopups: PopupWaitingSchema[];
  visitedPopups: PopupVisitSchema[];
  previousSearchParams: PopupSearchParams;
  setPopupVisits: (visitations: PopupVisitSchema[]) => void;

  scrappedPopupStores: PopupSchema[];
  visitedPopupStores: PopupSchema[];

  /**
   * 앱이 처음 실행되었을 때 받아온
   * 팝업 스토어 정보를 상태값에 저장합니다.
   */
  setInitialPopupStores: (param: {
    recommendedPopupStores: PopupSchema[];
    popularTop5PopupStores: PopupSchema[];
    newlyOpenedPopupStores: PopupSchema[];
    closingSoonPopupStores: PopupSchema[];
    searchedPopupStores: PopupSchema[];
    interestedPopupStores: PopupSchema[];
  }) => void;

  setPopupStoreActivities: (popupActivities: {
    scrappedPopups: PopupScrapSchema[];
    waitingPopups: PopupWaitingSchema[];
    visitedPopups: PopupVisitSchema[];
  }) => void;

  // * 취향 설정후 업데이트된 취향에 맞는 새로운 팝업을 불러오기위해 사용(홈랜딩화면에서 취향팝업만 예외적으로 SETTER 허용)
  setRecommendedPopupStores: (recommendedPopupStores: PopupSchema[]) => void;

  isVisitedPopup: (popupId: string) => boolean;

  isWaitingPopup: (popupId: string) => boolean;

  // /** 관심 팝업(스크랩한 팝업) 목록을
  //  *  상태값에 저장합니다. */
  // setScrappedPopupStore: (scrappedPopups: PopupScrapSchema[]) => void;

  togglePopupScrap: (
    popupId: string,
  ) => Promise<{updatedPopup: PopupSchema | null}>;

  /** 최신 팝업 정보를 다시 가져옵니다 */
  refreshPopupStores: () => Promise<void>;

  loadMorePopupStores: () => Promise<void>;

  /** 서버에 존재하는 모든 팝업을 가져왔는지 여부 */
  noMoreOlderPopupStores: boolean;

  getOlderPopupStores: (param: {param: PopupSearchParams}) => Promise<void>;

  appendOlderSearchPopupStores: (popups: PopupSchema[]) => void;

  /** 스크랩/방문한 팝업을 더 받아온 후 추가합니다. */
  appendScrappedOrVisitedPopupStores: (param: {
    popupStores: NotificationSchema[];
    type: 'SCRAPPED' | 'VISITED';
  }) => void;

  appendPopupVisited: (newPopupVisited: PopupVisitSchema) => void;

  /**
   * 팝업 상세 페이지를 들어가거나(차후에 조회수) 관심추가하거나, 방문하거나, 리뷰를 작성하여
   * 투표 정보가 업데이트 된 경우, 해당 정보를 전파합니다.
   * - (popup.detail.zustand) popupDetail 정보를 최신 팝업 정보로 업데이트 합니다.
   * - (popup.zustand) popupsStores, scrappedPopupStores, visitedPopupStores 의 해당 팝업을 최신 팝업 정보로 업데이트 합니다.
   */
  spreadPopupUpdated: (popup: PopupSchema) => void;

  spreadPopupVisited: (param: {
    popup: PopupSchema;
    newPopupVisit: PopupVisitSchema;
  }) => void;

  /** 팝업 재오픈 알림 받기를 구독/구독 취소합니다. */
  startWaitingPopup: (popupId: string) => Promise<{updatedPopup: PopupSchema | null}>;
  // cancelWaitingPopup: (popupId: string) => Promise<void>;

  /**
   * 사용자가 로그아웃/탈퇴하면
   * 스크랩/방문한 팝업 정보를 초기화하고
   * Async Storage 에 있는 팝업 참여 정보를 팝업 방문 목록에 저장합니다(이 줄은 비로그인 기획완료되면 넣기로)
   */
  logout: () => Promise<void>;
};

export const usePopupStore = create<PopupStoreProps>((set, get) => ({
  loadingStates: {}, // 초기 상태
  setLoadingState: (popupId, status) => {
    set(state => ({
      loadingStates: {...state.loadingStates, [popupId]: status},
    }));
  },
  popularTop5PopupStores: [],
  newlyOpenedPopupStores: [],
  closingSoonPopupStores: [],
  recommendedPopupStores: [],
  interestedPopupStores: [],
  searchedPopupStores: [] as PopupSchema[],
  pageInfo: {} as PageInfoType,
  scrappedPopups: [] as PopupScrapSchema[],
  waitingPopups: [] as PopupScrapSchema[],
  visitedPopups: [] as PopupVisitSchema[],
  previousSearchParams: {} as PopupSearchParams,
  setPopupVisits: (visitations: PopupVisitSchema[]) => {
    set({visitedPopups: visitations});
  },
  scrappedPopupStores: [] as PopupSchema[],
  visitedPopupStores: [] as PopupSchema[],

  getFilteredPopupStores: async (param: PopupSearchParams) => {
    try {
      const response = await axiosGetPopupsBySearchFiltering(param);
      if (response !== null) {
        set({
          searchedPopupStores: response.items,
          pageInfo: response.pageInfo,
        });
      }
    } catch (error) {}
  },
  loadMorePopupStores: async () => {
    const {pageInfo, searchedPopupStores} = get();
    if (pageInfo.isLast) {
      console.log('No more pages to load.');
      return;
    }

    // 이전에 사용한 검색 조건을 가져와 페이지네이션 정보를 덧붙입니다.
    const previousSearchParams = get().previousSearchParams;

    // 페이지 번호를 증가시켜 다음 페이지 데이터를 요청합니다.
    const param: PopupSearchParams = {
      ...previousSearchParams, // 이전 검색 조건 유지
      page: pageInfo.page + 1, // 다음 페이지 번호
    };

    try {
      const response = await axiosGetPopupsBySearchFiltering(param);
      if (response !== null) {
        set({
          searchedPopupStores: [...searchedPopupStores, ...response.items],
          pageInfo: response.pageInfo,
        });
      }
    } catch (error) {}
  },
  setInitialPopupStores: (param: {
    searchedPopupStores: PopupSchema[];
    popularTop5PopupStores: PopupSchema[];
    newlyOpenedPopupStores: PopupSchema[];
    closingSoonPopupStores: PopupSchema[];
    recommendedPopupStores: PopupSchema[];
    interestedPopupStores: PopupSchema[];
  }) => {
    set({
      popularTop5PopupStores: param.popularTop5PopupStores,
      newlyOpenedPopupStores: param.newlyOpenedPopupStores,
      closingSoonPopupStores: param.closingSoonPopupStores,
      recommendedPopupStores: param.recommendedPopupStores,
      interestedPopupStores: param.interestedPopupStores,
    });
  },

  setPopupStoreActivities: (popupActivities: {
    scrappedPopups: PopupScrapSchema[];
    waitingPopups: PopupWaitingSchema[];
    visitedPopups: PopupVisitSchema[];
  }) => {
    set({
      scrappedPopups: popupActivities.scrappedPopups,
      waitingPopups: popupActivities.waitingPopups,
      visitedPopups: popupActivities.visitedPopups,
    });
  },

  setRecommendedPopupStores: (recommendedPopupStores: PopupSchema[]) => {
    set(state => {
      if (
        JSON.stringify(state.recommendedPopupStores) ===
        JSON.stringify(recommendedPopupStores)
      ) {
        return state;
      }
      return {recommendedPopupStores};
    });
  },

  isVisitedPopup: (popupId: string) => {
    return get().visitedPopups.some(
      visitedPopup => visitedPopup.popupId.toString() === popupId.toString(),
    );
  },

  isWaitingPopup: (popupId: string) => {
    return get().waitingPopups.some(
      waitingPopup => waitingPopup?.popupId.toString() === popupId.toString(),
    );
  },

  setScrappedPopupStore: (scrappedPopups: PopupScrapSchema[]) => {
    set({scrappedPopups});
  },

  togglePopupScrap: async (popupId: string) => {
    const interestedPopupStores = get().interestedPopupStores || [];

    // `isAlreadyScrapped` 확인
    const isAlreadyScrapped = interestedPopupStores.some(
      popup => popup?.id.toString() === popupId.toString(),
    );

    // 이미 처리된 상태라면 해당 함수 바로 종료
    if (isAlreadyScrapped) {
      try {
        // Unscrap 처리
        const result = await axiosUnscrapInterestPopup(popupId);

        if (result) {
          set({
            scrappedPopups: get().scrappedPopups.filter(
              popup => popup?.popupId !== popupId,
            ),
            interestedPopupStores: interestedPopupStores.filter(
              popup => popup?.id.toString() !== popupId.toString(),
            ),
          });
          return {updatedPopup: result.data.updatedPopup};
        }
      } catch (error) {}
    } else {
      try {
        // Scrap 처리
        const result = await axiosScrapInterestPopup(popupId);

        if (result) {
          const updatedPopupSchema = result.data.updatedPopup as PopupSchema;
          set({
            scrappedPopups: [
              result.data.newPopupScrap,
              ...get().scrappedPopups,
            ],
            interestedPopupStores: [
              updatedPopupSchema,
              ...interestedPopupStores,
            ],
          });
          return {updatedPopup: updatedPopupSchema};
        }
      } catch (error) {}
    }

    // 실패한 경우 null 반환
    return {updatedPopup: null};
  },

  refreshPopupStores: async () => {},

  noMoreOlderPopupStores: false,

  getOlderPopupStores: async ({param}: {param: PopupSearchParams}) => {
    if (get().noMoreOlderPopupStores === true) {
      showBlackToast({
        text1: '더 가져올 팝업이 없습니다',
        visibilityTime: 1500,
      });
      return;
    }

    let response: {
      pageInfo: PageInfoType;
      items: PopupSchema[];
    } | null = null;

    try {
      response = await axiosGetPopupsBySearchFiltering(param);
      if (response === null) {
        return;
      }

      const olderPopupStores = response.items;

      if (olderPopupStores.length === 0) {
        set({noMoreOlderPopupStores: true});
      } else {
        set({
          searchedPopupStores: appendVoteListItem(
            olderPopupStores,
            get().searchedPopupStores,
          ),
          pageInfo: response.pageInfo,
        });
      }
    } catch (error) {}
  },
  // * Spread
  // * 업데이트된 팝업 정보 전파
  spreadPopupUpdated: (popup: PopupSchema) => {
    set({
      recommendedPopupStores: updateVoteListItem(
        popup,
        get().recommendedPopupStores,
      ),
      popularTop5PopupStores: updateVoteListItem(
        popup,
        get().popularTop5PopupStores,
      ),
      newlyOpenedPopupStores: updateVoteListItem(
        popup,
        get().newlyOpenedPopupStores,
      ),
      closingSoonPopupStores: updateVoteListItem(
        popup,
        get().closingSoonPopupStores,
      ),
      searchedPopupStores: updateVoteListItem(popup, get().searchedPopupStores),
      scrappedPopupStores: updateVoteListItem(popup, get().scrappedPopupStores),
      visitedPopupStores: updateVoteListItem(popup, get().visitedPopupStores),
      interestedPopupStores: updateVoteListItem(
        popup,
        get().interestedPopupStores,
      ),
    });
  },

  spreadPopupVisited: (param: {
    popup: PopupSchema;
    newPopupVisit: PopupVisitSchema;
  }) => {
    get().appendPopupVisited(param.newPopupVisit);
    set({
      visitedPopupStores: addPopupListItem(
        param.popup,
        get().visitedPopupStores,
      ),
      scrappedPopupStores: updateVoteListItem(
        param.popup,
        get().scrappedPopupStores,
      ),
      popularTop5PopupStores: updateVoteListItem(
        param.popup,
        get().popularTop5PopupStores,
      ),
      newlyOpenedPopupStores: updateVoteListItem(
        param.popup,
        get().newlyOpenedPopupStores,
      ),
      closingSoonPopupStores: updateVoteListItem(
        param.popup,
        get().closingSoonPopupStores,
      ),
      recommendedPopupStores: updateVoteListItem(
        param.popup,
        get().recommendedPopupStores,
      ),
      interestedPopupStores: updateVoteListItem(
        param.popup,
        get().interestedPopupStores,
      ),
    });
  },

  appendOlderSearchPopupStores: (popups: PopupSchema[]) => {
    set({
      searchedPopupStores: appendVoteListItem(
        popups,
        get().searchedPopupStores,
      ),
    });
  },

  appendScrappedOrVisitedPopupStores: (param: {
    popupStores: PopupSchema[];
    type: 'SCRAPPED' | 'VISITED';
  }) => {
    switch (param.type) {
      case 'SCRAPPED':
        set({
          scrappedPopupStores: appendVoteListItem(
            param.popupStores,
            get().scrappedPopupStores,
          ),
        });
        break;
      case 'VISITED':
        set({
          visitedPopupStores: appendVoteListItem(
            param.popupStores,
            get().visitedPopupStores,
          ),
        });
        break;
    }
    return;
  },

  startWaitingPopup: async (popupId: string) => {
    const result = await axiosRequestReopenPopup(popupId);
    if (result === null) {
     return {updatedPopup: null};
    }
    set({
      waitingPopups: [result.newPopupWaiting, ...get().waitingPopups],
    });
    return {updatedPopup: result.updatedPopup};
  },

  // TODO 기획에 따른 보류
  // cancelWaitingPopup: async (popupId: string) => {
  //   const result = await axiosRequestReopenPopup(popupId);
  //   if (result === null) {
  //     return;
  //   }
  //   set({
  //     waitingPopups: get().waitingPopups.filter(
  //       waitingPopup => waitingPopup?.popupId !== popupId,
  //     ),
  //   });
  // },
  appendPopupVisited: (newPopupVisited: PopupVisitSchema) => {
    set({
      visitedPopups: [newPopupVisited, ...get().visitedPopups],
    });
  },

  logout: async () => {
    const nonMemberParticipations = await getJsonStorage(
      'INTERESTED_POPUP_SCRAPS',
    );

    set({
      scrappedPopups: [],
      visitedPopups:
        nonMemberParticipations !== null
          ? (nonMemberParticipations as PopupVisitSchema[])
          : [],
      scrappedPopupStores: [],
      visitedPopupStores: [],
      interestedPopupStores: [], // interestedPopupStores(관심팝업) 초기화
    });
  },
}));
