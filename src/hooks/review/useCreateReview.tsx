import {useState} from 'react';
import createPopUpReview from '../../apis/popup/createReview.ts';

interface CreateReviewState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useCreateReview = () => {
  const [createReviewState, setCreateReviewState] = useState<CreateReviewState>(
    {
      loading: false,
      error: null,
      success: null,
    },
  );

  const createReview = async (
    popupId: number,
    text: string,
    visitDate: string,
    satisfaction: string,
    congestion: string,
    nickname: string,
    images: {uri: string}[],
    isVisited: boolean,
  ): Promise<CommonResponse<any>> => {
    setCreateReviewState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await createPopUpReview(
        popupId,
        text,
        visitDate,
        satisfaction,
        congestion,
        nickname,
        images,
        isVisited,
      );
      console.log(response);
      if (response.success) {
        console.log(response);
        setCreateReviewState({loading: false, error: null, success: true});
        return response;
      } else {
        setCreateReviewState({
          loading: false,
          error: new Error(
            response.error?.message || 'Failed to create review',
          ),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setCreateReviewState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...createReviewState, createReview};
};

export default useCreateReview;
