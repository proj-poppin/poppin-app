import {useState} from 'react';
import getDeletePopUp from '../../Axios/popup/deleteInterestPopUp.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

interface DeleteInterestState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
  message: string | null;
}

const useDeleteInterestPopUp = () => {
  const [deleteInterestState, setDeleteInterestState] =
    useState<DeleteInterestState>({
      loading: false,
      error: null,
      success: null,
      message: null,
    });

  const deleteInterest = async (popupId: number) => {
    setDeleteInterestState({
      loading: true,
      error: null,
      success: null,
      message: null,
    });

    try {
      const fcm_token = (await EncryptedStorage.getItem('pushToken')) ?? '';
      const response = await getDeletePopUp({popupId, fcm_token});
      if (response.success) {
        setDeleteInterestState({
          loading: false,
          error: null,
          success: true,
          message: '관심팝업에서 삭제되었어요!',
        });
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
        message: null,
      });
    }
  };

  return {...deleteInterestState, deleteInterest};
};

export default useDeleteInterestPopUp;
