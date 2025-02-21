import {usePopupScreenStore} from '../Zustand/Popup.landing.zustand';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';

/**
 * 팝업 리스트 관리 및 페이징
 * @author 희진
 */

export const usePopupList = (operationStatus: OperationStatus) => {
  const {
    [operationStatus]: {searchedPopupStores, isLoading, pageInfo},
    loadMorePopupStores,
  } = usePopupScreenStore();

  const onEndReached = () => {
    if (!pageInfo.isLast) {
      loadMorePopupStores(operationStatus);
    }
  };

  return {searchedPopupStores, isLoading, onEndReached};
};
