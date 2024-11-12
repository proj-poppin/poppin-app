// import React from 'react';
// import {StyleSheet} from 'react-native';
// import styled from 'styled-components/native';
// import {H4, BodyText, SmallText} from 'src/StyledComponents/Text';
// import {convertTimeToMMDD} from 'src/Util';
//
// /**
//  * 크레딧 사용내역 리스트 한 줄 아이템입니다
//  @author 도형
//  */
// export const CreditHistoryListItemComponent = ({
//   creditHistory,
// }: {
//   creditHistory: CreditHistorySchema;
// }) => {
//   return (
//     <Container style={styles.containerBorderBottom}>
//       <Date createdAt={creditHistory.createdAt} />
//       <ReasonType reason={creditHistory.reason} type={creditHistory.type} />
//       <ScaleBalance
//         isIncome={creditHistory.isIncome}
//         scale={creditHistory.scale}
//         balance={creditHistory.balance}
//       />
//     </Container>
//   );
// };
//
// const Date = ({createdAt}: {createdAt: string | Date}) => {
//   return (
//     <Date__Container>
//       <Date__Text>{convertTimeToMMDD(createdAt)}</Date__Text>
//     </Date__Container>
//   );
// };
//
// const ReasonType = ({reason, type}: {reason: string; type: string}) => {
//   const getCreditHistoryName = useDynamicUserConstant(
//     state => state.getCreditHistoryName,
//   );
//
//   return (
//     <ReasonType__Container>
//       <Reason__Text numberOfLines={1}>{reason}</Reason__Text>
//       <Type__Text>{getCreditHistoryName(type)}</Type__Text>
//     </ReasonType__Container>
//   );
// };
//
// const ScaleBalance = ({
//   isIncome,
//   scale,
//   balance,
// }: {
//   isIncome: boolean;
//   scale: number;
//   balance: number;
// }) => {
//   return (
//     <ScaleBalance__Container>
//       {isIncome ? (
//         <IncomeScale__Text>{`${scale} C`}</IncomeScale__Text>
//       ) : (
//         <ExpenditureScale__Text>{`${scale} C`}</ExpenditureScale__Text>
//       )}
//       <Balance__Text>{`${balance} C`}</Balance__Text>
//     </ScaleBalance__Container>
//   );
// };
//
// const Container = styled.View`
//   flex-direction: row;
//   padding-top: ${moderateScale(18)}px;
//   padding-bottom: ${moderateScale(21)}px;
//   padding-left: ${moderateScale(6)}px;
//   padding-right: ${moderateScale(6)}px;
// `;
//
// // Date()
// const Date__Container = styled.View`
//   padding-top: ${moderateScale(1.5)}px;
// `;
//
// const styles = StyleSheet.create({
//   containerBorderBottom: {
//     //TODO: #DESIGN-SYSTEM
//     borderBottomColor: '#eeeeee',
//     borderBottomWidth: 1,
//   },
// });
//
// const Date__Text = styled(SmallText)`
//   color: ${({theme}) => theme.color.grey.mild};
// `;
//
// // ReasonType()
// const ReasonType__Container = styled.View`
//   flex: 1;
//   padding: ${moderateScale(0)}px ${moderateScale(15)}px;
// `;
//
// const Reason__Text = styled(BodyText)`
//   color: ${({theme}) => theme.color.grey.deep};
//   margin-bottom: ${moderateScale(6)}px;
// `;
//
// const Type__Text = styled(SmallText)`
//   color: ${({theme}) => theme.color.grey.mild};
// `;
//
// // ScaleBalance()
// const ScaleBalance__Container = styled.View`
//   align-items: flex-end;
//   padding-top: ${moderateScale(1.5)}px;
// `;
//
// const Scale__Text = styled(H4)`
//   margin-bottom: ${moderateScale(3)}px;
//   font-weight: bold;
// `;
//
// const IncomeScale__Text = styled(Scale__Text)`
//   color: ${({theme}) => theme.color.blue.text};
// `;
// const ExpenditureScale__Text = styled(Scale__Text)`
//   color: ${({theme}) => theme.color.red.warning};
// `;
//
// const Balance__Text = styled(BodyText)`
//   color: ${({theme}) => theme.color.grey.mild};
// `;
