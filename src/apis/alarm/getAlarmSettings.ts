import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

const getAlarmSettings = async (fcm_token: string) => {
  const response = await nonPublicApiInstance.post('/api/v1/alarm/get', {
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

export default getAlarmSettings;
