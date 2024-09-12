import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

// 비로그인시 사용
const getDetailPopUpPublic = async (
  id: number,
  alarmId: number,
  isAlarm: boolean,
): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
  try {
    const url = isAlarm
      ? '/api/v1/alarm/popup/guest/detail'
      : '/api/v1/popup/guest/detail';
    const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';

    const response = isAlarm
      ? await PublicApiInstance.post(url, {
          popupId: id,
          alarmId: alarmId,
          fcmToken: fcmToken,
        })
      : await PublicApiInstance.get(url, {params: {popupId: id}});

    // const response = await PublicApiInstance.post(url, {
    //   popupId: popUpId,
    //   title: title,
    //   fcmToken: fcmToken,
    // });

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default getDetailPopUpPublic;
