import {combineReducers} from 'redux';

import userSlice from '../slices/user';

// entire state
const rootReducer = combineReducers({
  user: userSlice.reducer, // user state, 접근은 state.user, 유저 속성접근은 state.user.name
});

//⭐️타입에러방지
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
