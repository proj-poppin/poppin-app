import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {ScreenHeader} from '../../../Component/View';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {MypageReportUserScreen} from '../Request/User/Mypage.report.user.screen';
import {MypageReportOperatorScreen} from '../Request/Operator/Mypage.report.operator.screen';

export interface ReportScreenProps {
  reportType: 'user' | 'operator';
}

export function ReportScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'ReportScreen'>) {
  // reportType에 따라 다른 UI나 로직을 보여줄 수 있습니다
  const isUserReport = route.params.reportType == 'user';
  console.log('reportType: ', route.params.reportType);
  return (
    <Container>
      <ScreenHeader
        LeftComponents={'BACK_BUTTON'}
        title={isUserReport ? '이용자 제보하기' : '운영자 제보하기'}
      />
      {isUserReport ? (
        <MypageReportUserScreen />
      ) : (
        <MypageReportOperatorScreen />
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default ReportScreen;
