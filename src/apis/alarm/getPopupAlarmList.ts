import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';

const getPopupAlarmList = async (fcm_token: string) => {
  const response = await PublicApiInstance.post('/api/v1/alarm/popup', {
    fcmToken: fcm_token,
  });

  if (response.data.success) {
    return response.data;
  } else {
    return {
      success: false,
      error: response.data.error,
    };
  }
};

export default getPopupAlarmList;
