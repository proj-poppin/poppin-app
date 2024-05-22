import {CongestionRate} from '../components/HorizontalBarChart.tsx';

export type VisitorDataDetail = {
  congestionRatio: number;
  congestionRate: CongestionRate;
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
  imageUrls: string[];
  isCertificated: boolean;
  recommendCnt: number;
};

// TODO: Back에서 DTO넘겨줘야함
export type DetailPopUpDataPublic = {
  isInterested: boolean;
  isInstagram: boolean;
  id: number;
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
  visitorData?: VisitorData;
  realTimeVisit: number;
  category?: string; // 추가된 필드
};

export type DetailPopUpDataNonPublic = {
  isVisited: boolean;
  isInterested: boolean;
  isInstagram: boolean;
  id: number;
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
  visitorData?: VisitorData;
  realTimeVisit: number;
  category?: string; // 추가된 필드
};
