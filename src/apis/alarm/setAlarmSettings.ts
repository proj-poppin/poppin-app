import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

const setAlarmSettings = async (
  fcm_token: string,
  pushYn: string | undefined,
  pushNightYn: string | undefined,
  hoogiYn: string | undefined,
  openYn: string | undefined,
  magamYn: string | undefined,
  changeInfoYn: string | undefined,
) => {
  const response = await nonPublicApiInstance.post('/api/v1/alarm/set', {
    fcmToken: fcm_token,
    pushYn: pushYn,
    pushNightYn: pushNightYn,
    hoogiYn: hoogiYn,
    openYn: openYn,
    magamYn: magamYn,
    changeInfoYn: changeInfoYn,
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

export default setAlarmSettings;
