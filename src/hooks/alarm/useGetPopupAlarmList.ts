import {useCallback, useEffect, useState} from 'react';
import getPopupAlarmList from '../../Axios/alarm/getPopupAlarmList.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface AlarmCardInfoProps {
  id: number;
  alarmId: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const useGetPopupAlarmList = () => {
  const [popupAlarmList, setPopupAlarmList] = useState<
    AlarmCardInfoProps[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopupAlarmList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const storedToken = await EncryptedStorage.getItem('pushToken');
      if (!storedToken) {
        throw new Error('No push token');
      }
      const response = await getPopupAlarmList(storedToken);
      if (response.success) {
        setPopupAlarmList(response.data);
      } else {
        setError(response.error);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopupAlarmList();
  }, [fetchPopupAlarmList]);

  return {popupAlarmList, loading, error, refetch: fetchPopupAlarmList};
};

export default useGetPopupAlarmList;
