// import React, {useState, useEffect, useRef} from 'react';
// import {Animated} from 'react-native';
// import {NavigationProp} from '@react-navigation/native';
// import {AppStackProps} from 'src/Navigator';
// import { shallow } from 'zustand/shallow';
// import {useNotificationStore} from 'src/Zustand/User';
// import styled from 'styled-components/native';
// import {makeFirebaseLogEvent, navigateInAppScreen} from 'src/Util';
// import {NotificationSchema} from 'src/Schema';
// import {H4} from 'src/StyledComponents/Text';
// import {HOME_LOGS} from 'src/Constant';
//
// /**
//  * 주어진 인자를 하나씩 롤링하며 보여주는 컴포넌트입니다.
//  *
//  * @TODO 현재는 Notification 만 지원하지만, 다른 데이터 타입도 generic 하게 지원할 수 있도록 수정해야 합니다.
//  * @author 도형
//  */
// export const Roller = ({
//   navigation,
//   datas,
//   height,
//   duration,
//   interval,
//   setShowingData,
// }: {
//   navigation: NavigationProp<AppStackProps>;
//   datas: NotificationSchema[];
//   height?: number;
//   duration?: number;
//   interval?: number;
//   setShowingData?: (data: any) => void;
// }) => {
//   if (datas.length < 1) return null;
//
//   const indexRef = useRef(0);
//   const [curData, setCurData] = useState(datas[0]);
//   const [nextData, setNextData] = useState(datas[0]);
//
//   const componentHeight = height ?? 50;
//   const animationDuration = duration ?? 500;
//   const rollingInterval = interval ?? 3000;
//
//   const animatedValue = useRef(new Animated.Value(0)).current;
//
//   const {checkNotification} = useNotificationStore(
//     state => ({checkNotification: state.checkNotification}),
//     shallow,
//   );
//
//   const onPressNotification = (notification: NotificationSchema) => {
//     checkNotification({
//       category: notification.category,
//       notificationId: notification._id,
//     });
//     if (
//       notification.destination !== undefined ||
//       notification.destination !== null
//     ) {
//       makeFirebaseLogEvent(
//         HOME_LOGS.landing.notification.goto_notification_detail,
//       );
//       navigateInAppScreen({
//         navigation,
//         destination: notification.destination,
//       });
//     } else {
//       makeFirebaseLogEvent(
//         HOME_LOGS.landing.notification.goto_noti_list_at_home_alarm_message,
//       );
//       navigation.navigate('MypageNotificationScreen', {});
//     }
//     setShowingData?.(undefined);
//   };
//
//   const startRolling = () => {
//     indexRef.current = (indexRef.current + 1) % datas.length;
//     setNextData(datas[indexRef.current]);
//
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: animationDuration,
//       useNativeDriver: true,
//     }).start(),
//       setTimeout(() => {
//         setShowingData?.(datas[indexRef.current]);
//       }, animationDuration / 2);
//     setTimeout(() => {
//       setCurData(datas[indexRef.current]);
//       Animated.timing(animatedValue, {
//         toValue: 0,
//         duration: 0,
//         useNativeDriver: true,
//       }).start();
//     }, animationDuration + 500);
//   };
//
//   useEffect(() => {
//     let rollingTimeout: NodeJS.Timeout;
//     if (datas.length >= 2) {
//       //* 주어진 시간마다 아래 순서에 맞게 동작을 수행합니다.
//       //* 1. index 를 다음에 보여줄 값으로 조정합니다.
//       //* 2. 다음에 보여줄 데이터를 설정합니다.
//       //* 3. 롤링 애니메이션을 시작하여 다음 데이터를 보여줍니다.
//       //* 4. 0.5초 후, 위로 숨겨진 컴포넌트 값을 현재 보이는 값과 동일하게 설정합니다.
//       //* 5. animationValue 를 0 으로 설정하여 다시 초기 위치로 되돌립니다.
//       //*   - 과정 4. 에서 발생할 랜더링을 기다리기 위해 다시 0.5초만큼 대기합니다.
//       //*   - duration 을 0으로 설정해 애니메이션을 적용하지 않습니다.
//       rollingTimeout = setInterval(startRolling, rollingInterval);
//     }
//
//     return () => clearInterval(rollingTimeout);
//   }, [datas]);
//
//   const translateY = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -componentHeight],
//   });
//
//   return (
//     <Container style={{height: componentHeight}}>
//       <RollingContainer
//         style={{
//           transform: [{translateY: translateY}],
//           height: componentHeight * 2,
//         }}>
//         <ComponentContainer style={{height: componentHeight}}>
//           <TitleContainer
//             activeOpacity={1}
//             onPress={() => onPressNotification(curData)}>
//             <TitleText numberOfLines={1}>{curData.title}</TitleText>
//           </TitleContainer>
//         </ComponentContainer>
//         <ComponentContainer style={{height: componentHeight}}>
//           <TitleContainer
//             activeOpacity={1}
//             onPress={() => onPressNotification(nextData)}>
//             <TitleText numberOfLines={1}>{nextData.title}</TitleText>
//           </TitleContainer>
//         </ComponentContainer>
//       </RollingContainer>
//     </Container>
//   );
// };
//
// const Container = styled.View`
//   overflow: hidden;
// `;
//
// const RollingContainer = styled(Animated.View)``;
//
// const ComponentContainer = styled.View`
//   overflow: hidden;
//   justify-content: center;
// `;
//
// const TitleContainer = styled.TouchableOpacity`
//   justify-content: center;
// `;
//
// const TitleText = styled(H4)`
//   font-weight: 600;
// `;
