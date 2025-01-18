import create from 'zustand';
import {useUserStore} from './user.zustand';
import {NotificationSchema} from 'src/Schema/User/notification.schema';
import {
  axiosGetOlderNotifications,
  axiosGetRecentNotifications,
} from 'src/Axios/User/user.get.axios';
import {axiosCheckNotification} from 'src/Axios/User/user.patch.axios';

export type NotificationCategory = 'popups' | 'notices';

type NotificationStoreProps = {
  notifications: {
    popups: NotificationSchema[];
    notices: NotificationSchema[];
  };
  setNotifications: (notifications: {
    popups: NotificationSchema[];
    notices: NotificationSchema[];
  }) => void;

  refreshNotifications: () => Promise<void>;

  /**
   * 특정 알림을 읽음처리하고
   * userNotificationSetting 의 lastCheck 값을 현재 시간으로 바꿉니다
   */
  checkNotification: (param: {
    category: NotificationCategory;
    notificationId: string;
  }) => Promise<void>;
  deleteAllNotification: () => Promise<void>;
  deleteNotification: (param: {
    category: NotificationCategory;
    notificationId: string;
  }) => Promise<void>;

  gettingNewer: boolean;
  gettingOlder: boolean;
  noMoreNotifications: {
    popups: [];
    notices: [];
  };
  getNewNotifications: () => Promise<void>;
  getOlderNotifications: (category: NotificationCategory) => Promise<void>;

  clearNotificationStates: () => void;
};

/**
 * 사용자가 수신한 (푸시) 알림 상태값 및 관련 함수들입니다.
 * @author 도형
 */
export const useNotificationStore = create<NotificationStoreProps>(
  (set, get) => ({
    notifications: {
      popups: [],
      notices: [],
    },
    setNotifications: (notifications: {
      popups: NotificationSchema[];
      notices: NotificationSchema[];
    }) => {
      set({notifications});
    },

    refreshNotifications: async () => {
      const newNotifications = await axiosGetRecentNotifications();
      if (newNotifications !== null) {
        set({notifications: newNotifications});
      }
    },

    checkNotification: async (param: {
      category: NotificationCategory;
      notificationId: string;
    }) => {
      if (param.notificationId === '') {
        return;
      }
      const updatedTargetNotifications = get().notifications[
        'popups' || 'notices'
      ].map(notification => {
        if (notification.id === param.notificationId) {
          return {
            ...notification,
            checked: true,
          };
        }
        return notification;
      });

      set({
        notifications: {
          ...get().notifications,
          [param.category]: updatedTargetNotifications,
        },
      });
      useUserStore.getState().setUserNotificationSetting({
        // lastCheck: getCurrentISOTime(),
      });
      await axiosCheckNotification(param.notificationId);
    },
    deleteAllNotification: async () => {
      // set({ notifications: [] });
      // await axiosDeleteAllNotification();
    },
    deleteNotification: async (param: {
      category: NotificationCategory;
      notificationId: string;
    }) => {
      const updatedTargetNotifications = get().notifications[
        param.category
      ].filter(notification => notification.id !== param.notificationId);
      set({
        notifications: {
          ...get().notifications,
          [param.category]: updatedTargetNotifications,
        },
      });
      // await axiosDeleteNotification(param.notificationId);
    },

    gettingNewer: false,
    gettingOlder: false,
    noMoreNotifications: {
      popups: [],
      notices: [],
    },
    getNewNotifications: async () => {
      if (get().gettingNewer) {
        return;
      }
      set({gettingNewer: true});

      const newNotifications = await axiosGetRecentNotifications();

      if (newNotifications !== null) {
        set({notifications: newNotifications});
      }
      set({gettingNewer: false});
    },
    getOlderNotifications: async (category: NotificationCategory) => {
      if (get().gettingOlder || get().noMoreNotifications[category]) {
        return;
      }
      set({gettingOlder: true});

      if (get().notifications[category].length === 0) {
        return;
      }
      const lastNotificationId = get().notifications[category].slice(-1)[0].id;

      const olderNotifications = await axiosGetOlderNotifications(
        lastNotificationId,
        category,
      );
      set({gettingOlder: false});

      if (olderNotifications === null) {
        return;
      }

      if (olderNotifications.length === 0) {
        set({
          noMoreNotifications: {
            ...get().noMoreNotifications,
            [category]: true,
          },
        });
        return;
      }

      const updatedTargetNotifications = [
        ...get().notifications[category],
        ...olderNotifications,
      ];

      set({
        notifications: {
          ...get().notifications,
          [category]: updatedTargetNotifications,
        },
      });
    },

    clearNotificationStates: () => {
      set({
        notifications: {
          popups: [],
          notices: [],
        },
        gettingNewer: false,
        gettingOlder: false,
        noMoreNotifications: {
          popups: [],
          notices: [],
        },
      });
    },
  }),
);
