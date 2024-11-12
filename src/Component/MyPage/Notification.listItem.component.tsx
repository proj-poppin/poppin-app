import React, {memo} from 'react';
import {NavigationProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import {H3, BodyText} from 'src/StyledComponents/Text';
// import { AlarmIcon, ResearchIcon, CommunityIcon } from 'src/Component/Svg';
import PushAlarmCreditIcon from 'src/Resource/svg/pushalram-credit-icon.svg';
import CloseIcon from 'src/Resource/svg/close-icon.svg';
import {navigateInAppScreen, getRelativeTimePassed} from 'src/Util';
import {moderateScale} from 'src/Util';
import {NotificationType} from '../../Object/Enum/alarm.enum';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {NotificationSchema} from '../../Schema/User/notification.schema';
import {useNotificationStore} from '../../Zustand/User/notification.zustand';
import {themeColors} from '../../Theme/theme';
import AlarmIcon from 'src/Resource/svg/alarm-icon.svg';

/** 알림 한 줄의 좌측 아이콘 */
const NotificationIcon = ({
  type,
  category,
}: {
  type: string;
  category: string;
}) => {
  const size = moderateScale(28);

  // switch (type) {
  //   case NotificationType.HELPFUL_REVIEW_TO_POPUP:
  //   case NotificationType.INTEREST_POPUP_DEADLINE:
  //     return <CommunityIcon size={size} fill={themeColors().blue.main} />;
  //   case NotificationType.NEW_COMMENT_TO_VOTE:
  //   case NotificationType.NEW_REPLY_TO_VOTE:
  //     return <CommunityIcon size={size} fill={themeColors().purple.main} />;
  //   case NotificationType.WIN_EXTRA_CREDIT:
  //     return (
  //       <PushAlarmCreditIcon width={size.toString()} height={size.toString()} />
  //     );
  // }

  return <AlarmIcon fill={themeColors().blue.main} color="none" />;

  // switch (category) {
  //   case 'P':
  //     return <ResearchIcon size={size} fill={themeColors().blue.main} />;
  //   case 'VOTE':
  //     return <CommunityIcon size={size} fill={themeColors().purple.main} />;
  // }
  // return <AlarmIcon size={size} fill={themeColors().blue.main} color="none" />;
};

/**
 * 알림 목록에서 사용되는 알림 컴포넌트입니다.
 * @author 도형
 */
export const NotificationListItem = memo(
  ({
    navigation,
    notification,
  }: {
    navigation: NavigationProp<AppStackProps>;
    notification: NotificationSchema;
  }) => {
    const {checkNotification, deleteNotification} = useNotificationStore(
      state => ({
        checkNotification: state.checkNotification,
        deleteNotification: state.deleteNotification,
      }),
      shallow,
    );

    //* 알림을 누르는 경우:
    //* (체크되지 않은 알림인 경우) 해당 알림을 확인 표시하고 lastCheck 값을 업데이트합니다.
    //* 프로젝트/투표 상세 페이지 혹은 마이페이지의 크레딧 변경내역 리스트로 이동
    //* 이외의 경우, 알림 상세 페이지로 이동
    const onPress = () => {
      if (!notification.checked) {
        checkNotification({
          category: notification.category,
          notificationId: notification.id,
        });
      }
      navigateInAppScreen({
        navigation,
        destination: notification.destination
          ? notification.destination
          : notification,
        //* 만약 특정 화면으로 이동하게 만드는 알림이 아니라면 알림 상세 페이지로 이동합니다.
        onFailure: {
          screen: 'AlarmNotificationDetailScreen',
          params: {notification},
        },
      });
    };

    //* 알림 삭제 아이콘을 누르는 경우
    const onPressCloseIcon = () => {
      deleteNotification({
        category: notification.category,
        notificationId: notification.id,
      });
    };

    return (
      <ItemContainer
        activeOpacity={1}
        // style={{ borderWidth: 0, borderBottomWidth: 0.6 }}
        checked={notification.checked}
        onPress={onPress}>
        {/* 좌측: 알림 아이콘 */}
        <ItemLeftContainer>
          <NotificationIcon
            type={notification.type}
            category={notification.category}
          />
        </ItemLeftContainer>

        {/* 중앙: 제목/생성일/내용 */}
        <ItemCenterContainer>
          <ItemTitleDateContainer>
            <ItemTitleContainer>
              <ItemTitleText numberOfLines={1}>
                {notification.title}
              </ItemTitleText>
            </ItemTitleContainer>
            <ItemDateText>{`|  ${getRelativeTimePassed(
              notification.createdAt,
            )}`}</ItemDateText>
          </ItemTitleDateContainer>
          <ItemContentText numberOfLines={1}>
            {notification.content}
          </ItemContentText>
          {notification.detail && (
            <ItemDetailText>{`[${notification.detail}]`}</ItemDetailText>
          )}
        </ItemCenterContainer>

        {/* 우측: 알림 삭제 아이콘 */}
        <ItemRightContainer>
          <ItemDeleteIcon activeOpacity={1} onPress={onPressCloseIcon}>
            <CloseIcon />
          </ItemDeleteIcon>
        </ItemRightContainer>
      </ItemContainer>
    );
  },
  (prev, next) => {
    return (
      prev.notification.checked === next.notification.checked &&
      prev.notification.title === next.notification.title &&
      prev.notification.content === next.notification.content &&
      prev.notification.detail === next.notification.detail
    );
  },
);

//* RenderItem()
const ItemContainer = styled.TouchableOpacity<{checked: boolean}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({checked}) =>
    checked ? '#F3F3F3' : themeColors().grey.white};
  padding: ${moderateScale(12)}px ${moderateScale(6)}px;
`;

const ItemLeftContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(8)}px;
  margin-right: ${moderateScale(8)}px;
`;

const ItemCenterContainer = styled.View`
  flex: 1;
`;
const ItemTitleDateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(7)}px;
`;

//* ItemTitleText 만 쓰면 TitleText 가 길어졌을 때 ItemTitleDateContainer 를 넘어가기 때문에 flex:1 속성을 가진 View 안에 가두고 사용합니다.
const ItemTitleContainer = styled.View`
  flex: 1;
  margin-right: ${moderateScale(6)}px;
`;
const ItemTitleText = styled(H3)`
  color: ${({theme}) => theme.color.grey.deep};
  font-weight: bold;
`;
const ItemDateText = styled(BodyText)`
  color: ${({theme}) => theme.color.grey.mild};
`;
const ItemContentText = styled(BodyText)`
  color: ${({theme}) => theme.color.grey.main};
  margin-bottom: ${moderateScale(4)}px;
`;
const ItemDetailText = styled(BodyText)`
  color: ${({theme}) => theme.color.grey.mild};
`;

const ItemRightContainer = styled.View``;

const ItemDeleteIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: ${moderateScale(8)}px;
  padding: ${moderateScale(8)}px;
`;
