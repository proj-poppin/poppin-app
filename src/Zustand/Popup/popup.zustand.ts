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

type PopupStoreProps = {
  recommendedPopupStores: PopupSchema[];
  popularTop5PopupStores: PopupSchema[];
  newlyOpenedPopupStores: PopupSchema[];
  closingSoonPopupStores: PopupSchema[];
  searchedPopupStores: PopupSchema[];
  interestedPopupStores: PopupSchema[];

  popupScraps: PopupScrapSchema[];
  popupVisits: PopupVisitSchema[];
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
    popupScraps: PopupScrapSchema[];
    popupVisits: PopupVisitSchema[];
  }) => void;

  // /** 관심 팝업(스크랩한 팝업) 목록을
  //  *  상태값에 저장합니다. */
  // setScrappedPopupStore: (popupScraps: PopupScrapSchema[]) => void;

  togglePopupScrap: (
    popupId: string,
  ) => Promise<{updatedPopup: PopupSchema | null}>;

  /** 최신 팝업 정보를 다시 가져옵니다 */
  refreshPopupStores: () => Promise<void>;

  /** 서버에 존재하는 모든 팝업을 가져왔는지 여부 */
  noMoreOlderPopupStores: boolean;

  getOlderPopupStores: (param: {param: PopupSearchParams}) => Promise<void>;

  appendOlderSearchPopupStores: (popups: PopupSchema[]) => void;

  /** 스크랩/방문한 팝업을 더 받아온 후 추가합니다. */
  appendScrappedOrVisitedPopupStores: (param: {
    popupStores: PopupSchema[];
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
    newPopupParticipation: PopupVisitSchema;
  }) => void;

  /**
   * 사용자가 로그아웃/탈퇴하면
   * 스크랩/방문한 팝업 정보를 초기화하고
   * Async Storage 에 있는 팝업 참여 정보를 팝업 방문 목록에 저장합니다(이 줄은 비로그인 기획완료되면 넣기로)
   */
  logout: () => Promise<void>;
};

export const usePopupStore = create<PopupStoreProps>((set, get) => ({
  popularTop5PopupStores: [],
  newlyOpenedPopupStores: [],
  closingSoonPopupStores: [],
  recommendedPopupStores: [],
  interestedPopupStores: [],
  searchedPopupStores: [],
  popupScraps: [] as PopupScrapSchema[],
  popupVisits: [] as PopupVisitSchema[],
  setPopupVisits: (visitations: PopupVisitSchema[]) => {
    set({popupVisits: visitations});
  },
  scrappedPopupStores: [] as PopupSchema[],
  visitedPopupStores: [] as PopupSchema[],

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
    popupScraps: PopupScrapSchema[];
    popupVisits: PopupVisitSchema[];
  }) => {
    set({
      popupScraps: popupActivities.popupScraps,
      popupVisits: popupActivities.popupVisits,
    });
  },

  // setScrappedPopupStore: scrappedPopupStore => {
  //   set({interestedPopupStores: [scrappedPopupStore]});
  // },
  setScrappedPopupStore: (popupScraps: PopupScrapSchema[]) => {
    set({popupScraps});
  },

  togglePopupScrap: async (popupId: string) => {
    if (!useUserStore.getState().isLoggedIn()) {
      return {updatedPopup: null};
    }
    let updatedPopup: PopupSchema | null = null;
    const previousPopupScrap = get().interestedPopupStores.find(
      popup => popupId === popup.id,
    );
    if (previousPopupScrap === undefined) {
      //* 스크랩하지 않았던 투표인 경우
      const result = await axiosScrapInterestPopup(popupId);
      if (result !== null) {
        set({popupScraps: [result.newPopupScrap, ...get().popupScraps]});
        updatedPopup = result.updatedPopup;
      }
    } else {
      //* 스크랩한 투표인 경우
      const result = await axiosUnscrapInterestPopup(popupId);
      if (result) {
        set({
          popupScraps: get().popupScraps.filter(
            popupScrap => popupScrap.popupId !== popupId,
          ),
        });
        updatedPopup = result.updatedPopup;
      }
    }
    if (updatedPopup !== null) {
      get().spreadPopupUpdated(updatedPopup);
    }
    return {updatedPopup};
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
      updatedPopupStores: PopupSchema[];
    } | null = null;
    if (get().searchedPopupStores.length === 0) {
      Alert.alert('팝업이 없습니다1.');
      response = await axiosGetPopupsBySearchFiltering(param);
    } else {
      const lastPopupId = get().searchedPopupStores.slice(-1)[0].id;

      if (!Boolean(lastPopupId)) return;

      Alert.alert('팝업이 없습니다2.');

      response = await axiosGetPopupsBySearchFiltering({
        ...param,
        lastPopupId,
      });
    }

    if (response === null) {
      return;
    }

    const olderPopupStores = response.updatedPopupStores; // updatedPopupStores만 추출

    set({
      searchedPopupStores: appendVoteListItem(
        olderPopupStores,
        get().searchedPopupStores,
      ),
    });

    return;
  },

  // * Spread
  // * 업데이트된 팝업 정보 전파
  spreadPopupUpdated: (popup: PopupSchema) => {
    console.log('spreadPopupUpdated');
    set({
      // recommendedPopupStores: updateVoteListItem(
      //   popup,
      //   get().recommendedPopupStores,
      // ),
      // popularTop5PopupStores: updateVoteListItem(
      //   popup,
      //   get().popularTop5PopupStores,
      // ),
      // newlyOpenedPopupStores: updateVoteListItem(
      //   popup,
      //   get().newlyOpenedPopupStores,
      // ),
      // closingSoonPopupStores: updateVoteListItem(
      //   popup,
      //   get().closingSoonPopupStores,
      // ),
      // searchedPopupStores: updateVoteListItem(popup, get().searchedPopupStores),
      // scrappedPopupStores: updateVoteListItem(popup, get().scrappedPopupStores),
      // visitedPopupStores: updateVoteListItem(popup, get().visitedPopupStores),
      // interestedPopupStores: updateVoteListItem(
      //   popup,
      //   get().interestedPopupStores,
      // ),
    });
  },

  spreadPopupVisited: (param: {
    popup: PopupSchema;
    newPopupParticipation: PopupVisitSchema;
  }) => {
    get().appendPopupVisited(param.newPopupParticipation);
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

  appendPopupVisited: (newPopupVisited: PopupVisitSchema) => {
    set({
      popupVisits: [newPopupVisited, ...get().popupVisits],
    });
  },

  logout: async () => {
    const nonMemberParticipations = await getJsonStorage(
      'INTERESTED_POPUP_SCRAPS',
    );

    set({
      popupScraps: [],
      popupVisits:
        nonMemberParticipations !== null
          ? (nonMemberParticipations as PopupVisitSchema[])
          : [],
      scrappedPopupStores: [],
      visitedPopupStores: [],
    });
  },
}));
