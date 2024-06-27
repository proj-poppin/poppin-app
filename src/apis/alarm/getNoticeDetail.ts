import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

const getNoticeDetail = async (informId: string) => {
  const response = await nonPublicApiInstance.get('/api/v1/alarm/info/detail', {
    params: {informId: informId},
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

export default getNoticeDetail;
