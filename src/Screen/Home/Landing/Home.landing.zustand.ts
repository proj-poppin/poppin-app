import create from 'zustand';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {FlatList} from 'react-native';
import {RefObject} from 'react';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';

type HomeLandingScreenStoreProps = {
  homeFeedRef: RefObject<FlatList>;

  refreshing: boolean;
  refreshHomePopupStores: () => Promise<void>;

  gettingOlder: boolean;
  getOlderHomePopupStores: () => Promise<void>;

  modalType: string;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  setModalOpen: (modalType: string) => void;
  setModalClose: () => void;
};

export const useHomeLandingScreenStore = create<HomeLandingScreenStoreProps>(
  (set, get) => ({
    homeFeedRef: {current: null},

    refreshing: false,
    refreshHomePopupStores: async () => {
      if (get().refreshing) return;
      set({refreshing: true});

      // 홈 화면 초기 데이터를 불러옵니다.
      const success = await useAppStore.getState().loadInitialData();
      if (!success) {
        // 에러 처리 또는 알림 추가 가능
        console.error('초기 데이터를 불러오지 못했습니다.');
      }

      set({refreshing: false});
    },

    gettingOlder: false,
    getOlderHomePopupStores: async () => {
      if (get().gettingOlder) return;
      set({gettingOlder: true});

      // 추가 데이터를 불러옵니다.
      const success = await useAppStore.getState().loadInitialData(); // 더 많은 데이터를 가져오는 로직으로 변경
      if (!success) {
        console.error('추가 데이터를 불러오지 못했습니다.');
      }

      set({gettingOlder: false});
    },

    modalType: '',
    modalVisible: false,
    setModalVisible: (status: boolean) => {
      set({modalVisible: status});
    },
    setModalOpen: (modalType: string) => {
      set({modalType: modalType});
      set({modalVisible: true});
    },
    setModalClose: () => {
      set({modalVisible: false});
    },
  }),
);
