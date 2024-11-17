// stores/reportStore.ts
import create from 'zustand';
import {Asset} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {UserReportStore} from '../User/Mypage.report.user.zustand';
import {axiosMyPageOperatorReport} from 'src/Axios/Mypage/mypage.post.axios';

export interface OperatorReportStore {
  /** 제보 중 로딩 여부 */
  requestLoading: boolean;

  /** 운영자 제보하기 요청 */
  requestOperatorReport: () => Promise<void>;

  /** 운영자 제보하기 필드 상태값 초기화 */
  reset: () => void;

  validate: () => boolean; // validate 함수 추가

  // StepOne states
  informerCompany: string; // affiliation -> informerCompany
  informerEmail: string;

  // StepTwo states
  storeName: string; // popupName -> storeName
  storeBriefDescription: string; // introduction -> storeBriefDescription
  storeAddress: string; // address -> storeAddress
  storeDetailAddress: string; // detailAddress -> storeDetailAddress
  storeUrl: string; // siteUrl -> storeUrl
  openDate: string; // startDate -> openDate
  closeDate: string; // endDate -> closeDate
  openTime: string; // startTime -> openTime (format: hh:mm)
  closeTime: string; // endTime -> closeTime (format: hh:mm)
  operationException: string; // timeDetail -> operationException
  images: Asset[];
  filteringThreeCategories: string;
  filteringFourteenCategories: string;

  // StepThree states
  isReservationRequired: boolean; // reservationType -> isReservationRequired
  availableAge: 'G_RATED' | 'PG_7' | 'PG_12' | 'PG_15' | 'PG_18';
  isEntranceFeeRequired: boolean; // feeType -> isEntranceFeeRequired
  entranceFee: string;
  parkingAvailable: boolean;

  // UI control states (not part of API but needed for UI)
  modalVisible: boolean;
  postcodeVisible: boolean;
  showCalendar: boolean;
  showTimePicker: boolean;

  // StepOne actions
  setInformerCompany: (text: string) => void;
  setInformerEmail: (text: string) => void;

  // StepTwo actions
  setStoreName: (name: string) => void;
  setStoreBriefDescription: (text: string) => void;
  setStoreAddress: (address: string) => void;
  setStoreDetailAddress: (address: string) => void;
  addImages: (images: Asset[] | undefined) => void;
  removeImage: (index: number) => void;
  setStoreUrl: (url: string) => void;
  setOpenDate: (date: string) => void;
  setCloseDate: (date: string) => void;
  setOpenTime: (time: string) => void;
  setCloseTime: (time: string) => void;
  setOperationException: (text: string) => void;
  handleDeleteImage: (index: number) => void;
  setFilteringThreeCategories: (categories: string) => void;
  setFilteringFourteenCategories: (categories: string) => void;

  // StepThree actions
  setIsReservationRequired: (required: boolean) => void;
  setAvailableAge: (
    age: 'G_RATED' | 'PG_7' | 'PG_12' | 'PG_15' | 'PG_18',
  ) => void;
  setIsEntranceFeeRequired: (required: boolean) => void;
  setEntranceFee: (fee: string) => void;
  setParkingAvailable: (available: boolean) => void;

  // Visit With actions
  setVisitWith: (
    type: 'solo' | 'withFriend' | 'withFamily' | 'withLover',
    value: boolean,
  ) => void;

  // UI control actions
  setModalVisible: (visible: boolean) => void;
  setPostcodeVisible: (visible: boolean) => void;
  setShowCalendar: (show: boolean) => void;
  setShowTimePicker: (show: boolean) => void;
}

export const useOperatorReportStore = create<OperatorReportStore>(
  (set, get) => ({
    requestLoading: false,

    // StepOne initial states
    informerCompany: '',
    informerEmail: '',
    storeName: '',
    storeBriefDescription: '',
    storeAddress: '',
    storeDetailAddress: '',

    // StepTwo initial states
    storeUrl: '',
    openDate: '',
    closeDate: '',
    openTime: '',
    closeTime: '',
    operationException: '',
    images: [],

    // StepThree initial states
    isReservationRequired: false,
    availableAge: 'G_RATED',
    isEntranceFeeRequired: false,
    entranceFee: '',
    parkingAvailable: false,

    // UI control initial states
    modalVisible: false,
    postcodeVisible: false,
    showCalendar: false,
    showTimePicker: false,
    filteringThreeCategories: '',
    filteringFourteenCategories: '',

    // Actions
    setInformerCompany: text => set({informerCompany: text}),
    setInformerEmail: text => set({informerEmail: text}),
    setStoreName: name => set({storeName: name}),
    setStoreBriefDescription: text => set({storeBriefDescription: text}),
    setStoreAddress: address => set({storeAddress: address}),
    setStoreDetailAddress: address => set({storeDetailAddress: address}),

    setStoreUrl: url => set({storeUrl: url}),
    setOpenDate: date => set({openDate: date}),
    setCloseDate: date => set({closeDate: date}),
    setOpenTime: time => set({openTime: time}),
    setCloseTime: time => set({closeTime: time}),
    setOperationException: text => set({operationException: text}),
    setFilteringThreeCategories: filteringThreeCategories =>
      set({filteringThreeCategories: filteringThreeCategories}),
    setFilteringFourteenCategories: filteringFourteenCategories =>
      set({filteringFourteenCategories: filteringFourteenCategories}),
    handleDeleteImage: (index: number) =>
      set(state => ({
        images: state.images
          ? state.images.filter((_, i) => i !== index)
          : undefined,
      })),
    addImages: images => set({images}),
    removeImage: index => {
      set({
        images: [...get().images].filter(
          (image, imageIndex) => imageIndex !== index,
        ),
      });
    },
    setIsReservationRequired: required =>
      set({isReservationRequired: required}),
    setAvailableAge: age => set({availableAge: age}),
    setIsEntranceFeeRequired: required =>
      set({isEntranceFeeRequired: required}),
    setEntranceFee: fee => set({entranceFee: fee}),
    setParkingAvailable: available => set({parkingAvailable: available}),

    setVisitWith: (type, value) => set({[type]: value}),

    setModalVisible: visible => set({modalVisible: visible}),
    setPostcodeVisible: visible => set({postcodeVisible: visible}),
    setShowCalendar: show => set({showCalendar: show}),
    setShowTimePicker: show => set({showTimePicker: show}),

    // reset 함수 추가
    reset: () =>
      set({
        informerCompany: '',
        informerEmail: '',
        storeName: '',
        storeBriefDescription: '',
        storeAddress: '',
        storeDetailAddress: '',
        storeUrl: '',
        openDate: '',
        closeDate: '',
        openTime: '',
        closeTime: '',
        operationException: '',
        images: [],
        isReservationRequired: false,
        availableAge: 'G_RATED',
        isEntranceFeeRequired: false,
        entranceFee: '',
        parkingAvailable: false,
        modalVisible: false,
        postcodeVisible: false,
        showCalendar: false,
        showTimePicker: false,
        filteringFourteenCategories: '',
        requestLoading: false,
      }),

    // validate 함수 추가
    validate: () => {
      const state = get();

      if (!state.informerCompany.trim()) {
        Alert.alert('알림', '소속을 입력해주세요.');
        return false;
      }

      if (!state.informerEmail.trim()) {
        Alert.alert('알림', '이메일을 입력해주세요.');
        return false;
      }

      if (!state.storeName.trim()) {
        Alert.alert('알림', '팝업 이름을 입력해주세요.');
        return false;
      }

      if (!state.storeAddress.trim()) {
        Alert.alert('알림', '주소를 입력해주세요.');
        return false;
      }

      if (!state.openDate || !state.closeDate) {
        Alert.alert('알림', '운영 기간을 입력해주세요.');
        return false;
      }

      if (!state.openTime || !state.closeTime) {
        Alert.alert('알림', '운영 시간을 입력해주세요.');
        return false;
      }

      if (!state.filteringFourteenCategories) {
        Alert.alert('알림', '카테고리를 선택해주세요.');
        return false;
      }

      if (!state.images || state.images.length === 0) {
        Alert.alert('알림', '최소 1장의 사진을 업로드해주세요.');
        return false;
      }

      return true;
    },

    requestOperatorReport: async () => {
      if (get().requestLoading) {
        return;
      }

      try {
        set({requestLoading: true});

        const formData = new FormData();

        // 각각의 필드를 FormData에 추가
        formData.append('informerCompany', get().informerCompany);
        formData.append('informerEmail', get().informerEmail);
        formData.append('storeName', get().storeName);
        formData.append('storeBriefDescription', get().storeBriefDescription);
        formData.append('storeAddress', get().storeAddress);

        if (get().storeDetailAddress) {
          formData.append('storeDetailAddress', get().storeDetailAddress);
        }

        formData.append('storeUrl', get().storeUrl);
        formData.append('openDate', get().openDate);
        formData.append('closeDate', get().closeDate);
        formData.append('openTime', get().openTime);
        formData.append('closeTime', get().closeTime);

        if (get().operationException) {
          formData.append('operationException', get().operationException);
        }

        formData.append(
          'isReservationRequired',
          String(get().isReservationRequired),
        );
        formData.append('availableAge', get().availableAge);
        formData.append(
          'isEntranceFeeRequired',
          String(get().isEntranceFeeRequired),
        );
        formData.append('entranceFee', get().entranceFee);
        formData.append('parkingAvailable', String(get().parkingAvailable));
        formData.append(
          'filteringFourteenCategories',
          get().filteringFourteenCategories,
        );
        formData.append(
          'filteringThreeCategories',
          get().filteringThreeCategories,
        );
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
        console.log('Operator Report FormData contents:', {
          informerCompany: get().informerCompany,
          informerEmail: get().informerEmail,
          storeName: get().storeName,
          imagesCount: get().images?.length || 0,
        });

        const response = await axiosMyPageOperatorReport(formData);

        if (response?.success) {
          get().reset();
          return response;
        }

        return response;
      } catch (error) {
        console.error('운영자 제보 등록 실패:', error);
        Alert.alert('알림', '제보하기에 실패했습니다. 다시 시도해주세요.');
        throw error;
      } finally {
        set({requestLoading: false});
      }
    },
  }),
);
