import customAxios, {USERS} from 'src/Axios/axios.core';
import {UserNotificationSettingSchema} from 'src/Schema/User/userNotificationSetting.schema';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 유저 프로필 정보를 수정합니다.(닉네임, 프로필 이미지)
 * @param formData(닉네임, 프로필 이미지)
 * @author 도형
 */

// export default putChangeProfileImage;
// patchUserSetting

export const axiosUpdateUserProfile = async (formData: FormData) => {
  return await customAxios
    .request<void>({
      method: 'PATCH',
      url: `v1/${USERS}/profile`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '유저 정보 수정에 실패했습니다.',
      });
      return null;
    });
};

/**
 * 유저의 알림 설정을 수정합니다.
 * @author 도형
 */

export const axiosUpdateUserNotificationSetting = async (
  userNotificationSetting: Partial<UserNotificationSettingSchema>,
) => {
  return await customAxios
    .request<void>({
      method: 'PATCH',
      url: `${USERS}/notifications/setting`,
      data: {...userNotificationSetting},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '알림 설정 수정에 실패했습니다.',
      });
      return null;
    });
};

/**
 * 특정 알림을 읽음 처리합니다.
 * 만약 알림 _id 가 빈 문자열인 경우 요청을 보내지 않습니다.
 * @author 도형
 */
export const axiosCheckNotification = async (notificationId: string) => {
  if (notificationId === undefined || notificationId === '') {
    return null;
  }
  return await customAxios
    .request<void>({
      method: 'PATCH',
      url: `${USERS}/notifications/check`,
      data: {notificationId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return null;
    });
};

/**
 * 특정 유저를 차단합니다. 해당 유저의 모든 리뷰를 볼 수 없게 됩니다.
 * @author 도형
 */
export const axiosBlockUser = async (blockedUserId: string) => {
  return await customAxios
    .request<void>({
      method: 'PATCH',
      url: `v1/${USERS}/block/${blockedUserId}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage:
          '유저 차단 정보가 서버에 반영되지 못했습니다.\n여전히 차단은 유지됩니다.',
      });
      return null;
    });
};
