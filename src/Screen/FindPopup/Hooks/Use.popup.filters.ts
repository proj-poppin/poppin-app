import {usePopupScreenStore} from '../Zustand/Popup.landing.zustand';

/**
 * 필터 관련 상태 및 핸들러
 * @author 희진
 */

export const usePopupFilters = () => {
  const {
    modalVisible,
    toggleModal,
    applyFilters,
    resetFilters,
    preferenceCategory,
    preferencePopupStore,
  } = usePopupScreenStore();

  const handleApplyFilters = (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => {
    applyFilters(selectedCategories);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  return {
    modalVisible,
    toggleModal,
    handleApplyFilters,
    handleResetFilters,
    preferenceCategory,
    preferencePopupStore,
  };
};
