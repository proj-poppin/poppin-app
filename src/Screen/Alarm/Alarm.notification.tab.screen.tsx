import {
  NotificationCategory,
  useNotificationStore,
} from '../../Zustand/User/notification.zustand';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import shallow from 'zustand/shallow';
import {ActivityIndicator, FlatList} from 'react-native';
import {moderateScale} from '../../Util';
import React from 'react';
import {NotificationSchema} from '../../Schema/User/notification.schema';
import {NotificationListItem} from '../../Component/MyPage';
import {BodyText} from '../../StyledComponents/Text';
import styled from 'styled-components/native';
import {themeColors} from '../../Theme/theme';
import {FastImageContainer} from '../../Component/Image/FastImage.component';
import CommonCompleteButton from '../Popup/Landing/common.complete.button';

export const AlarmNotificationTabScreenProps = {};

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
    refreshNotifications,
    getOlderNotifications,
  } = useNotificationStore(
    state => ({
      notifications: state.notifications,
      gettingNewer: state.gettingNewer,
      gettingOlder: state.gettingOlder,
      refreshNotifications: state.refreshNotifications,
      getOlderNotifications: state.getOlderNotifications,
    }),
    shallow,
  );

  const onRefresh = () => {
    refreshNotifications();
  };

  const onEndReached = () => {
    if (notifications[category].length > 0) {
      getOlderNotifications(category);
    }
  };

  const ListFooterComponent = () => {
    if (!gettingOlder) {
      return null;
    }
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
      onEndReachedThreshold={1}
      onEndReached={onEndReached}
    />
  );
};
//* 알림이 없을 때 보여주는 화면
const ListEmptyComponent = () => {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'AlarmNotificationScreen'>>();
  const navigateToPopupLandingScreen = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'PopupLandingScreen',
      }),
    );
  };
  return (
    <EmptyContainer>
      <BlackEmptyText>아직 알림이 없어요!</BlackEmptyText>
      <FastImageContainer
        source={require('src/Resource/png/no-alarm-with-shadow-logo.png')}
        style={{
          width: moderateScale(150),
          height: moderateScale(150),
          marginHorizontal: moderateScale(5),
          marginBottom: moderateScale(50),
        }}
      />
      <EmptyText>
        마음에 드는 팝업을 저장하면 {'\n'}알림을 받아볼 수 있어요!
      </EmptyText>
      <EmptyText />
      <CommonCompleteButton
        title={'팝업 둘러보러 가기'}
        onPress={navigateToPopupLandingScreen}
      />
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

const BlackEmptyText = styled(BodyText)`
  color: ${({theme}) => theme.color.grey.black};
  font-size: ${moderateScale(18)}px;
  font-weight: 600;
  margin-bottom: ${moderateScale(60)}px;
`;

const EmptyText = styled(BodyText)`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(18)}px;
  text-align: center;
  font-weight: 600;
  margin-bottom: ${moderateScale(60)}px;
`;
