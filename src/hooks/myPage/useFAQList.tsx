import {useState, useEffect} from 'react';
import getFAQApi from '../../Axios/myPage/⭐\uFE0FgetFAQ.ts';

interface FAQListState {
  loading: boolean;
  error: Error | null;
  data: any[] | null;
}

const useFAQList = () => {
  const [FAQListState, setFAQListState] = useState<FAQListState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const getFAQList = async () => {
      setFAQListState(prevState => ({...prevState, loading: true}));
      try {
        const response = await getFAQApi();
        if (response.success) {
          const modifiedData = response.data.map((item: any) => ({
            ...item,
            selected: false,
          }));

          setFAQListState({loading: false, error: null, data: modifiedData});
        } else {
          setFAQListState({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
        }
      } catch (error: any) {
        setFAQListState({
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error('An unexpected error occurred'),
          data: null,
        });
      }
    };

    getFAQList();
  }, []);

  return FAQListState;
};

export default useFAQList;
