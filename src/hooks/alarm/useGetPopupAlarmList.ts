import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import getPopupAlarmList from '../../apis/alarm/getPopupAlarmList.ts';

interface AlarmCardInfoProps {
  id: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const useGetPopupAlarmList = () => {
  const [noticeAlarmList, setNoticeAlarmList] = useState<AlarmCardInfoProps[]>(
    [],
  );
  useEffect(() => {
    const fetchNoticeAlarmList = async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('pushToken');
        if (!storedToken) {
          throw new Error('No push token');
        }

        const response = await getPopupAlarmList(storedToken);
        setNoticeAlarmList(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchNoticeAlarmList().then();
  }, []);

  return noticeAlarmList;
};

export default useGetPopupAlarmList;
