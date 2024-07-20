import PublicApiInstance from '../apiInstance/PublicApiInstance';
import EncryptedStorage from 'react-native-encrypted-storage';

const getNoticeAlarmList = async () => {
  try {
    const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
    const response = await PublicApiInstance.post('/api/v1/alarm/info', {
      fcmToken: fcmToken,
    });

    // console.log('getNoticeAlarmList response:', response.data);
    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, error: response.data.error};
    }
  } catch (error: any) {
    console.error('Error fetching notice alarm list:', error);
    return {success: false, error: error.message};
  }
};

export default getNoticeAlarmList;
