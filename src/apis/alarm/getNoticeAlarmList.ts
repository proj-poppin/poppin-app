import PublicApiInstance from '../apiInstance/PublicApiInstance';

const getNoticeAlarmList = async () => {
  try {
    const response = await PublicApiInstance.get('/api/v1/alarm/info');
    console.log('getNoticeAlarmList response:', response.data);
    if (response.data.success) {
      console.log('Notice alarm list@@@@@@:', response.data.data);
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
