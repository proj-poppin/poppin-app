/**
 * 이용자 제보 스키마입니다.
 * @author 도형
 */

export type InformerUserSchema = {
  /** 팝업 이름 (storeName) */
  storeName: string;

  /** 정보를 접한 사이트 주소 (referralSiteUrl) */
  referralSiteUrl: string;

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

  /** 팝업 이미지 (test.jpg 파일, 이미지 업로드) */
  images: File[];

  /** 기타 (etc: 필드의 의미가 명확하지 않음, 추가 설명 필요) */
  etc?: boolean;
};
