import {PopupSortOrder} from 'src/Object/Type/popupSortOrder.type';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';
/**
 * 팝업 찾기시 필터링을 위한 타입
 * @author 도형
 */
export type PopupSearchParams = {
  searchName: string; // 검색할 팝업 이름
  selectedPreferenceCategories: string[]; // 선택된 카테고리 선호도
  operationStatus: OperationStatus; // 운영 상태 (예: 진행 중, 종료 등)
  order: PopupSortOrder; // 정렬 순서 (예: 최신순, 인기순 등)
  selectedPreferencePopupStores: string[]; // 선택된 팝업스토어 선호도
  lastPopupId: string; // 마지막 팝업 아이디
  // page: number; // 페이지 번호
  // size: number; // 페이지당 항목 수
};
