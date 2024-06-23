import {useState} from 'react';
import addInterestPopUp from '../../apis/popup/addInterestPopUp.ts';
import EncryptedStorage from "react-native-encrypted-storage";

interface AddInterestState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const usePostBookmarkPopup = () => {
  const [addInterestState, setAddInterestState] = useState<AddInterestState>({
    loading: false,
    error: null,
    success: null,
  });

  const addInterest = async (popupId: number) => {
    setAddInterestState({loading: true, error: null, success: null});
    try {
      const fcm_token = (await EncryptedStorage.getItem('pushToken')) ?? '';
      const response = await addInterestPopUp({popupId, fcm_token});
      if (response.success) {
        setAddInterestState({loading: false, error: null, success: true});
      } else {
        throw new Error(response.error?.message || 'Failed to add interest');
      }
    } catch (error) {
      setAddInterestState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        success: false,
      });
    }
  };

  return {...addInterestState, addInterest: addInterest};
};

export default usePostBookmarkPopup;
