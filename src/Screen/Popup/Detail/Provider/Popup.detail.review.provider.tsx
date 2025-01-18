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
import {axiosAddRecommendReview} from '../../../..//Axios/Review/review.post.axios';

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

  // 추천한 리뷰
  recommendReview: (
    popupId: number,
    reviewId: number,
  ) => Promise<{success: boolean}>; 
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

    recommendReview: async () => ({success: false}),
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

  const recommendReview = async (popupId: number, reviewId: number) => {
    try {
      const response = await axiosAddRecommendReview(popupId, reviewId);

      if (response?.success) {
        // 추천 성공 시에만 리뷰 상태 업데이트
        setPopupDetailReviews(reviews =>
          reviews.map(review =>
            review.reviewId === reviewId
              ? {
                  ...review,
                  recommendCnt: review.recommendCnt + 1,
                }
              : review,
          ),
        );

        showBlackToast({text1: '추천을 완료하였습니다!'});
        return {success: true};
      } else {
        showBlackToast({
          text1:
            response?.error?.message || '추천 처리 중 문제가 발생했습니다.',
        });
        return {success: false};
      }
    } catch (error) {
      showBlackToast({text1: '추천 처리 중 오류가 발생했습니다.'});
      return {success: false};
    }
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
    recommendReview,
  };

  return (
    <PopupDetailReviewContext.Provider value={popupDetailReviewContext}>
      {children}
    </PopupDetailReviewContext.Provider>
  );
};
