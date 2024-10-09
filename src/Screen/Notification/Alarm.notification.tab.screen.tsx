import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BodyText} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {
  NotificationCategory,
  useNotificationStore,
} from 'src/Zustand/User/notification.zustand';
import NoAlarmIcon from 'src/Resource/svg/likes-no-result-image.svg';
import {themeColors} from 'src/Theme/theme';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import {NotificationSchema} from '../../Schema/User/notification.schema';
import {NotificationListItem} from 'src/Component/MyPage';

export type MyPageNotificationTabScreenProps = {};

/**
 * 마이페이지 - 탭별 알림 목록 화면입니다.
 * @author 도형
 */
export const AlarmNotificationTabScreen = ({
  category,
}: {
  category: NotificationCategory;
}) => {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'AlarmNotificationScreen'>>();

  const {
    notifications,
    gettingNewer,
    gettingOlder,
    getNewerNotifications,
    getOlderNotifications,
  } = useNotificationStore(
    state => ({
      notifications: state.notifications,
      gettingNewer: state.gettingNewer,
      gettingOlder: state.gettingOlder,
      getNewerNotifications: state.getNewNotifications,
      getOlderNotifications: state.getOlderNotifications,
    }),
    shallow,
  );

  const onRefresh = () => {
    getNewerNotifications();
  };

  const onEndReached = () => {
    getOlderNotifications(category);
  };

  const ListFooterComponent = () => {
    if (!gettingOlder) return null;

    return (
      <ActivityIndicator
        color="#8BBFF5"
        style={{marginVertical: moderateScale(8)}}
      />
    );
  };

  const NewRenderItem = ({item}: {item: NotificationSchema}) => {
    return <NotificationListItem navigation={navigation} notification={item} />;
  };

  return (
    <FlatList
      data={notifications[category]}
      renderItem={NewRenderItem}
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#ffffff'}}
      ListEmptyComponent={ListEmptyComponent}
      refreshing={gettingNewer}
      onRefresh={onRefresh}
      ListFooterComponent={ListFooterComponent}
      onEndReachedThreshold={0.8}
      onEndReached={onEndReached}
    />
  );
};

//* 알림이 없을 때 보여주는 화면
const ListEmptyComponent = () => {
  return (
    <EmptyContainer>
      <NoAlarmIcon
        color={themeColors().blue.main}
        style={{marginBottom: moderateScale(6)}}
      />
      <EmptyText>받은 알림이 없습니다</EmptyText>
    </EmptyContainer>
  );
};

// ListEmptyComponent()
const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const EmptyText = styled(BodyText)`
  color: ${({theme}) => theme.color.blue.main};
  margin-bottom: ${moderateScale(60)}px;
`;
