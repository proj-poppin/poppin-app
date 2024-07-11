import {useState} from 'react';
import {blockUser} from '../apis/report/blockUser.ts';

interface BlockUserState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useBlockUser = () => {
  const [blockUserState, setBlockUserState] = useState<BlockUserState>({
    loading: false,
    error: null,
    success: null,
  });

  const blockUserDetails = async (
    blockUserId: number,
  ): Promise<CommonResponse<any>> => {
    setBlockUserState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await blockUser(blockUserId);
      if (response.success) {
        setBlockUserState({loading: false, error: null, success: true});
        return response;
      } else {
        setBlockUserState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to block user'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setBlockUserState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...blockUserState, blockUserDetails};
};

export default useBlockUser;
