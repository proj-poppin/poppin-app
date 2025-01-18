import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
export const useRecentPopups = () => {
  const [recentPopups, setRecentPopups] = useState<PopupSchema[]>([]);
  const RECENT_POPUPS_KEY = 'recent_popups';

  const getRecentPopups = async () => {
    try {
      const storedPopups = await AsyncStorage.getItem(RECENT_POPUPS_KEY);
      if (storedPopups) {
        setRecentPopups(JSON.parse(storedPopups));
      }
    } catch (error) {
      console.error('최근 본 팝업 로드 실패:', error);
    }
  };

  const saveRecentPopup = async (popup: PopupSchema) => {
    try {
      const storedPopups = await AsyncStorage.getItem(RECENT_POPUPS_KEY);
      const currentPopups = storedPopups ? JSON.parse(storedPopups) : [];

      const newPopup = {
        ...popup,
        viewedAt: Date.now(),
      };

      const updatedPopups = [
        newPopup,
        ...currentPopups.filter((p: PopupSchema) => p.id !== popup.id),
      ].slice(0, 5);

      await AsyncStorage.setItem(
        RECENT_POPUPS_KEY,
        JSON.stringify(updatedPopups),
      );
      setRecentPopups(updatedPopups);
    } catch (error) {
      console.error('최근 본 팝업 저장 실패:', error);
    }
  };

  // 초기 로드
  useEffect(() => {
    getRecentPopups();
  }, []);

  return {recentPopups, saveRecentPopup, getRecentPopups};
};
