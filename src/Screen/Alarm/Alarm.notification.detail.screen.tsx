// import React, {useEffect, useState} from 'react';
// import styled from 'styled-components/native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {SectionContainer} from 'src/Unit/View';
// import {Screen} from 'src/Component/Screen/Screen.component';
// import {ScreenHeader} from 'src/Component/View';
// import {H1, H4} from 'src/StyledComponents/Text';
// import {moderateScale} from 'src/Util';
// import {AppStackProps} from 'src/Navigator/App.stack.navigator';
// import {BlankNotice, NoticeSchema} from '../../Schema/Notice/notice.schema';
// import {axiosGetNoticeById} from '../../Axios/Notice/notice.get.axios';
//
// export type AlarmNotificationDetailScreenProps =
//   | {notice: NoticeSchema}
//   | {noticeId: string};
//
// /**
//  * 마이페이지 (혹은 홈 랜딩 페이지) - 알림 목록 - 알림 상세 화면입니다.
//  * 프로젝트, 투표, 혹은 크레딧 사용내역 페이지로 넘어가지 않는 알림의 경우,
//  * 알림을 선택하면 목록 페이지에서 이쪽으로 넘어오게 됩니다.
//  * @author 도형
//  */
// export const AlarmNotificationDetailScreen = ({
//   route,
// }: NativeStackScreenProps<AppStackProps, 'AlarmNotificationDetailScreen'>) => {
//   const [loading, setLoading] = useState(false);
//   const [notice, setNotice] = useState<NoticeSchema | null>(null);
//   /**
//    * 상세페이지에서 보여줄 공지사항을 설정합니다.
//    * 공지사항 전체 내용을 인자로 받은 경우, 해당 내용을 그대로 사용합니다.
//    * noticeId 를 인자로 받은 경우, 서버에서 공지사항을 조회합니다.
//    * @author 도형
//    */
//   const setNoticeInfo = async () => {
//     if ('notice' in route.params) {
//       // Use the provided `notice` directly
//       setNotice(route.params.notice);
//       return;
//     }
//
//     if ('noticeId' in route.params) {
//       setLoading(true);
//       try {
//         // Fetch the notice details using Axios
//         const responseNotice = await axiosGetNoticeById(route.params.noticeId);
//         if (responseNotice) {
//           setNotice(responseNotice);
//         } else {
//           console.error('Notice not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching notice:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
//
//   useEffect(() => {
//     setNoticeInfo();
//   }, []);
//
//   if (loading) {
//     return (
//       <Screen ScreenContent={<SectionContainer>Loading...</SectionContainer>} />
//     );
//   }
//
//   if (!notice) {
//     return (
//       <Screen
//         ScreenContent={
//           <SectionContainer>
//             <TitleText>Notice Not Found</TitleText>
//             <ContentText>No details are available for this notice.</ContentText>
//           </SectionContainer>
//         }
//       />
//     );
//   }
//
//   return (
//     <Screen
//       ScreenHeader={
//         <ScreenHeader LeftComponents={'BACK_BUTTON'} title="Notice Details" />
//       }
//       ScreenContent={
//         <SectionContainer>
//           <TitleText>{notice.title}</TitleText>
//           <ContentText>{notice.content}</ContentText>
//         </SectionContainer>
//       }
//     />
//   );
// };
//
// const TitleText = styled(H1)`
//   font-weight: bold;
//   margin-top: ${moderateScale(12)}px;
//   margin-bottom: ${moderateScale(24)}px;
// `;
//
// const ContentText = styled(H4)``;
import React from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SectionContainer} from 'src/Unit/View';
import {Screen} from 'src/Component/Screen/Screen.component';
import {ScreenHeader} from 'src/Component/View';
import {H1, H4} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {themeColors} from '../../Theme/theme';
import {axiosGetNoticeById} from '../../Axios/Notice/notice.get.axios';

export type AlarmNotificationDetailScreenProps = {
  notification: {
    title: string;
    content: string;
  };
};

/**
 * 알림 상세 화면
 * 공지사항 데이터를 route.params에서 바로 렌더링합니다.
 * @author 도형
 */
export const AlarmNotificationDetailScreen = ({
  route,
}: NativeStackScreenProps<AppStackProps, 'AlarmNotificationDetailScreen'>) => {
  const {notification} = route.params;

  if (!notification) {
    return (
      <Screen
        ScreenContent={
          <SectionContainer>
            <TitleText>아직 미개발</TitleText>
            <ContentText>서버 개발착수시 그대로 반영</ContentText>
          </SectionContainer>
        }
      />
    );
  }

  return (
    <Screen
      ScreenHeader={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title="알림 내용" />
      }
      ScreenContent={
        <SectionContainer>
          <TitleText>{notification.title ?? '아직 미개발'} </TitleText>
          <Divider />
          <ContentText>
            {notification.content ?? '서버 개발착수시 그대로 반영'}
          </ContentText>
        </SectionContainer>
      }
    />
  );
};

const Divider = styled.View`
  height: ${moderateScale(1)}px;
  background-color: ${themeColors().grey.component};
  margin-bottom: ${moderateScale(12)}px;
`;

const TitleText = styled(H1)`
  font-weight: bold;
  margin-top: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(12)}px;
`;

const ContentText = styled(H4)``;
