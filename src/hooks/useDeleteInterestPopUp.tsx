import {useState} from 'react';
import getDeletePopUp from '../apis/popup/deleteInterestPopUp.ts';

interface DeleteInterestState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useDeleteInterestPopUp = () => {
  const [deleteInterestState, setDeleteInterestState] =
    useState<DeleteInterestState>({
      loading: false,
      error: null,
      success: null,
    });

  const deleteInterest = async (popUpId: number) => {
    setDeleteInterestState({loading: true, error: null, success: null});

    try {
      const response = await getDeletePopUp(popUpId);
      if (response.success) {
        setDeleteInterestState({loading: false, error: null, success: true});
      } else {
        throw new Error(response.error?.message || 'Failed to delete interest');
      }
    } catch (error) {
      setDeleteInterestState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        success: false,
      });
    }
  };

  return {...deleteInterestState, deleteInterest};
};

export default useDeleteInterestPopUp;
