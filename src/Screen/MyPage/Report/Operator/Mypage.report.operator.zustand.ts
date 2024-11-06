// stores/reportStore.ts
import create from 'zustand';
import {Asset} from 'react-native-image-picker';

export interface ReportStore {
  // StepOne states
  informerCompany: string; // affiliation -> informerCompany
  informerEmail: string;

  // StepTwo states
  storeName: string; // popupName -> storeName
  storeBriefDescription: string; // introduction -> storeBriefDescription
  storeAddress: string; // address -> storeAddress
  storeDetailAddress: string; // detailAddress -> storeDetailAddress
  latitude: number;
  longitude: number;
  storeUrl: string; // siteUrl -> storeUrl
  openDate: string; // startDate -> openDate
  closeDate: string; // endDate -> closeDate
  openTime: string; // startTime -> openTime (format: hh:mm)
  closeTime: string; // endTime -> closeTime (format: hh:mm)
  operationException: string; // timeDetail -> operationException
  images: Array<Asset> | undefined;
  categories: string;

  // StepThree states
  isReservationRequired: boolean; // reservationType -> isReservationRequired
  availableAge: 'G_RATED' | 'PG_7' | 'PG_12' | 'PG_15' | 'PG_18';
  isEntranceFeeRequired: boolean; // feeType -> isEntranceFeeRequired
  entranceFee: string;
  parkingAvailable: boolean;

  // Visit With states
  solo: boolean;
  withFriend: boolean;
  withFamily: boolean;
  withLover: boolean;

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
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;

  setStoreUrl: (url: string) => void;
  setOpenDate: (date: string) => void;
  setCloseDate: (date: string) => void;
  setOpenTime: (time: string) => void;
  setCloseTime: (time: string) => void;
  setOperationException: (text: string) => void;
  setImages: (images: Array<Asset> | undefined) => void;
  handleDeleteImage: (index: number) => void;

  // Category actions
  setCategories: (categories: string) => void;

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

export const useReportStore = create<ReportStore>(set => ({
  // StepOne initial states
  informerCompany: '',
  informerEmail: '',
  storeName: '',
  storeBriefDescription: '',
  storeAddress: '',
  storeDetailAddress: '',
  latitude: 0,
  longitude: 0,

  // StepTwo initial states
  storeUrl: '',
  openDate: '',
  closeDate: '',
  openTime: '',
  closeTime: '',
  operationException: '',
  images: [],
  categories: '',

  // StepThree initial states
  isReservationRequired: false,
  availableAge: 'G_RATED',
  isEntranceFeeRequired: false,
  entranceFee: '',
  parkingAvailable: false,

  // Visit With initial states
  solo: false,
  withFriend: false,
  withFamily: false,
  withLover: false,

  // UI control initial states
  modalVisible: false,
  postcodeVisible: false,
  showCalendar: false,
  showTimePicker: false,

  // Actions
  setInformerCompany: text => set({informerCompany: text}),
  setInformerEmail: text => set({informerEmail: text}),
  setStoreName: name => set({storeName: name}),
  setStoreBriefDescription: text => set({storeBriefDescription: text}),
  setStoreAddress: address => set({storeAddress: address}),
  setStoreDetailAddress: address => set({storeDetailAddress: address}),
  setLatitude: lat => set({latitude: lat}),
  setLongitude: lng => set({longitude: lng}),

  setStoreUrl: url => set({storeUrl: url}),
  setOpenDate: date => set({openDate: date}),
  setCloseDate: date => set({closeDate: date}),
  setOpenTime: time => set({openTime: time}),
  setCloseTime: time => set({closeTime: time}),
  setOperationException: text => set({operationException: text}),
  setImages: images => set({images}),
  handleDeleteImage: (index: number) =>
    set(state => ({
      images: state.images
        ? state.images.filter((_, i) => i !== index)
        : undefined,
    })),

  setCategories: categories => set({categories: categories}),
  setIsReservationRequired: required => set({isReservationRequired: required}),
  setAvailableAge: age => set({availableAge: age}),
  setIsEntranceFeeRequired: required => set({isEntranceFeeRequired: required}),
  setEntranceFee: fee => set({entranceFee: fee}),
  setParkingAvailable: available => set({parkingAvailable: available}),

  setVisitWith: (type, value) => set({[type]: value}),

  setModalVisible: visible => set({modalVisible: visible}),
  setPostcodeVisible: visible => set({postcodeVisible: visible}),
  setShowCalendar: show => set({showCalendar: show}),
  setShowTimePicker: show => set({showTimePicker: show}),
}));
