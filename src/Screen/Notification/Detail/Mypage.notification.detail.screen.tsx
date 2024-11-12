import React from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SectionContainer} from 'src/Unit/View';
import {Screen} from 'src/Component/Screen/Screen.component';
import {ScreenHeader} from 'src/Component/View';
import {H1, H4} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';
import {NotificationSchema} from 'src/Schema/User/notification.schema';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';

export type AlarmNotificationDetailScreenProps = {
  notification: NotificationSchema;
};

/**
 * 마이페이지 (혹은 홈 랜딩 페이지) - 알림 목록 - 알림 상세 화면입니다.
 * 프로젝트, 투표, 혹은 크레딧 사용내역 페이지로 넘어가지 않는 알림의 경우,
 * 알림을 선택하면 목록 페이지에서 이쪽으로 넘어오게 됩니다.
 * @author 도형
 */
export const AlarmNotificationDetailScreen = ({
  route,
}: NativeStackScreenProps<AppStackProps, 'AlarmNotificationDetailScreen'>) => {
  const {notification} = route.params;

  return (
    <Screen
      ScreenHeader={<ScreenHeader LeftComponents={'BACK_BUTTON'} title="" />}
      ScreenContent={
        <SectionContainer>
          <TitleText>{notification.title}</TitleText>
          <ContentText>{notification.content}</ContentText>
        </SectionContainer>
      }
    />
  );
};

const TitleText = styled(H1)`
  font-weight: bold;
  margin-top: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(24)}px;
`;

const ContentText = styled(H4)``;
