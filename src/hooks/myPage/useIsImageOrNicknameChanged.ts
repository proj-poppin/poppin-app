import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/stores/reducer';
import {resetChangeFlags} from '../../redux/slices/user.ts';

const useIsImageOrNicknameChanged = () => {
  const isProfileImageChanged = useSelector(
    (state: RootState) => state.user.isProfileImageChanged,
  );
  const isNicknameChanged = useSelector(
    (state: RootState) => state.user.isNicknameChanged,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isProfileImageChanged || isNicknameChanged) {
      dispatch(resetChangeFlags());
    }
  }, [isProfileImageChanged, isNicknameChanged, dispatch]);

  return isProfileImageChanged || isNicknameChanged;
};

export default useIsImageOrNicknameChanged;
