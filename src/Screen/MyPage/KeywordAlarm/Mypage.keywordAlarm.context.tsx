import React, {createContext, useContext, useEffect, useState} from 'react';
import {axiosMypageDeleteKeywordAlarm} from 'src/Axios/Mypage/mypage.delete.axios';
import {axiosGetKeywordAlarms} from 'src/Axios/Mypage/mypage.get.axios';
import {axiosMypageAddKeywordAlarm} from 'src/Axios/Mypage/mypage.post.axios';
import {axiosMypageToggleKeywordAlarm} from 'src/Axios/Mypage/mypage.put.axios';
interface KeywordAlarmContextType {
  keywordAlarms: KeywordAlarm[];
  isLoading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  fetchKeywordAlarms: () => void;
  deleteKeyword: (keywordId: number) => void;
  addKeywordAlarm: () => void;
  toggleKeywordAlarm: (keywordId: number, isOn: boolean) => void;
}
const KeywordAlarmContext = createContext<KeywordAlarmContextType>({
  keywordAlarms: [],
  isLoading: false,
  error: null,
  searchKeyword: '',
  setSearchKeyword: () => {},
  fetchKeywordAlarms: () => {},
  deleteKeyword: () => {},
  addKeywordAlarm: () => {},
  toggleKeywordAlarm: () => {},
});
export interface KeywordAlarm {
  keywordId: number;
  keyword: string;
  isOn: boolean;
}

interface KeywordAlarmContextType {
  keywordAlarms: KeywordAlarm[];
  isLoading: boolean;
  error: string | null;
  fetchKeywordAlarms: () => void;
  deleteKeyword: (keywordId: number) => void;
  toggleKeywordAlarm: (keywordId: number, isOn: boolean) => void;
}

export const KeywordAlarmProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [keywordAlarms, setKeywordAlarms] = useState<KeywordAlarm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    void fetchKeywordAlarms();
  }, []);

  const fetchKeywordAlarms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosGetKeywordAlarms();
      if (response) {
        setKeywordAlarms(response); // null 체크 추가
      }
    } catch (err) {
      setError('키워드 알람 불러오는데 에러가 생겼습니다.');
      setKeywordAlarms([]); // 에러 시 빈 배열로 초기화
    } finally {
      setIsLoading(false);
    }
  };

  const addKeywordAlarm = async () => {
    if (!searchKeyword.trim()) return;

    try {
      await axiosMypageAddKeywordAlarm(searchKeyword);
      setSearchKeyword('');
      await fetchKeywordAlarms();
    } catch (err) {
      setError('키워드 추가에 실패했습니다.');
    }
    setIsLoading(false);
  };

  const toggleKeywordAlarm = async (keywordId: number, isOn: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosMypageToggleKeywordAlarm(keywordId, isOn);
      await fetchKeywordAlarms();
    } catch (err) {
      setError('키워드 알람을 키고 끄는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKeyword = async (keywordId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosMypageDeleteKeywordAlarm(keywordId);
      await fetchKeywordAlarms();
    } catch (err) {
      setError('키워드 알람을 삭제하는 데에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeywordAlarmContext.Provider
      value={{
        keywordAlarms,
        isLoading,
        error,
        searchKeyword,
        setSearchKeyword,
        fetchKeywordAlarms,
        deleteKeyword,
        addKeywordAlarm,
        toggleKeywordAlarm,
      }}>
      {children}
    </KeywordAlarmContext.Provider>
  );
};

export const useKeywordAlarmContext = () => {
  const context = useContext(KeywordAlarmContext);

  if (!context) {
    throw new Error(
      'useKeywordAlarm must be used within a KeywordAlarmProvider',
    );
  }

  return {
    keywordAlarms: context.keywordAlarms,
    isLoading: context.isLoading,
    error: context.error,
    searchKeyword: context.searchKeyword,
    setSearchKeyword: context.setSearchKeyword,
    fetchKeywordAlarms: context.fetchKeywordAlarms,
    deleteKeyword: context.deleteKeyword,
    addKeywordAlarm: context.addKeywordAlarm,
    toggleKeywordAlarm: context.toggleKeywordAlarm,
  };
};
