/**
 * 운영자 제보 스키마입니다.
 * @author 도형
 */
import {ImageTypeSchema} from 'src/Schema/imageType.schema';

export type InformerManagerSchema = {
  /** 이미지 파일 (multipart/form-data) */
  images: ImageTypeSchema[];

  /** 소속 (affiliation) */
  informerCompany: string;

  /** 제보자 이메일 */
  informerEmail: string;

  /** 공식 사이트 주소 (homepageLink) */
  storeUrl: string;

  /** 팝업 이름 (name) */
  storeName: string;

  /** 팝업 한 줄 소개 (introduce) */
  storeBriefDescription: string;

  /** 팝업 주소 (address) */
  storeAddress: string;

  /** 팝업 상세 주소 (필수X) (addressDetail) */
  storeDetailAddress?: string;

  /** 입장료 유무 (entranceRequired) */
  isEntranceFeeRequired: boolean;

  /** 팝업 입장료 (선택적) */
  entranceFee?: string;

  /** 이용 가능 연령 */
  availableAge: 'G_RATED' | 'PG_7' | 'PG_12' | 'PG_15' | 'PG_18';

  /** 팝업 주차 가능 여부 (parkingAvailable) */
  parkingAvailable: boolean;

  /** 팝업 예약 필수 여부 (resvRequired) */
  isReservationRequired: boolean;

  /** 팝업 오픈 날짜 (yyyy-MM-dd) */
  openDate: string;

  /** 팝업 종료 날짜 (yyyy-MM-dd) */
  closeDate: string;

  /** 팝업 오픈 시간 (hh:mm) */
  openTime: string;

  /** 팝업 마감 시간 (hh:mm) */
  closeTime: string;

  /** 운영 예외 사항 (필수X) (operationExcept) */
  operationException?: string;

  /** 위도 */
  latitude: number;

  /** 경도 */
  longitude: number;

  /** 마켓형 */
  market: boolean;

  /** 전시형 */
  display: boolean;

  /** 체험형 */
  experience: boolean;

  /** 무료였으면 좋겠어요 */
  wantFree: boolean;

  /** 패션/뷰티 */
  fashionBeauty: boolean;

  /** 캐릭터 */
  characters: boolean;

  /** 식품/음료 */
  foodBeverage: boolean;

  /** 웹툰/애니메이션 */
  webtoonAni: boolean;

  /** 인테리어/소품 */
  interiorThings: boolean;

  /** 영화/드라마/예능 */
  movie: boolean;

  /** 뮤지컬/연극 */
  musical: boolean;

  /** 스포츠 */
  sports: boolean;

  /** 게임 */
  game: boolean;

  /** IT/테크 */
  itTech: boolean;

  /** K-POP */
  kpop: boolean;

  /** 주류 */
  alcohol: boolean;

  /** 동물/식물 */
  animalPlant: boolean;

  /** 기타 */
  etc: boolean;

  /** 홀로 여부 */
  solo: boolean;

  /** 친구 */
  withFriend: boolean;

  /** 가족 */
  withFamily: boolean;

  /** 연인 */
  withLover: boolean;
};
