import React, {createContext, useContext, useEffect, useState} from 'react';
import {axiosGetVisitedPopups} from 'src/Axios/Mypage/mypage.get.axios';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

interface ReviewContextType {
  visitedPopups: PopupSchema[];
  isLoading: boolean;
  error: string | null;
  refetchVisitedPopups: () => Promise<void>;
}

// 초기값을 상수로 분리
const initialReviewContext: ReviewContextType = {
  visitedPopups: [],
  isLoading: false,
  error: null,
  refetchVisitedPopups: async () => {},
};

const ReviewContext = createContext<ReviewContextType>(initialReviewContext);

export const ReviewProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [visitedPopups, setVisitedPopups] = useState<PopupSchema[]>(
    initialReviewContext.visitedPopups,
  );
  const [isLoading, setIsLoading] = useState(initialReviewContext.isLoading);
  const [error, setError] = useState<string | null>(initialReviewContext.error);

  const fetchVisitedPopups = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosGetVisitedPopups();
      if (response) {
        setVisitedPopups(response); // null 체크 추가
      }
    } catch (err) {
      setError('방문한 팝업을 불러오는데 실패했습니다.');
      setVisitedPopups([]); // 에러 시 빈 배열로 초기화
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchVisitedPopups();
  }, []);

  const contextValue: ReviewContextType = {
    visitedPopups,
    isLoading,
    error,
    refetchVisitedPopups: fetchVisitedPopups,
  };

  return (
    <ReviewContext.Provider value={contextValue}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewListContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};
