import {useState} from 'react';
import blockPopup from '../apis/blockPopup.ts';

interface BlockPopupState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useBlockPopup = () => {
  const [blockPopupState, setBlockPopupState] = useState<BlockPopupState>({
    loading: false,
    error: null,
    success: null,
  });

  const blockPopupDetails = async (
    popupId: number,
    content: string,
  ): Promise<CommonResponse<any>> => {
    setBlockPopupState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await blockPopup(popupId, content);
      if (response.success) {
        setBlockPopupState({loading: false, error: null, success: true});
        return response;
      } else {
        setBlockPopupState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to block popup'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setBlockPopupState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...blockPopupState, blockPopupDetails};
};

export default useBlockPopup;
