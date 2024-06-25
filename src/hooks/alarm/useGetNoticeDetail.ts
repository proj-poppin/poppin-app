import {useEffect, useState} from 'react';
import getNoticeDetail from '../../apis/alarm/getNoticeDetail.ts';

interface NoticeDetailProps {
  id: string;
  title: string;
  body: string;
  posterUrl: string;
  createdAt: number[];
}

const useGetNoticeDetail = (noticeId: string) => {
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetailProps | null>(
    null,
  );
  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await getNoticeDetail(noticeId);
        setNoticeDetail(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchNoticeDetail().then();
  }, [noticeId]);

  return noticeDetail;
};

export default useGetNoticeDetail;
