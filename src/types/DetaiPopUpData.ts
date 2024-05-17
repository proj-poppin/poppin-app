export type VisitorDataDetail = {
  congestionRate?: string;
  congestionRatio?: number;
};

export type VisitorData = {
  weekdayAm: VisitorDataDetail;
  weekdayPm: VisitorDataDetail;
  weekendAm: VisitorDataDetail;
  weekendPm: VisitorDataDetail;
  satisfaction?: number;
};

export type Review = {
  reviewId: number;
  nickname: string;
  totalReviewWrite: number;
  text: string;
  imageUrl: string;
  isCertificated: boolean;
  recommend_cnt: number;
};

export type DetailPopUpData = {
  isInstagram: boolean;
  id: number;
  // posterUrl: string;
  images: string[];
  homepageLink: string;
  name: string;
  introduce: string;
  address: string;
  addressDetail: string | null;
  entranceFee: string;
  availableAge: string;
  parkingAvailable: boolean;
  resvRequired?: boolean; // 추가된 필드
  reopenDemandCnt?: number; // reopenDemand_cnt와 이름이 다르므로 주의
  interesteCnt: number;
  viewCnt: number;
  createdAt: string;
  editedAt: string;
  openDate: string;
  closeDate: string;
  openTime: string;
  closeTime: string;
  operationExcept: string | null;
  operationStatus: string;
  review: Review[];
  visitorData: VisitorData;
  realTimeVisit: number;
  category?: string; // 추가된 필드
};

export type TfindPopupType = {
  id: string; // 팝업 아이디
  posterUrl: String; // 대표사진
  name: String; // 팝업 이름
  address: String; // 주소
  viewCnt: number; // 조회수
  createdAt: string; // 업로드 날짜
  editedAt: string; // 수정 날짜
  openDate: string; // 팝업 오픈 날짜
  closeDate: string; // 팝업 종료 날짜
  operationStatus: string; // 운영 상태
  isInterested: boolean; // 관심 등록 여부
  preference: {
    id: string;
    market: boolean;
    display: boolean;
    experience: boolean;
    wantFree: boolean;
  };
  taste: {
    id: string;
    fashionBeauty: boolean;
    characters: boolean;
    foodBeverage: boolean;
    webtoonAni: boolean;
    interiorThings: boolean;
    movie: boolean;
    musical: boolean;
    sports: boolean;
    game: boolean;
    itTech: boolean;
    kpop: boolean;
    alcchol: boolean;
    animalPlant: boolean;
  };
};
