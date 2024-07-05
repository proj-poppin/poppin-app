import {useEffect, useState} from 'react';
import getNoticeAlarmList from '../../apis/alarm/getNoticeAlarmList';

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
        const response = await getNoticeAlarmList();
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
