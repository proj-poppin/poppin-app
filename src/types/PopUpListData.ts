export type GetPopUpListResponse = {
  id: number;
  image_url: string;
  name: string;
  introduce: string;
};

export type GetTastePopUpListResponse = {
  taste: string; // 여기서는 taste가 문자열로 되어있습니다.
  popupSummaryDtos: GetPopUpListResponse[]; // 이전에 정의한 GetPopUpListResponse 타입의 배열
};

export type GetInterestPopUpListResponse = {
  saved_count: any;
  id: number;
  image_url: string;
  status: string;
  name: string;
  open_date: string;
  close_date: string;
};
