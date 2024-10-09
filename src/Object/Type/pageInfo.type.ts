/**
 * 필터링 팝업찾기 페이지네이션에 사용되는 타입
 * 개선가능하나 일단 유지
 * @author 도형
 */

export type PageInfoType = {
  page: number;
  size: number;
  totalPages: number;
  isLast: boolean;
};
