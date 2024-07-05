// hooks/useInterest.ts
import {useDispatch, useSelector} from 'react-redux';
import {setInterest} from '../redux/slices/interestSlice';
import {RootState} from '../redux/stores/reducer.ts';

export const useInterest = () => {
  const dispatch = useDispatch();
  const interestState = useSelector((state: RootState) => state.interest);

  const updateInterest = (id: number, isInterested: boolean) => {
    dispatch(setInterest({id, isInterested}));
  };

  return {interestState, updateInterest};
};
