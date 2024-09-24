/**
 * 팝업 카테고리 선호도 스키마
 * @author 도형
 */
export type PreferenceCategory = {
  id: number;
  fashionBeauty: boolean; // 패션/뷰티 선호 여부
  characters: boolean; // 캐릭터 선호 여부
  foodBeverage: boolean; // 음식/음료 선호 여부
  webtoonAnimation: boolean; // 웹툰/애니메이션 선호 여부
  interiorThings: boolean; // 인테리어 선호 여부
  movie: boolean; // 영화 선호 여부
  musical: boolean; // 뮤지컬 선호 여부
  sports: boolean; // 스포츠 선호 여부
  game: boolean; // 게임 선호 여부
  itTech: boolean; // IT/기술 선호 여부
  kpop: boolean; // K-POP 선호 여부
  alcohol: boolean; // 주류 선호 여부
  animalPlant: boolean; // 동물/식물 선호 여부
};
