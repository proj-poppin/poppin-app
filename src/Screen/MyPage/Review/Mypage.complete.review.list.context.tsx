import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  axiosGetCompleteReviewList,
  axiosGetVisitedPopups,
} from 'src/Axios/Mypage/mypage.get.axios';
import {CongestionRate} from 'src/Object/Type/congestionRate.type';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

export interface CompletePopupReview {
  reviewId: string;
  popupId: string;
  name: string;
  isCertified: boolean;
  createdAt: string;
  imageUrl: string;
}

interface CompleteReviewContextType {
  completeReviews: CompletePopupReview[];
  isLoading: boolean;
  error: string | null;
  refetchCompleteReviews: () => Promise<void>;
}

// 초기값을 상수로 분리
const initialCompleteReviewContext: CompleteReviewContextType = {
  completeReviews: [],
  isLoading: false,
  error: null,
  refetchCompleteReviews: async () => {},
};

const CompleteReviewContext = createContext<CompleteReviewContextType>(
  initialCompleteReviewContext,
);

export const CompleteReviewProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [completeReviews, setCompleteReviews] = useState<CompletePopupReview[]>(
    initialCompleteReviewContext.completeReviews,
  );
  const [isLoading, setIsLoading] = useState(
    initialCompleteReviewContext.isLoading,
  );
  const [error, setError] = useState<string | null>(
    initialCompleteReviewContext.error,
  );

  const fetchCompleteReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosGetCompleteReviewList();
      if (response) {
        setCompleteReviews(response); // null 체크 추가
      }
    } catch (err) {
      setError('방문한 팝업을 불러오는데 실패했습니다.');
      setCompleteReviews([]); // 에러 시 빈 배열로 초기화
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCompleteReviews();
  }, []);

  const contextValue: CompleteReviewContextType = {
    completeReviews,
    isLoading,
    error,
    refetchCompleteReviews: fetchCompleteReviews,
  };

  return (
    <CompleteReviewContext.Provider value={contextValue}>
      {children}
    </CompleteReviewContext.Provider>
  );
};

export const useReviewListContext = () => {
  const context = useContext(CompleteReviewContext);
  if (!context) {
    throw new Error('useReview must be used within CompleteReviews');
  }
  return context;
};
