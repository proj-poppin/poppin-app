// import React from 'react';
// import { StyleSheet } from 'react-native';
// import styled from 'styled-components/native';
// import { H4, BodyText, SmallText } from 'src/StyledComponents/Text';
// import { convertTimeToMMDD } from 'src/Util';
// import { PartnerCreditHistorySchema } from 'src/Schema';
// import { moderateScale } from 'src/Util';
//
// /**
//  * 크레딧 사용내역 리스트 한 줄 아이템입니다
//  * @author 승원
//  */
// export const PartnerCreditHistoryListItemComponent = ({
//   partnerCreditHistory,
// }: {
//   partnerCreditHistory: PartnerCreditHistorySchema;
// }) => {
//   return (
//     <Container style={styles.containerBorderBottom}>
//       <Date createdAt={partnerCreditHistory.createdAt} />
//       <ReasonEmail userEmail={partnerCreditHistory.userEmail} reason={partnerCreditHistory.reason} />
//       <ScaleBalance
//         isIncome={partnerCreditHistory.isIncome}
//         scale={partnerCreditHistory.scale}
//         balance={partnerCreditHistory.balance}
//       />
//     </Container>
//   );
// };
//
// const Date = ({ createdAt }: { createdAt: string | Date }) => {
//   return (
//     <Date__Container>
//       <Date__Text>{convertTimeToMMDD(createdAt)}</Date__Text>
//     </Date__Container>
//   );
// };
//
// const ReasonEmail = ({ userEmail, reason }: { userEmail: string; reason: string; }) => {
//
//   return (
//     <ReasonType__Container>
//       <Reason__Text numberOfLines={1}>{reason}</Reason__Text>
//       <Email__Text>{userEmail}</Email__Text>
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
//   color: ${({ theme }) => theme.color.grey.mild};
// `;
//
// // ReasonType()
// const ReasonType__Container = styled.View`
//   flex: 1;
//   padding: ${moderateScale(0)}px ${moderateScale(15)}px;
// `;
//
// const Reason__Text = styled(BodyText)`
//   color: ${({ theme }) => theme.color.grey.deep};
//   margin-bottom: ${moderateScale(6)}px;
// `;
//
// const Email__Text = styled(SmallText)`
//   color: ${({ theme }) => theme.color.grey.mild};
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
//   color: ${({ theme }) => theme.color.blue.text};
// `;
// const ExpenditureScale__Text = styled(Scale__Text)`
//   color: ${({ theme }) => theme.color.red.warning};
// `;
//
// const Balance__Text = styled(BodyText)`
//   color: ${({ theme }) => theme.color.grey.mild};
// `;
