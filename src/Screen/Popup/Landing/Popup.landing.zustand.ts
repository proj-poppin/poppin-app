import create from 'zustand';
import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PageInfoType} from 'src/Object/Type/pageInfo.type';
import {PopupSortOrder} from '../../../Object/Type/popupSortOrder.type';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';
import {RefObject} from 'react';
import {FlatList} from 'react-native';
import {axiosGetPopupsBySearchFiltering} from '../../../Axios/Popup/popup.get.axios';
import {BlankPreference} from '../../../Schema/Preference/preference.schema';
import {PreferenceCompanion} from '../../../Schema/Preference/preferenceCompanion.schema';
import {PreferenceCategory} from '../../../Schema/Preference/preferenceCategory.schema';
import {PreferencePopupStore} from '../../../Schema/Preference/preferencePopupStore';

type PopupStatusProps = {
  searchedPopupStores: PopupSchema[];
  pageInfo: PageInfoType;
  isLoading: boolean;
  noMoreOlderPopupStores: boolean;
};

type PreferenceState = {
  preferenceCategory: PreferenceCategory;
  preferencePopupStore: PreferencePopupStore;
  preferenceCompanion: PreferenceCompanion;
  setFilteringFourteenCategories: (category: PreferenceCategory) => void;
  setFilteringThreeCategories: (popupStore: PreferencePopupStore) => void;
};

type PopupScreenStoreProps = Record<OperationStatus, PopupStatusProps> & {
  popupListRef: RefObject<FlatList<any>>;
  selectedOrderType: PopupSortOrder;
  searchKeyword: string;
  selectedCategories: string;
  isSetting: boolean;
  filteringThreeCategories: string;
  filteringFourteenCategories: string;

  setSearchKeyword: (keyword: string) => void;
  setSelectedCategories: (categories: string) => void;
  setSelectedPopupStores: (types: string) => void;
  setSelectedOrderType: (orderType: PopupSortOrder) => void;
  setIsSetting: (isSetting: boolean) => void;

  refreshAllTabs: () => void;
  getFilteredPopupStores: (
    operationStatus: OperationStatus,
    params: PopupSearchParams,
  ) => Promise<void>;
  loadMorePopupStores: (operationStatus: OperationStatus) => Promise<void>;
  setPopupStoreByOperationStatus: (
    operationStatus: OperationStatus,
    popupStores: PopupSchema[],
    pageInfo: PageInfoType,
    noMoreOlderPopupStores: boolean,
  ) => void;
} & PreferenceState;

export const usePopupScreenStore = create<PopupScreenStoreProps>(
  (set, get) => ({
    popupListRef: {current: null},

    NOTYET: {
      searchedPopupStores: [],
      pageInfo: {} as PageInfoType,
      isLoading: false,
      noMoreOlderPopupStores: false,
    },
    OPERATING: {
      searchedPopupStores: [],
      pageInfo: {} as PageInfoType,
      isLoading: false,
      noMoreOlderPopupStores: false,
    },
    TERMINATED: {
      searchedPopupStores: [],
      pageInfo: {} as PageInfoType,
      isLoading: false,
      noMoreOlderPopupStores: false,
    },

    selectedOrderType: PopupSortOrder.RECENTLY_OPENED,
    searchKeyword: '',
    selectedCategories: '',
    isSetting: false,
    filteringThreeCategories: '',
    filteringFourteenCategories: '',

    preferenceCategory: BlankPreference.preferenceCategory,
    preferencePopupStore: BlankPreference.preferencePopupStore,
    preferenceCompanion: BlankPreference.preferenceCompanion,

    setFilteringFourteenCategories: categoryState =>
      set({preferenceCategory: categoryState}),
    setFilteringThreeCategories: popupStoreState =>
      set({preferencePopupStore: popupStoreState}),

    setSearchKeyword: (keyword: string) => {
      set({searchKeyword: keyword});
      get().refreshAllTabs();
    },

    setSelectedCategories: (categories: string) => {
      set({filteringFourteenCategories: categories});
      get().refreshAllTabs();
    },

    setSelectedPopupStores: (types: string) => {
      set({filteringThreeCategories: types});
      get().refreshAllTabs();
    },

    setSelectedOrderType: (orderType: PopupSortOrder) => {
      set({selectedOrderType: orderType});
      get().refreshAllTabs();
    },

    setIsSetting: (isSetting: boolean) => set({isSetting}),

    refreshAllTabs: () => {
      const {
        filteringThreeCategories,
        filteringFourteenCategories,
        selectedOrderType,
        searchKeyword,
      } = get();
      const defaultPageParams = {page: 0, size: 10};

      // Fetch popup stores for each operation status tab
      get().getFilteredPopupStores(OperationStatus.NOTYET, {
        operationStatus: OperationStatus.NOTYET,
        filteringFourteenCategories,
        filteringThreeCategories,
        order: selectedOrderType,
        searchName: searchKeyword,
        ...defaultPageParams,
      });

      get().getFilteredPopupStores(OperationStatus.OPERATING, {
        operationStatus: OperationStatus.OPERATING,
        filteringFourteenCategories,
        filteringThreeCategories,
        order: selectedOrderType,
        searchName: searchKeyword,
        ...defaultPageParams,
      });

      get().getFilteredPopupStores(OperationStatus.TERMINATED, {
        operationStatus: OperationStatus.TERMINATED,
        filteringFourteenCategories,
        filteringThreeCategories,
        order: selectedOrderType,
        searchName: searchKeyword,
        ...defaultPageParams,
      });
    },

    getFilteredPopupStores: async (operationStatus, params) => {
      set(state => ({
        ...state,
        [operationStatus]: {...state[operationStatus], isLoading: true},
      }));
      try {
        console.log('Fetching popups with params:', params);
        const response = await axiosGetPopupsBySearchFiltering(params);
        if (response !== null) {
          set(state => ({
            ...state,
            [operationStatus]: {
              searchedPopupStores: response.items,
              pageInfo: response.pageInfo,
              noMoreOlderPopupStores: response.pageInfo.isLast,
              isLoading: false,
            },
          }));
        }
      } catch (error) {
        console.error(`Error fetching ${operationStatus} popup stores:`, error);
        set(state => ({
          ...state,
          [operationStatus]: {...state[operationStatus], isLoading: false},
        }));
      }
    },

    setPopupStoreByOperationStatus: (
      operationStatus,
      popupStores,
      pageInfo,
      noMoreOlderPopupStores,
    ) => {
      set(state => ({
        ...state,
        [operationStatus]: {
          searchedPopupStores: popupStores,
          pageInfo,
          noMoreOlderPopupStores,
        },
      }));
    },

    loadMorePopupStores: async operationStatus => {
      const {pageInfo, searchedPopupStores, noMoreOlderPopupStores} =
        get()[operationStatus];
      const {
        searchKeyword,
        selectedOrderType,
        filteringThreeCategories,
        filteringFourteenCategories,
      } = get();

      if (pageInfo.isLast || noMoreOlderPopupStores) {
        return;
      }

      const params: PopupSearchParams = {
        operationStatus,
        searchName: searchKeyword,
        filteringFourteenCategories,
        filteringThreeCategories,
        order: selectedOrderType,
        page: pageInfo.page + 1,
        size: 10,
      };

      set(state => ({
        ...state,
        [operationStatus]: {...state[operationStatus], isLoading: true},
      }));
      console.log('Loading more popups with params:', params);

      try {
        const response = await axiosGetPopupsBySearchFiltering(params);
        if (response !== null) {
          set(state => ({
            ...state,
            [operationStatus]: {
              searchedPopupStores: [...searchedPopupStores, ...response.items],
              pageInfo: response.pageInfo,
              noMoreOlderPopupStores: response.pageInfo.isLast,
              isLoading: false,
            },
          }));
        }
      } catch (error) {
        console.error(
          `Error loading more ${operationStatus} popup stores:`,
          error,
        );
        set(state => ({
          ...state,
          [operationStatus]: {...state[operationStatus], isLoading: false},
        }));
      }
    },
  }),
);
