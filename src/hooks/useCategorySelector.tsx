import {useState, useCallback, useRef, useMemo} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export const useCategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelectOption = (option: string) => {
    setSelectedCategory(option);
  };

  const handleConfirmSelection = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    bottomSheetModalRef,
    snapPoints,
    handlePresentModal,
    onSelectOption,
    handleConfirmSelection,
  };
};
