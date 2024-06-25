import PublicApiInstance from '../apiInstance/PublicApiInstance';

const getNoticeAlarmList = async () => {
  const response = await PublicApiInstance.get('/api/v1/alarm/info');
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

export default getNoticeAlarmList;
