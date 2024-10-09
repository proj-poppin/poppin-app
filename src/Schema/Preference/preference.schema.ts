import {PreferenceCategory} from 'src/Schema/Preference/preferenceCategory.schema';
import {PreferencePopupStore} from 'src/Schema/Preference/preferencePopupStore';
import {PreferenceCompanion} from 'src/Schema/Preference/preferenceCompanion.schema';

/**
 * 팝업 취향정보 스키마입니다.
 * @author 도형
 */
export type PreferenceSchema = {
  preferencePopupStore: PreferencePopupStore;
  preferenceCategory: PreferenceCategory;
  preferenceCompanion: PreferenceCompanion;
};

export const BlankPreference: PreferenceSchema = {
  preferencePopupStore: {
    id: 0,
    market: false,
    display: false,
    experience: false,
    wantFree: false,
  },
  preferenceCategory: {
    id: 0,
    fashionBeauty: false,
    characters: false,
    foodBeverage: false,
    webtoonAnimation: false,
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
  preferenceCompanion: {
    id: 0,
    solo: false,
    withFriend: false,
    withFamily: false,
    withLover: false,
  },
};
