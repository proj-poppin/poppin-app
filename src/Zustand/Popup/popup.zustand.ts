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
  pageInfo: PageInfoType; // Add pageInfo here
  interestedPopupStores: PopupSchema[];

  popupScraps: PopupScrapSchema[];
  popupVisits: PopupVisitSchema[];
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

  loadMorePopupStores: () => Promise<void>;

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
  searchedPopupStores: [] as PopupSchema[],
  pageInfo: {} as PageInfoType,
  popupScraps: [] as PopupScrapSchema[],
  popupVisits: [] as PopupVisitSchema[],
  previousSearchParams: {} as PopupSearchParams,
  setPopupVisits: (visitations: PopupVisitSchema[]) => {
    set({popupVisits: visitations});
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
    } catch (error) {
      console.error('Error fetching popup stores:', error);
    }
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
    } catch (error) {
      console.error('Error loading more popup stores:', error);
    }
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
    let updatedPopup: PopupSchema | null = null;

    const interestedPopupStores = get().interestedPopupStores || [];

    // isAlreadyScrapped 계산 전에 각 팝업의 id와 비교하는 popupId를 출력하여 확인
    interestedPopupStores.forEach(popup => {});

    const isAlreadyScrapped = interestedPopupStores.some(
      popup => popup?.id.toString() === popupId.toString(),
    );

    if (!isAlreadyScrapped) {
      // If not scrapped, proceed to scrap
      try {
        const result = await axiosScrapInterestPopup(popupId);

        if (result) {
          const updatedPopupSchema = result.data.updatedPopup as PopupSchema;
          set({
            popupScraps: [result.data.newPopupScrap, ...get().popupScraps],
            interestedPopupStores: [
              updatedPopupSchema,
              ...interestedPopupStores,
            ],
          });
          updatedPopup = updatedPopupSchema;
        } else {
        }
      } catch (error) {}
    } else {
      // If already scrapped, proceed to unscrap
      try {
        const result = await axiosUnscrapInterestPopup(popupId);

        if (result) {
          set({
            popupScraps: get().popupScraps.filter(
              popup => popup?.popupId !== popupId,
            ),
            interestedPopupStores: interestedPopupStores.filter(
              popup => popup?.id.toString() !== popupId.toString(),
            ),
          });
          updatedPopup = result.data.updatedPopup;
        } else {
        }
      } catch (error) {}
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
    } catch (error) {
      console.error('Error fetching older popup stores:', error);
    }
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
      interestedPopupStores: [], // interestedPopupStores(관심팝업) 초기화
    });
  },
}));
