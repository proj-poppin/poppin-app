import {useState} from 'react';
import modifyPopUpInfo from '../../apis/popup/modifyPopUpInfo.ts';

interface ModifyPopUpInfoState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useModifyPopUpInfo = () => {
  const [modifyInfoState, setModifyInfoState] = useState<ModifyPopUpInfoState>({
    loading: false,
    error: null,
    success: null,
  });

  const modifyInfoDetails = async (
    popupId: number,
    content: string,
    images: string[],
  ): Promise<CommonResponse<any>> => {
    setModifyInfoState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await modifyPopUpInfo(
        popupId,
        content,
        images,
      );
      if (response.success) {
        setModifyInfoState({loading: false, error: null, success: true});
        return response;
      } else {
        setModifyInfoState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to modify info'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setModifyInfoState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...modifyInfoState, modifyInfoDetails};
};

export default useModifyPopUpInfo;
