import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

const getDetailPopUp = async (
  id: number,
  alarmId?: number,
  isAlarm?: boolean,
): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
  try {
    const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
    const url = isAlarm ? '/api/v1/alarm/detail/popup' : '/api/v1/popup/detail';

    const response = isAlarm
      ? await nonPublicApiInstance.post(url, {
          popupId: id,
          alarmId: alarmId,
          fcmToken: fcmToken,
        })
      : await nonPublicApiInstance.get(url, {params: {popupId: id}});

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

export default getDetailPopUp;
