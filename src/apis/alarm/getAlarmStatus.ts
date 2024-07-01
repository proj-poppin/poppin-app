import PublicApiInstance from '../apiInstance/PublicApiInstance';

const getAlarmStatus = async (fcm_token: string) => {
  const response = await PublicApiInstance.post('/api/v1/alarm/', {
    fcmToken: fcm_token,
  });
  console.log('getNoticeAlarmList response:', response.data);

  if (response.data.success) {
    return response.data;
  } else {
    return {
      success: false,
      error: response.data.error,
    };
  }
};

export default getAlarmStatus;
