import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PreferenceData} from '../../types/PreferenceData.ts';

// 초기 상태와 같이 타입 정의
const initialState: PreferenceData = {
  preference: {
    market: false,
    display: false,
    experience: false,
    wantFree: false,
  },
  taste: {
    fashionBeauty: false,
    characters: false,
    foodBeverage: false,
    webtoonAni: false,
    interiorThings: false,
    movie: false,
    musical: false,
    sports: false,
    game: false,
    itTech: false,
    kpop: false,
    alcohol: false,
    animalPlant: false,
  },
  whoWith: {
    solo: false,
    withFriend: false,
    withFamily: false,
    withLover: false,
  },
};

const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setPreference(
      state,
      action: PayloadAction<{
        category: keyof PreferenceData;
        key: string;
        value: boolean;
      }>,
    ) {
      const {category, key, value} = action.payload;
      if (category in state) {
        const categoryKeys = Object.keys(state[category]);
        if (categoryKeys.includes(key)) {
          (state[category] as any)[key] = value;
        }
      }
    },
    resetPreferences() {
      return initialState;
    },
  },
});

export const {setPreference, resetPreferences} = preferenceSlice.actions;
export default preferenceSlice;
