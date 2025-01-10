import React from 'react';
import shallow from 'zustand/shallow';
import {usePopupScreenStore} from './Popup.landing.zustand';
import PopupCategoryModal from '../../../Component/Modal/Popup.category.modal';
import {BlankPreference} from '../../../Schema/Preference/preference.schema';
import {PreferenceCategory} from '../../../Schema/Preference/preferenceCategory.schema';
import {PreferencePopupStore} from '../../../Schema/Preference/preferencePopupStore';
import {categoryKeys, popupStoreKeys} from '../../../Object/preference.enum';

interface PopupLandingCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  buttonName: string;
}

export const PopupLandingCategoryModal: React.FC<
  PopupLandingCategoryModalProps
> = ({visible, onClose, buttonName}) => {
  const {
    setSelectedCategories,
    setSelectedPopupStores,
    preferenceCategory,
    preferencePopupStore,
    setFilteringFourteenCategories,
    setFilteringThreeCategories,
  } = usePopupScreenStore(
    state => ({
      setSelectedCategories: state.setSelectedCategories,
      setSelectedPopupStores: state.setSelectedPopupStores,
      preferenceCategory: state.preferenceCategory,
      preferencePopupStore: state.preferencePopupStore,
      setFilteringFourteenCategories: state.setFilteringFourteenCategories,
      setFilteringThreeCategories: state.setFilteringThreeCategories,
    }),
    shallow,
  );

  // 필터 변경 처리
  const handleFilterChange = (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => {
    const updatedCategories = categoryKeys.reduce((acc, key) => {
      acc[key as keyof PreferenceCategory] =
        selectedCategories.selectedCategories.includes(key);
      return acc;
    }, {} as PreferenceCategory);

    const updatedPopupStores = popupStoreKeys.reduce((acc, key) => {
      acc[key as keyof PreferencePopupStore] =
        selectedCategories.selectedPopupTypes.includes(key);
      return acc;
    }, {} as PreferencePopupStore);

    setFilteringFourteenCategories(updatedCategories);
    setFilteringThreeCategories(updatedPopupStores);

    // API 요청 트리거
    usePopupScreenStore.getState().refreshAllTabs();

    onClose();
  };

  // 필터 초기화
  const handleResetFilter = () => {
    setFilteringFourteenCategories(BlankPreference.preferenceCategory);
    setFilteringThreeCategories(BlankPreference.preferencePopupStore);
    usePopupScreenStore.getState().refreshAllTabs();
    onClose();
  };

  return (
    <PopupCategoryModal
      visible={visible}
      onClose={onClose}
      onApply={handleFilterChange}
      onReset={handleResetFilter} // onReset 추가
      buttonName={buttonName}
      validationMode="both"
      initialPreferenceCategory={preferenceCategory}
      initialPreferencePopupStore={preferencePopupStore}
    />
  );
};
