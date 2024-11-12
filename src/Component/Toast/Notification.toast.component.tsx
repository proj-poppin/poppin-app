// import React from 'react';
// import styled from 'styled-components/native';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { AppStackProps } from 'src/Navigator';
// import { H3, H4, BodyText } from 'src/StyledComponents/Text';
// import { NotificationType } from 'src/Object/Enum';
// import { themeColors } from 'src/Theme';
// import { navigateInAppScreen, Destination } from 'src/Util';
// import { AlarmIcon, CommunityIcon } from 'src/Component/Svg';
// import PushAlarmCreditIcon from 'src/Resource/svg/pushalram-credit-icon.svg';
// import { moderateScale } from 'src/Util';
//
// /**
//  * 인앱 상태에서 푸시 알림이 왔을 때 화면 상단에 보여지는 토스트 메세지 디자인입니다.
//  * 푸시 알림의 종류에 따라, 현재 화면의 위치에 따라 해당 알림을 눌렀을 때 이동할 화면이 다릅니다.
//  * @author 도형
//  */
// export const NotificationToast = ({
//   text1,
//   text2,
//   props,
// }: {
//   text1?: string;
//   text2?: string;
//   props?: {
//     detail?: string;
//     type?: string;
//     destination?: Destination;
//   };
// }) => {
//   const navigation = useNavigation<NavigationProp<AppStackProps>>();
//   const routes = navigation.getState().routes;
//   //* 현재 화면의 이름을 파악합니다.
//   const routeName = routes[routes.length - 1].name;
//
//   /**
//    * 푸시 알림을 눌렀을 때의 행동 지정
//    * @author 도형
//    */
//   const onPress = () => {
//     navigateInAppScreen({ navigation, destination: props?.destination });
//     return;
//   };
//
//   return (
//     <Notification__Container activeOpacity={1} onPress={onPress}>
//       <Notification__IconContainer>
//         <NotificationIcon type={props?.type} />
//       </Notification__IconContainer>
//
//       <Notification__TextContainer>
//         <Notification__TitleText>{text1}</Notification__TitleText>
//         <Notification__ContentText>{text2}</Notification__ContentText>
//         {props?.detail && (
//           <Notification__DetailText>{`[${props.detail}]`}</Notification__DetailText>
//         )}
//       </Notification__TextContainer>
//     </Notification__Container>
//   );
// };
//
// const NotificationIcon = ({ type }: { type?: string }) => {
//   const size = 32;
//
//   switch (type) {
//     case NotificationType.NEW_COMMENT_TO_RESEARCH:
//     case NotificationType.NEW_REPLY_TO_RESEARCH:
//       return <CommunityIcon size={size} fill={themeColors().blue.main} />;
//     case NotificationType.NEW_COMMENT_TO_VOTE:
//     case NotificationType.NEW_REPLY_TO_VOTE:
//       return <CommunityIcon size={size} fill={themeColors().purple.main} />;
//     case NotificationType.WIN_EXTRA_CREDIT:
//       return <PushAlarmCreditIcon width={size} height={size} />;
//   }
//   return <AlarmIcon size={32} fill={themeColors().blue.main} color="none" />;
// };
//
// const Notification__Container = styled.TouchableOpacity`
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   width: 100%;
//   padding: ${moderateScale(12)}px;
//   background-color: rgba(245, 245, 245, 0.8);
//   border-bottom-left-radius: 16px;
//   border-bottom-right-radius: 16px;
// `;
//
// const Notification__IconContainer = styled.View`
//   justify-content: center;
//   align-items: center;
//   width: ${moderateScale(36)}px;
//   height: ${moderateScale(36)}px;
//   margin-right: ${moderateScale(12)}px;
// `;
//
// const Notification__TextContainer = styled.View`
//   flex: 1;
// `;
//
// const Notification__TitleText = styled(H3)`
//   color: ${({ theme }) => theme.color.grey.deep};
//   font-weight: bold;
//   margin-bottom: ${moderateScale(2)}px;
// `;
//
// const Notification__ContentText = styled(H4)`
//   color: ${({ theme }) => theme.color.grey.main};
// `;
//
// const Notification__DetailText = styled(BodyText)`
//   color: ${({ theme }) => theme.color.grey.mild};
// `;
