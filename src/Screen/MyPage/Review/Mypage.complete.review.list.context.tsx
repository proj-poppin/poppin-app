import React, {createContext, useContext, useEffect, useState} from 'react';
import {axiosGetVisitedPopups} from 'src/Axios/Mypage/mypage.get.axios';
import {CongestionRate} from 'src/Object/Type/congestionRate.type';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

interface CompleteReviewContextType {
  completeReviews: PopupSchema[];
  isLoading: boolean;
  error: string | null;
  refetchCompleteReviews: () => Promise<void>;
}

export const mockPopupData: PopupSchema[] = [
  {
    id: 'popup-001',
    homepageLink: 'https://instagram.com/popup1',
    isInstagram: true,
    name: '팝업스토어 1',
    introduce: '첫 번째 팝업스토어입니다.',
    address: '서울특별시 강남구 테헤란로 123',
    addressDetail: '2층 201호',
    entranceFee: '무료',
    availableAge: '전연령',
    parkingAvailable: true,
    isReservationRequired: false,
    reopenDemandCnt: 150,
    interestScrapCnt: 230,
    viewCnt: 1500,
    createdAt: '2024-12-25T09:00:00Z',
    editedAt: '2024-12-26T10:00:00Z',
    openDate: '2025-01-01',
    closeDate: '2025-02-01',
    openTime: '10:00',
    closeTime: '20:00',
    latitude: 37.4967,
    longitude: 127.0276,
    operationExcept: '매주 월요일 휴무',
    operationStatus: 'OPEN',
    mainImageUrl:
      'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg',
    imageUrls: [
      'https://example.com/popup1-1.jpg',
      'https://example.com/popup1-2.jpg',
      'https://example.com/popup1-3.jpg',
    ],
    preferences: {
      preferencePopupStore: {
        id: 0,
        market: false,
        display: false,
        experience: false,
        wantFree: false,
      },
      preferenceCategory: {
        id: 0,
        fashionBeauty: false,
        characters: false,
        foodBeverage: false,
        webtoonAni: false,
        interiorThings: false,
        movie: false,
        musical: false,
        sports: false,
        game: false,
        itTech: false,
        kpop: false,
        alcohol: false,
        animalPlant: false,
        guitar: false,
      },
      preferenceCompanion: {
        id: 0,
        solo: false,
        withFriend: false,
        withFamily: false,
        withLover: false,
      },
    },
    visitorData: {
      weekdayAm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekdayPm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekendAm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekendPm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      satisfaction: undefined,
    },
    realTimeVisit: 0,
  },
  {
    id: 'popup-001',
    homepageLink: 'https://instagram.com/popup1',
    isInstagram: true,
    name: '팝업스토어 1',
    introduce: '첫 번째 팝업스토어입니다.',
    address: '서울특별시 강남구 테헤란로 123',
    addressDetail: '2층 201호',
    entranceFee: '무료',
    availableAge: '전연령',
    parkingAvailable: true,
    isReservationRequired: false,
    reopenDemandCnt: 150,
    interestScrapCnt: 230,
    viewCnt: 1500,
    createdAt: '2024-12-25T09:00:00Z',
    editedAt: '2024-12-26T10:00:00Z',
    openDate: '2025-01-01',
    closeDate: '2025-02-01',
    openTime: '10:00',
    closeTime: '20:00',
    latitude: 37.4967,
    longitude: 127.0276,
    operationExcept: '매주 월요일 휴무',
    operationStatus: 'OPEN',
    mainImageUrl:
      'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg',
    imageUrls: [
      'https://example.com/popup1-1.jpg',
      'https://example.com/popup1-2.jpg',
      'https://example.com/popup1-3.jpg',
    ],
    preferences: {
      preferencePopupStore: {
        id: 0,
        market: false,
        display: false,
        experience: false,
        wantFree: false,
      },
      preferenceCategory: {
        id: 0,
        fashionBeauty: false,
        characters: false,
        foodBeverage: false,
        webtoonAni: false,
        interiorThings: false,
        movie: false,
        musical: false,
        sports: false,
        game: false,
        itTech: false,
        kpop: false,
        alcohol: false,
        animalPlant: false,
        guitar: false,
      },
      preferenceCompanion: {
        id: 0,
        solo: false,
        withFriend: false,
        withFamily: false,
        withLover: false,
      },
    },
    visitorData: {
      weekdayAm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekdayPm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekendAm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      weekendPm: {
        congestionRatio: 0,
        congestionRate: CongestionRate.Low,
      },
      satisfaction: undefined,
    },
    realTimeVisit: 0,
  },
];

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
  const [completeReviews, setCompleteReviews] = useState<PopupSchema[]>(
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
      const response = await axiosGetVisitedPopups();
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
