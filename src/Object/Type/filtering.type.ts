import {PopupSortOrder} from 'src/Object/Type/popupSortOrder.type';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';
/**
 * 팝업 찾기시 필터링을 위한 타입
 * @author 도형
 */
export type PopupSearchParams = {
  searchName: string; // 검색할 팝업 이름
  filteringThreeCategories: string; // 선택된 팝업 유형(3개, 소비형, 전시형, 체험형)
  operationStatus: OperationStatus; // 운영 상태 (예: 진행 중, 종료 등)
  order: PopupSortOrder; // 정렬 순서 (예: 최신순, 인기순 등)
  filteringFourteenCategories: string; //선택된 팝업 카테고리(14개. ex 패션뷰티, 캐릭터, ...)
  page: number; // 페이지 번호
  size: number; // 페이지당 항목 수
};
// lastPopupId: string; // 마지막 팝업 아이디 // 보류
