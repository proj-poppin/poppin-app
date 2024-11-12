// store/userReportStore.ts
import create from 'zustand';
import {Asset} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {axiosMyPageUserReport} from 'src/Axios/Mypage/mypage.post.axios';

export interface UserReportStore {
  // State
  modalVisible: boolean;
  storeName: string;
  filteringThreeCategories: string;
  contactLink: string;

  // Actions
  setModalVisible: (visible: boolean) => void;
  setPopupName: (name: string) => void;
  setFilteringThreeCategories: (categories: string) => void;
  setFilteringFourteenCategories: (categories: string) => void;
  reset: () => void;
  validate: () => boolean;

  /** 제보 중 로딩 여부 */
  requestLoading: boolean;

  /** 이미지가 포함된 이용자 제보하기 */
  requestUserReport: () => Promise<void>;
  userRequestInput: UserRequestInput;
  setUserRequestInput: (input: UserRequestInput) => void;
  images: Asset[];
  addImages: (images: Asset[] | undefined) => void;
  removeImage: (index: number) => void;
  setContactLink: (link: string) => void;
  filteringFourteenCategories: string;

  /** 이미지가 포함된 운영자 제보하기 */
  requestOperatorReport: () => void;
}

export type UserRequestInput = {
  storeName: string;
  contactLink: string;
  filteringFourteenCategories: string;
  images: Asset[];
};

const initialUserReportInput: UserRequestInput = {
  storeName: '',
  contactLink: '',
  filteringFourteenCategories: '',
  images: [],
};

export const useUserReportStore = create<UserReportStore>((set, get) => ({
  // Initial state
  modalVisible: false,
  storeName: '',
  filteringThreeCategories: '',
  filteringFourteenCategories: '',
  contactLink: '',
  images: [],
  requestLoading: false,

  // Actions
  setModalVisible: visible => set({modalVisible: visible}),
  setPopupName: name => set({storeName: name}),

  requestOperatorReport: () => {},

  setFilteringThreeCategories: filteringThreeCategories =>
    set({filteringThreeCategories: filteringThreeCategories}),
  setFilteringFourteenCategories: filteringFourteenCategories =>
    set({filteringFourteenCategories: filteringFourteenCategories}),
  addImages: images => set({images}),
  setContactLink: link => set({contactLink: link}),
  removeImage: index => {
    set({
      images: [...get().images].filter(
        (image, imageIndex) => imageIndex !== index,
      ),
    });
  },
  userRequestInput: initialUserReportInput,
  setUserRequestInput: input => set({userRequestInput: input}),

  /**
   * ! ReactNative 에서 이미지 파일을 포함한 FormData 를 전송할 땐
   * ! 반드시 uri, type, name 속성을 가져야 합니다.
   * @see https://github.com/facebook/react-native/blob/main/Libraries/Network/FormData.js
   */
  requestUserReport: async () => {
    if (get().requestLoading) {
      return;
    }

    try {
      set({requestLoading: true});

      const formData = new FormData();

      // userRequestInput 대신 store의 실제 상태값 사용
      formData.append('storeName', get().storeName);
      formData.append(
        'filteringFourteenCategories',
        get().filteringFourteenCategories,
      );

      // contactLink는 선택적 필드
      if (get().contactLink) {
        formData.append('contactLink', get().contactLink);
      }

      // 이미지 추가
      get().images.forEach((image, index) => {
        if (image.uri) {
          formData.append('images', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `image${index}.jpg`,
          } as any);
        }
      });

      // 요청 전에 formData 내용 확인
      console.log('FormData contents:', {
        storeName: get().storeName,
        contactLink: get().contactLink,
        filteringFourteenCategories: get().filteringFourteenCategories,
        imagesCount: get().images.length,
      });

      const response = await axiosMyPageUserReport(formData);

      if (response?.success) {
        get().reset();
        return response;
      }

      return response;
    } catch (error) {
      console.error('제보 등록 실패:', error);
      Alert.alert('알림', '제보하기에 실패했습니다. 다시 시도해주세요.');
      throw error;
    } finally {
      set({requestLoading: false});
    }
  },

  reset: () =>
    set({
      modalVisible: false,
      storeName: '',
      filteringFourteenCategories: '',
      filteringThreeCategories: '',
      contactLink: '',
      images: [],
    }),
  validate: () => {
    const state = get();

    if (!state.storeName.trim()) {
      Alert.alert('알림', '팝업 이름을 입력해주세요.');
      return false;
    }

    if (!state.filteringFourteenCategories) {
      Alert.alert('알림', '팝업 카테고리를 선택해주세요.');
      return false;
    }
    // if (!state.filteringThreeCategories) {
    //   Alert.alert('알림', '팝업 유형을 선택해주세요.');
    //   return false;
    // }

    if (!state.images || state.images.length === 0) {
      Alert.alert('알림', '최소 1장의 사진을 업로드해주세요.');
      return false;
    }

    return true;
  },
}));
