import PublicApiInstance from '../apiInstance/PublicApiInstance.ts';

interface PushTokenParams {
  token: string;
  device: string;
}
export const registerPushToken = async (params: PushTokenParams) => {
  const response = await PublicApiInstance.post(
    '/api/v1/noti/apply/FCMtoken',
    params,
  );
  return response.data;
};
