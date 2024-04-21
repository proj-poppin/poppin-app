import {useState} from 'react';
import addInterestPopUp from '../apis/popup/addInterestPopUp.ts';

interface AddInterestState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useAddInterestPopUp = () => {
  const [addInterestState, setAddInterestState] = useState<AddInterestState>({
    loading: false,
    error: null,
    success: null,
  });

  const addInterest = async (popUpId: number) => {
    setAddInterestState({loading: true, error: null, success: null});
    console.log('why why why', popUpId);
    try {
      const response = await addInterestPopUp(popUpId);
      if (response.success) {
        console.log('addInterestPopUp response:', response.data);
        setAddInterestState({loading: false, error: null, success: true});
      } else {
        console.log('why why why', response);
        throw new Error(response.error?.message || 'Failed to add interest');
      }
    } catch (error) {
      console.log('why why why', error);
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

export default useAddInterestPopUp;
