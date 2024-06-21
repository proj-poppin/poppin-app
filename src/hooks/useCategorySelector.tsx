import {useState, useCallback, useRef, useMemo} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export const useCategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelectOption = (option: string) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(option)
        ? prevSelectedCategories.filter(item => item !== option)
        : [...prevSelectedCategories, option],
    );
  };

  const handleConfirmSelection = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return {
    selectedCategories,
    setSelectedCategories,
    bottomSheetModalRef,
    snapPoints,
    handlePresentModal,
    onSelectOption,
    handleConfirmSelection,
  };
};
