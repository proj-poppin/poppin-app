import {PreferenceSchema} from 'src/Schema/Preference/preference.schema';
import {PopupReviewSchema} from 'src/Schema/Popup/popupReview.schema';
import {VisitorDataSchema} from 'src/Schema/Popup/popupVisitorData.schema';

/**
 * 팝업 스토어 스키마
 * @author 도형
 */
export type PopupSchema = {
  /** 팝업 아이디 */
  id: number;

  /** 팝업 인스타그램 혹은 홈페이지 링크 */
  homepageLink: string;

  /** 팝업 인스타그램 혹은 홈페이지 여부 */
  isInstagram: boolean;

  /** 팝업스토어 이름 */
  name: string;

  /** 팝업스토어 한줄소개 */
  introduce: string;
  // /** 팝업스토어 관심있는지 여부 */ -> 삭제시킴!, popupInterestScrap 으로 분리
  // isInterested: boolean;

  /** 팝업스토어 기본 도로명 주소 */
  address: string;

  /** 팝업스토어 상세 도로명 주소 */
  addressDetail: string | null;

  /** 팝업스토어 입장료 */
  entranceFee: string;

  /** 팝업스토어 이용 가능 연령 */
  availableAge: string;

  /** 팝업스토어 주차 가능 여부 */
  parkingAvailable: boolean;

  /** 팝업스토어 예약 필수 여부 */
  isReservationRequired: boolean;

  /** 팝업스토어 재개점 요청 수 */
  reopenDemandCnt: number;

  /** 팝업스토어 관심등록(스크랩) 수 */
  interestScrapCnt: number;

  /** 팝업스토어 조회 수 */
  viewCnt: number;

  /** 팝업스토어 생성일 */
  createdAt: string;

  /** 팝업스토어 수정일 */
  editedAt: string;

  /** 팝업스토어 오픈일 */
  openDate: string;

  /** 팝업스토어 종료일 */
  closeDate: string;

  /** 팝업스토어 오픈시간 */
  openTime: string;

  /** 팝업스토어 종료시간 */
  closeTime: string;

  /** 팝업스토어 위도 */
  latitude: number;

  /** 팝업스토어 경도 */
  longitude: number;

  /** 팝업스토어 운영 예외 사항 */
  operationExcept: string | null;

  /** 팝업스토어 운영 상태 */
  operationStatus: string;

  /** 팝업스토어 대표 이미지 URL */
  mainImageUrl: string;

  /** 팝업스토어 이미지 URL 들 */
  imageUrls: string[];

  /** 팝업스토어 리뷰들 */
  review?: PopupReviewSchema[];

  /** 팝업스토어 방문자 데이터 */
  visitorData: VisitorDataSchema;

  /** 팝업스토어 실시간 방문자 수 */
  realTimeVisit: number;

  // /** 팝업스토어 방문 여부 */ -> 삭제시킴!, popupInterestScrap 으로 분리
  // isVisited: boolean;

  /** 팝업스토어에 속한 취향(선호도) 카테고리들 */
  preferences: PreferenceSchema;
};
