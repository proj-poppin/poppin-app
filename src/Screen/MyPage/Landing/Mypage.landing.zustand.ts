import create from 'zustand';
import {useUserStore} from '../../../Zustand/User/user.zustand';
import {Alert} from 'react-native';

type MypageLandingScreenProps = {
  /** 로그아웃 함수 */
  logout: () => Promise<void>;
  /** 로그아웃 모달창 표시 여부 */
  logoutModalVisible: boolean;
  setLogoutModalVisible: (status: boolean) => void;
};

export const useMypageLandingScreenStore = create<MypageLandingScreenProps>(
  (set, get) => ({
    logout: async () => {
      await useUserStore.getState().logout();
      set({logoutModalVisible: false}); // 로그아웃 완료 후 상태 변경
    },
    logoutModalVisible: false,
    setLogoutModalVisible: (status: boolean) => {
      set({logoutModalVisible: status});
    },
  }),
);
