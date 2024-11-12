import React, {createContext, useContext, useState} from 'react';
import {usePopupDetailContext} from './Popup.detail.provider';
import {showBlackToast} from '../../../../Util';
import {
  PopupReportOptions,
  PopupReviewReportOptions,
} from '../../../../Constant/popup.constant';
import {
  axiosBlockPopup,
  axiosModifyPopupInfo,
  axiosReportPopup,
} from '../../../../Axios/Popup/popup.post.axios';
import {axiosUploadPopupReview} from '../../../../Axios/Review/review.post.axios';
import {PopupReviewCreateSchema} from '../../../../Schema/Popup/popupReviewCreate.schema';
import {PopupReviewSchema} from '../../../../Schema/Popup/popupReview.schema';
import {axiosReportPopupReview} from '../../../../Axios/Report/report.post.axios';

type PopupDetailServiceProviderProps = {
  popupReportOptions: string[];
  selectedReportOptionIndexes: number[];
  onPressReportOption: (index: number) => void;
  reporting: boolean;
  reportPopup: (etcInput: string) => Promise<void>;
  blockPopup: () => Promise<void>;
  modifyPopupInfo: (formData: FormData) => Promise<void>;
  uploadPopupReview: (formData: FormData) => Promise<void>;

  popupDetailReviews: PopupReviewSchema[];
  getPopupDetailReviews: (popupId: string) => Promise<void>;
  targetReview: PopupReviewSchema | undefined;
  setTargetReview: (review: PopupReviewSchema | undefined) => void;
  reviewUploading: boolean;
  uploadReview: (
    popupReviewCreateSchema: PopupReviewCreateSchema,
  ) => Promise<void>;
  addReview: (newReview: PopupReviewSchema) => void;
  clearReviewStates: () => void;
  reportPopupReview: () => Promise<void>;
  reportTargetReview: Partial<PopupReviewSchema>;
  setReportTargetReview: (review: Partial<PopupReviewSchema>) => void;
  selectedReviewReportOptionIndexes: number[];
  onPressReviewReportOption: (index: number) => void;
  reviewReportEtcOptionInput: string;
  setReviewReportEtcOptionInput: (input: string) => void;
  clearReviewReportStates: () => void;
};

const PopupDetailServiceContext =
  createContext<PopupDetailServiceProviderProps>({
    popupReportOptions: [],
    selectedReportOptionIndexes: [],
    onPressReportOption: () => {},
    reporting: false,
    reportPopup: async () => {},
    blockPopup: async () => {},
    modifyPopupInfo: async () => {},
    uploadPopupReview: async () => {},

    popupDetailReviews: [],
    getPopupDetailReviews: async () => {},
    targetReview: undefined,
    setTargetReview: () => {},
    reviewUploading: false,
    uploadReview: async () => {},
    addReview: () => {},
    clearReviewStates: () => {},
    reportPopupReview: async () => {},
    reportTargetReview: {},
    setReportTargetReview: () => {},
    selectedReviewReportOptionIndexes: [],
    onPressReviewReportOption: () => {},
    reviewReportEtcOptionInput: '',
    setReviewReportEtcOptionInput: () => {},
    clearReviewReportStates: () => {},
  });

export const usePopupDetailServiceContext = () =>
  useContext(PopupDetailServiceContext);

export const PopupDetailServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedReportOptionIndexes, setSelectedReportOptionIndexes] =
    useState<number[]>([]);
  const [reporting, setReporting] = useState<boolean>(false);
  const [popupDetailReviews, setPopupDetailReviews] = useState<
    PopupReviewSchema[]
  >([]);
  const [targetReview, setTargetReview] = useState<
    PopupReviewSchema | undefined
  >(undefined);
  const [reviewUploading, setReviewUploading] = useState<boolean>(false);
  const [reportTargetReview, setReportTargetReview] = useState<
    Partial<PopupReviewSchema>
  >({});
  const [
    selectedReviewReportOptionIndexes,
    setSelectedReviewReportOptionIndexes,
  ] = useState<number[]>([]);
  const [reviewReportEtcOptionInput, setReviewReportEtcOptionInput] =
    useState<string>('');
  const {popupDetail, showPopupDetailModal} = usePopupDetailContext();

  const popupReportOptions = PopupReportOptions;
  const popupReviewReportOptions = PopupReviewReportOptions;

  const onPressReportOption = (index: number) => {
    setSelectedReportOptionIndexes([index]);
  };

  const [setReviewLoading] = useState<boolean>(false);

  const reportPopup = async (etcInput: string) => {
    if (reporting || selectedReportOptionIndexes.length === 0) {
      showBlackToast({text1: '신고 항목을 선택해주세요'});
      return;
    }
    setReporting(true);

    const result = await axiosReportPopup({
      popupId: popupDetail.id,
      reportContent: selectedReportOptionIndexes.includes(
        popupReportOptions.length - 1,
      )
        ? `기타: ${etcInput}`
        : popupReportOptions[selectedReportOptionIndexes[0]],
    });

    if (result) {
      setSelectedReportOptionIndexes([]);
      showPopupDetailModal('REPORT_SUCCESS');
    }
    setReporting(false);
  };

  const blockPopup = async () => {
    console.log('blockPopup');
    const result = await axiosBlockPopup(popupDetail.id);
    console.log('result', result);
    if (result) {
      showBlackToast({text1: '팝업이 차단되었습니다.'});
    }
  };

  const modifyPopupInfo = async (formData: FormData) => {
    const result = await axiosModifyPopupInfo(formData);
    if (result) {
      showBlackToast({text1: '팝업 정보 수정 요청이 완료되었습니다.'});
    }
  };

  const uploadPopupReview = async (formData: FormData) => {
    const result = await axiosUploadPopupReview(formData);
    if (result) {
      showBlackToast({text1: '리뷰가 업로드되었습니다.'});
    }
  };

  const getPopupDetailReviews = async (popupId: string) => {
    // setReviewLoading(true);
    // // Fetch reviews from API here
    // setReviewLoading(false);
  };

  const uploadReview = async (
    popupReviewCreateSchema: PopupReviewCreateSchema,
  ) => {
    if (reviewUploading) return;
    setReviewUploading(true);
    // Implement the upload logic here
    setReviewUploading(false);
  };

  const addReview = (newReview: PopupReviewSchema) => {
    setPopupDetailReviews(prevReviews => [...prevReviews, newReview]);
  };

  const clearReviewStates = () => {
    setPopupDetailReviews([]);
    setTargetReview(undefined);
  };

  const onPressReviewReportOption = (index: number) => {
    setSelectedReviewReportOptionIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index],
    );
  };

  const reportPopupReview = async () => {
    if (
      reporting ||
      !reportTargetReview.reviewId ||
      selectedReviewReportOptionIndexes.length === 0
    ) {
      showBlackToast({text1: '신고 항목을 선택해주세요'});
      return;
    }
    setReporting(true);

    const reportContent = selectedReviewReportOptionIndexes.includes(
      popupReviewReportOptions.length - 1,
    )
      ? `기타: ${reviewReportEtcOptionInput}`
      : popupReviewReportOptions[selectedReviewReportOptionIndexes[0]];

    const result = await axiosReportPopupReview({
      targetReviewId: reportTargetReview.reviewId.toString(),
      content: reportContent,
    });

    if (result) {
      clearReviewReportStates();
      showBlackToast({text1: '댓글 신고가 성공적으로 처리되었습니다.'});
    }
    setReporting(false);
  };

  const clearReviewReportStates = () => {
    setSelectedReviewReportOptionIndexes([]);
    setReviewReportEtcOptionInput('');
    setReporting(false);
  };

  const popupDetailServiceContext = {
    popupReportOptions,
    selectedReportOptionIndexes,
    onPressReportOption,
    reporting,
    reportPopup,
    blockPopup,
    modifyPopupInfo,
    uploadPopupReview,

    popupDetailReviews,
    getPopupDetailReviews,
    targetReview,
    setTargetReview,
    reviewUploading,
    uploadReview,
    addReview,
    clearReviewStates,
    reportPopupReview,
    reportTargetReview,
    setReportTargetReview,
    popupReviewReportOptions,
    selectedReviewReportOptionIndexes,
    onPressReviewReportOption,
    reviewReportEtcOptionInput,
    setReviewReportEtcOptionInput,
    clearReviewReportStates,
  };

  return (
    <PopupDetailServiceContext.Provider value={popupDetailServiceContext}>
      {children}
    </PopupDetailServiceContext.Provider>
  );
};
