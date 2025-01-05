// src/Screen/Review/Review.detail.context.tsx
import React, {createContext, useContext, useState} from 'react';

interface MypageReviewDetailType {
  introduce: string;
  posterUrl: string;
  isCertificated: boolean;
  nickname: string;
  visitedAt: string | null;
  createdAt: string;
  visitorData: {
    visitDate: string;
    satisfaction: string;
    congestion: string;
  };
  text: string;
  images: string[];
}

interface MypageReviewDetailContextType {
  reviewDetail: MypageReviewDetailType | null;
  isLoading: boolean;
  error: string | null;
  setReviewDetail: (review: MypageReviewDetailType) => void;
}

const initialReviewDetailContext: MypageReviewDetailContextType = {
  reviewDetail: null,
  isLoading: false,
  error: null,
  setReviewDetail: () => {},
};

export const mockReviewData = {
  introduce: '팝업스토어이름 이름 이름...',
  posterUrl: '이미지URL',
  isCertificated: true,
  nickname: '본인 닉네임 이름',
  visitedAt: '2023.05.03',
  visitorData: {
    visitDate: '평일 오전',
    satisfaction: '보통',
    congestion: '보통',
  },
  text: '리뷰 글입니다...',
  images: ['이미지URL1', '이미지URL2', '이미지URL3'],
};

const MypageReviewDetailContext = createContext<MypageReviewDetailContextType>(
  initialReviewDetailContext,
);

export const MypageReviewDetailProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [reviewDetail, setReviewDetail] =
    useState<MypageReviewDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextValue: MypageReviewDetailContextType = {
    reviewDetail,
    isLoading,
    error,
    setReviewDetail,
  };

  return (
    <MypageReviewDetailContext.Provider value={contextValue}>
      {children}
    </MypageReviewDetailContext.Provider>
  );
};

export const useReviewDetail = () => {
  const context = useContext(MypageReviewDetailContext);
  if (!context) {
    throw new Error('useReviewDetail must be used within ReviewDetailProvider');
  }
  return context;
};
