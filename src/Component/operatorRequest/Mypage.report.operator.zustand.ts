// stores/reportStore.ts
import create from 'zustand';
import {Asset} from 'react-native-image-picker';

interface ReportStore {
  // StepOne states
  affiliation: string;
  informerEmail: string;
  affiliationLength: number;
  informerEmailLength: number;

  // StepTwo states
  modalVisible: boolean;
  postcodeVisible: boolean;
  popupName: string;
  category: string;
  address: string;
  detailAddress: string;
  siteUrl: string;
  showCalendar: boolean;
  dateType: 'start' | 'end';
  startDate?: string;
  endDate?: string;
  showTimePicker: boolean;
  timePickerType: 'start' | 'end';
  startTime: Date;
  endTime: Date;
  timeDetail: string;
  imageFileUri: Array<Asset> | undefined;

  // StepOne actions
  setAffiliation: (text: string) => void;
  setInformerEmail: (text: string) => void;
  setAffiliationLength: (length: number) => void;
  setInformerEmailLength: (length: number) => void;

  // StepTwo actions
  setModalVisible: (visible: boolean) => void;
  setPostcodeVisible: (visible: boolean) => void;
  setPopupName: (name: string) => void;
  setCategory: (category: string) => void;
  setAddress: (address: string) => void;
  setDetailAddress: (address: string) => void;
  setSiteUrl: (url: string) => void;
  setShowCalendar: (show: boolean) => void;
  setDateType: (type: 'start' | 'end') => void;
  setStartDate: (date?: string) => void;
  setEndDate: (date?: string) => void;
  setShowTimePicker: (show: boolean) => void;
  setTimePickerType: (type: 'start' | 'end') => void;
  setStartTime: (time: Date) => void;
  setEndTime: (time: Date) => void;
  setTimeDetail: (detail: string) => void;
  setImageFileUri: (images: Array<Asset> | undefined) => void;
  handleDeleteImage: (index: number) => void;
}

export const useReportStore = create<ReportStore>(set => ({
  // StepOne initial states
  affiliation: '',
  informerEmail: '',
  affiliationLength: 0,
  informerEmailLength: 0,

  // StepTwo initial states
  modalVisible: false,
  postcodeVisible: false,
  popupName: '',
  category: '',
  address: '',
  detailAddress: '',
  siteUrl: '',
  showCalendar: false,
  dateType: 'start',
  startDate: undefined,
  endDate: undefined,
  showTimePicker: false,
  timePickerType: 'start',
  startTime: new Date(),
  endTime: new Date(),
  timeDetail: '',
  imageFileUri: [],

  // StepOne actions
  setAffiliation: text => set({affiliation: text}),
  setInformerEmail: text => set({informerEmail: text}),
  setAffiliationLength: length => set({affiliationLength: length}),
  setInformerEmailLength: length => set({informerEmailLength: length}),

  // StepTwo actions
  setModalVisible: visible => set({modalVisible: visible}),
  setPostcodeVisible: visible => set({postcodeVisible: visible}),
  setPopupName: name => set({popupName: name}),
  setCategory: category => set({category: category}),
  setAddress: address => set({address: address}),
  setDetailAddress: address => set({detailAddress: address}),
  setSiteUrl: url => set({siteUrl: url}),
  setShowCalendar: show => set({showCalendar: show}),
  setDateType: type => set({dateType: type}),
  setStartDate: date => set({startDate: date}),
  setEndDate: date => set({endDate: date}),
  setShowTimePicker: show => set({showTimePicker: show}),
  setTimePickerType: type => set({timePickerType: type}),
  setStartTime: time => set({startTime: time}),
  setEndTime: time => set({endTime: time}),
  setTimeDetail: detail => set({timeDetail: detail}),
  setImageFileUri: images => set({imageFileUri: images}),
  handleDeleteImage: (index: number) =>
    set(state => ({
      imageFileUri: state.imageFileUri
        ? state.imageFileUri.filter((_, i) => i !== index)
        : undefined,
    })),
}));
