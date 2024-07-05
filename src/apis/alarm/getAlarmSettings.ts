import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

const getAlarmSettings = async (
  fcm_token: string,
  pushYn: string,
  pushNightYn: string,
  hoogiYn: string,
  openYn: string,
  magamYn: string,
  changeInfoYn: string,
) => {
  const response = await nonPublicApiInstance.post(
    '/api/v1/alarm/read/setting',
    {
      fcmToken: fcm_token,
      pushYn,
      pushNightYn,
      hoogiYn,
      openYn,
      magamYn,
      changeInfoYn,
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

export default getAlarmSettings;
