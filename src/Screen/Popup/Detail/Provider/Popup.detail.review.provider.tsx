import React from 'react';
import {PopupReviewSchema} from '../../../../Schema/Popup/popupReview.schema';
import {PopupReviewCreateSchema} from '../../../../Schema/Popup/popupReviewCreate.schema';
import {createContext, useContext, useState} from 'react';
import {usePopupDetailContext} from './Popup.detail.provider';
import {showBlackToast} from '../../../../Util';
import {
  PopupReportOptions,
  PopupReviewReportOptions,
} from '../../../../Constant/popup.constant';
import {axiosReportPopupReview} from '../../../../Axios/Report/report.post.axios';

type PopupDetailReviewContextProp = {
  reviewLoading: boolean;
  popupDetailReviews: PopupReviewSchema[];
  getPopupDetailReviews: (popupId: string) => Promise<void>;

  targetReview: undefined | PopupReviewSchema;
  setTargetReview: (comment: undefined | PopupReviewSchema) => void;

  reviewUploading: boolean;
  uploadReview: (
    popupReviewCreateSchema: PopupReviewCreateSchema,
  ) => Promise<void>;

  addReview: (newReview: PopupReviewSchema) => void;
  clearReviewStates: () => void;

  reportTargetReview: Partial<PopupReviewSchema>;
  setReportTargetReview: (review: Partial<PopupReviewSchema>) => void;

  popupReviewReportOptions: string[];
  selectedReviewReportOptionIndexes: number[];
  onPressReviewReportOption: (index: number) => void;

  reviewReportEtcOptionInput: string;
  setReviewReportEtcOptionInput: (input: string) => void;

  reporting: boolean;
  reportVoteComment: () => Promise<void>;
  clearCommentReportStates: () => void;
};

export const PopupDetailReviewContext =
  createContext<PopupDetailReviewContextProp>({
    reviewLoading: false,
    popupDetailReviews: [],
    getPopupDetailReviews: async () => {},

    targetReview: undefined,
    setTargetReview: () => {},

    reviewUploading: false,
    uploadReview: async () => {},
    addReview: () => {},
    clearReviewStates: () => {},

    reportTargetReview: {},
    setReportTargetReview: () => {},

    popupReviewReportOptions: [],
    selectedReviewReportOptionIndexes: [],
    onPressReviewReportOption: () => {},

    reviewReportEtcOptionInput: '',
    setReviewReportEtcOptionInput: () => {},

    reporting: false,
    reportVoteComment: async () => {},
    clearCommentReportStates: () => {},
  });

export const usePopupDetailReviewContext = () =>
  useContext(PopupDetailReviewContext);

export const PopupDetailReviewProvider = ({children}: {children: any}) => {
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [popupDetailReviews, setPopupDetailReviews] = useState<
    PopupReviewSchema[]
  >([]);
  const [targetReview, setTargetReview] = useState<
    undefined | PopupReviewSchema
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
  const [reporting, setReporting] = useState<boolean>(false);

  const {popupDetail, setPopupDetail} = usePopupDetailContext();

  const getPopupDetailReviews = async (popupId: string) => {
    setReviewLoading(true);
    // 실제 로직을 구현합니다.
    setReviewLoading(false);
  };

  const uploadReview = async (
    popupReviewCreateSchema: PopupReviewCreateSchema,
  ) => {
    if (reviewUploading) return;
    setReviewUploading(true);
    // 실제 업로드 로직을 구현합니다.
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
    if (reporting) return;
    if (!reportTargetReview.reviewId) {
      showBlackToast({text1: '신고할 댓글이 선택되지 않았습니다.'});
      return;
    }
    if (selectedReviewReportOptionIndexes.length === 0) {
      showBlackToast({text1: '신고 항목을 선택해주세요'});
      return;
    }
    setReporting(true);

    const reportContent = selectedReviewReportOptionIndexes.includes(
      PopupReportOptions.length - 1,
    )
      ? `기타: ${reviewReportEtcOptionInput}`
      : PopupReportOptions[selectedReviewReportOptionIndexes[0]];
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

  const popupDetailReviewContext = {
    reviewLoading,
    popupDetailReviews,
    getPopupDetailReviews,
    targetReview,
    setTargetReview,
    reviewUploading,
    uploadReview,
    addReview,
    clearReviewStates,
    reportTargetReview,
    setReportTargetReview,
    popupReviewReportOptions: PopupReviewReportOptions,
    selectedReviewReportOptionIndexes,
    onPressReviewReportOption,
    reviewReportEtcOptionInput,
    setReviewReportEtcOptionInput,
    reporting,
    reportVoteComment: reportPopupReview,
    clearCommentReportStates: clearReviewReportStates,
  };

  return (
    <PopupDetailReviewContext.Provider value={popupDetailReviewContext}>
      {children}
    </PopupDetailReviewContext.Provider>
  );
};
