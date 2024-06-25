import {useEffect, useState} from 'react';
import getNoticeAlarmList from '../../apis/alarm/getNoticeAlarmList.ts';

interface AlarmCardInfoProps {
  id: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const useGetNoticeAlarmList = () => {
  const [noticeAlarmList, setNoticeAlarmList] = useState<AlarmCardInfoProps[]>(
    [],
  );
  useEffect(() => {
    const fetchNoticeAlarmList = async () => {
      try {
        const response = await getNoticeAlarmList();
        setNoticeAlarmList(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchNoticeAlarmList().then();
  }, []);

  return noticeAlarmList;
};

export default useGetNoticeAlarmList;
