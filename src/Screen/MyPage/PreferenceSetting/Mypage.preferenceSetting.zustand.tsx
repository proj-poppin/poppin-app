import create from 'zustand';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
} from '../../../Object/preference.enum';

type MypagePreferenceSettingScreenProps = {
  selectedTags: Record<string, boolean>;
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  isAllCategoriesSelected: () => boolean;
};

export const useMypagePreferenceSettingScreenStore =
  create<MypagePreferenceSettingScreenProps>((set, get) => ({
    selectedTags: {},
    toggleTag: tag =>
      set(state => ({
        selectedTags: {
          ...state.selectedTags,
          [tag]: !state.selectedTags[tag],
        },
      })),
    resetTags: () => set({selectedTags: {}}),
    isAllCategoriesSelected: () => {
      const {selectedTags} = get();
      const isPopupCategorySelected = preferenceKeysForPopupCategory.some(
        key => selectedTags[key],
      );
      const isPopupInterestSelected = preferenceKeysForPopupInterest.some(
        key => selectedTags[key],
      );
      const isPopupMateSelected = preferenceKeysForPopupMate.some(
        key => selectedTags[key],
      );

      return (
        isPopupCategorySelected &&
        isPopupInterestSelected &&
        isPopupMateSelected
      );
    },
  }));
