import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';

interface PushTokenParams {
  fcmToken: string;
  device: string;
  deviceId: string;
}

export const registerPushToken = async (params: PushTokenParams) => {
  const response = await PublicApiInstance.post(
    '/api/v1/noti/apply/FCMtoken',
    params,
  );
  return response.data;
};
