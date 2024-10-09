import {useState} from 'react';
import addRecommendReview, {
  AddRecommendReviewResponse,
} from '../../Axios/popup/⭐\uFE0FaddRecommendReview';

interface AddRecommendReviewState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useAddRecommendReview = () => {
  const [addInterestState, setAddInterestState] =
    useState<AddRecommendReviewState>({
      loading: false,
      error: null,
      success: null,
    });

  const addRecommendCount = async (
    popUpId: number,
    reviewId: number,
  ): Promise<AddRecommendReviewResponse> => {
    setAddInterestState({loading: true, error: null, success: null});
    try {
      const response: AddRecommendReviewResponse = await addRecommendReview(
        popUpId,
        reviewId,
      );
      if (response.success) {
        setAddInterestState({loading: false, error: null, success: true});
        return response;
      } else {
        setAddInterestState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to add interest'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setAddInterestState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...addInterestState, addRecommendCount};
};

export default useAddRecommendReview;
