import {createContext, useContext, useEffect, useState} from 'react';
import {axiosGetCompleteReviewDetail} from 'src/Axios/Mypage/mypage.get.axios';
interface ReviewProviderProps {
  children: React.ReactNode;
  reviewId: string;
}

interface VisitorData {
  visitDate: 'WEEKDAY_AM' | 'WEEKDAY_PM' | 'WEEKEND_AM' | 'WEEKEND_PM';
  satisfaction: 'SATISFIED' | 'NORMAL' | 'UNSATISFIED';
  congestion: 'CROWDED' | 'NORMAL' | 'RELAXED';
}

export interface ReviewResponse {
  introduce: string;
  posterUrl: string;
  isCertified: boolean;
  nickname: string;
  visitedAt: string | null;
  createdAt: string;
  visitorData: VisitorData;
  profile: string | null;
  text: string;
  images: string[];
}

// Context 정의
interface ReviewContextType {
  review: ReviewResponse | null;
  isLoading: boolean;
  error: string | null;
  refetchReview: () => Promise<void>;
}

const initialReviewContext: ReviewContextType = {
  review: null,
  isLoading: false,
  error: null,
  refetchReview: async () => {},
};

const MypageReviewDetailContext =
  createContext<ReviewContextType>(initialReviewContext);

// Provider 컴포넌트 수정
export const MypageReviewDetailProvider: React.FC<ReviewProviderProps> = ({
  children,
  reviewId,
}) => {
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosGetCompleteReviewDetail(reviewId);
      console.debug(response);
      setReview(response);
    } catch (err) {
      setError('리뷰를 불러오는데 실패했습니다.');
      setReview(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchReview();
  }, [reviewId]); // reviewId가 변경될 때마다 리뷰를 다시 불러옴

  const contextValue: ReviewContextType = {
    review,
    isLoading,
    error,
    refetchReview: fetchReview,
  };

  return (
    <MypageReviewDetailContext.Provider value={contextValue}>
      {children}
    </MypageReviewDetailContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(MypageReviewDetailContext);
  if (!context) {
    throw new Error('useReview must be used within ReviewProvider');
  }
  return context;
};
