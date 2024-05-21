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
