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
