import {usePopupScreenStore} from '../Zustand/Popup.landing.zustand';

/**
 * 검색 관련 상태 및 핸들러
 * @author 희진
 */

export const usePopupSearch = () => {
  const {searchKeyword, isSearchMode, setSearchKeyword, toggleSearchMode} =
    usePopupScreenStore();

  const handleSearchToggle = () => toggleSearchMode(true);
  const handleBackPress = () => toggleSearchMode(false);

  return {
    searchKeyword,
    isSearchMode,
    setSearchKeyword,
    handleSearchToggle,
    handleBackPress,
  };
};
