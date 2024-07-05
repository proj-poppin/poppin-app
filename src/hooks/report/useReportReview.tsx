import {useState} from 'react';
import reportReview from '../../apis/report/reviewReport.ts';

interface ReportReviewState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useReportReview = () => {
  const [reportReviewState, setReportReviewState] = useState<ReportReviewState>(
    {
      loading: false,
      error: null,
      success: null,
    },
  );

  const reportReviewDetails = async (
    reviewId: string,
    content: string,
  ): Promise<CommonResponse<any>> => {
    setReportReviewState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await reportReview(
        reviewId,
        content,
      );
      if (response.success) {
        setReportReviewState({loading: false, error: null, success: true});
        return response;
      } else {
        setReportReviewState({
          loading: false,
          error: new Error(
            response.error?.message || 'Failed to report review',
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
      setReportReviewState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...reportReviewState, reportReviewDetails};
};

export default useReportReview;
