import {UserProfileSchema} from 'Schema/User/userProfile.schema.ts';
import {UserProfileSettingSchema} from 'Schema/User/userProfileSetting.schema.ts';

type UserStoreProps = {
  refreshToken: string;
  accessToken: string;
  userProfile: UserProfileSchema;
  userProfileSetting: UserProfileSettingSchema;

  setUserProfile: (userProfile: UserProfileSchema) => void;
  setUserProfileSetting: (userProfileSetting: UserProfileSettingSchema) => void;

  isLoggedIn: () => boolean;
};
