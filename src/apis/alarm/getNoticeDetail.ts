import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';
import EncryptedStorage from 'react-native-encrypted-storage';

const getNoticeDetail = async (informId: string) => {
  const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
  const response = await nonPublicApiInstance.post(
    '/api/v1/alarm/info/detail',
    {
      fcmToken: fcmToken,
      informId: informId,
    },
  );

  if (response.data.success) {
    return response.data;
  } else {
    return {
      success: false,
      error: response.data.error,
    };
  }
};

export default getNoticeDetail;
