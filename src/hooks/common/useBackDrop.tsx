// hooks/useBackdrop.ts
import React from 'react';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const useBackdrop = (
  props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );
};

export default useBackdrop;
