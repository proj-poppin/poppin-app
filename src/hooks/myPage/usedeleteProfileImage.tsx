import {useState} from 'react';
import deleteProfileImage, {
  DeleteProfileImageResponse,
} from '../../Axios/myPage/⭐\uFE0FdeleteProfileImage.ts';

interface DeleteProfileImageInfoState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useDeleteProfileImage = () => {
  const [deleteInfoState, setDeleteInfoState] =
    useState<DeleteProfileImageInfoState>({
      loading: false,
      error: null,
      success: null,
    });

  const deleteProfileImageHandler =
    async (): Promise<DeleteProfileImageResponse> => {
      setDeleteInfoState({loading: true, error: null, success: null});
      try {
        const response: DeleteProfileImageResponse = await deleteProfileImage();
        if (response.success) {
          setDeleteInfoState({loading: false, error: null, success: true});
        } else {
          setDeleteInfoState({
            loading: false,
            error: new Error(
              response.error?.message || 'Failed to delete profile image',
            ),
            success: false,
          });
        }
        return response;
      } catch (error) {
        const err =
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred');
        setDeleteInfoState({loading: false, error: err, success: false});
        return {
          success: false,
          data: '회원탈퇴 실패',
          error: {code: 'unknown', message: err.message},
        };
      }
    };

  return {...deleteInfoState, deleteProfileImageHandler};
};

export default useDeleteProfileImage;
