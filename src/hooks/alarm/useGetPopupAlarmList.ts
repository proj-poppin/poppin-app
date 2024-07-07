import {useEffect, useState} from 'react';
import getNoticeAlarmList from '../../apis/alarm/getNoticeAlarmList';
import getPopupAlarmList from '../../apis/alarm/getPopupAlarmList.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface AlarmCardInfoProps {
  id: number;
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

  useEffect(() => {
    const fetchPopupAlarmList = async () => {
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
    };

    fetchPopupAlarmList();
  }, []);

  return {popupAlarmList, loading, error};
};

export default useGetPopupAlarmList;
