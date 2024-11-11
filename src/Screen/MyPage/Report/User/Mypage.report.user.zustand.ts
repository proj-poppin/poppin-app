// store/userReportStore.ts
import create from 'zustand';
import {Asset} from 'react-native-image-picker';
import {Alert} from 'react-native';

export interface UserReportStore {
  // State
  modalVisible: boolean;
  popupName: string;
  filteringThreeCategories: string;
  filteringFourteenCategories: string;
  siteUrl: string;
  images: Asset[] | undefined;

  // Actions
  setModalVisible: (visible: boolean) => void;
  setPopupName: (name: string) => void;
  setFilteringThreeCategories: (categories: string) => void;
  setFilteringFourteenCategories: (categories: string) => void;
  setSiteUrl: (url: string) => void;
  setImages: (images: Asset[] | undefined) => void;
  reset: () => void;
  validate: () => boolean;
}

export const useUserReportStore = create<UserReportStore>((set, get) => ({
  // Initial state
  modalVisible: false,
  popupName: '',
  filteringThreeCategories: '',
  filteringFourteenCategories: '',
  siteUrl: '',
  images: [],

  // Actions
  setModalVisible: visible => set({modalVisible: visible}),
  setPopupName: name => set({popupName: name}),

  setFilteringThreeCategories: filteringThreeCategories =>
    set({filteringThreeCategories: filteringThreeCategories}),
  setFilteringFourteenCategories: filteringFourteenCategories =>
    set({filteringFourteenCategories: filteringFourteenCategories}),
  setSiteUrl: url => set({siteUrl: url}),
  setImages: images => set({images}),
  reset: () =>
    set({
      modalVisible: false,
      popupName: '',
      filteringFourteenCategories: '',
      filteringThreeCategories: '',
      siteUrl: '',
      images: [],
    }),
  validate: () => {
    const state = get();

    if (!state.popupName.trim()) {
      Alert.alert('알림', '팝업 이름을 입력해주세요.');
      return false;
    }

    if (!state.filteringFourteenCategories) {
      Alert.alert('알림', '팝업 카테고리를 선택해주세요.');
      return false;
    }
    if (!state.filteringThreeCategories) {
      Alert.alert('알림', '팝업 유형을 선택해주세요.');
      return false;
    }

    if (!state.images || state.images.length === 0) {
      Alert.alert('알림', '최소 1장의 사진을 업로드해주세요.');
      return false;
    }

    return true;
  },
}));
