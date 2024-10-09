import {useCallback, useEffect, useState} from 'react';
import getNoticeAlarmList from '../../Axios/alarm/getNoticeAlarmList.ts';

export interface AlarmCardInfoProps {
  id: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const useGetNoticeAlarmList = () => {
  const [noticeAlarmList, setNoticeAlarmList] = useState<
    AlarmCardInfoProps[] | null
  >(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeAlarmList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNoticeAlarmList();
      if (response.success) {
        setNoticeAlarmList(response.data);
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
    fetchNoticeAlarmList();
  }, [fetchNoticeAlarmList]);

  return {noticeAlarmList, loading, error, refetch: fetchNoticeAlarmList};
};

export default useGetNoticeAlarmList;
