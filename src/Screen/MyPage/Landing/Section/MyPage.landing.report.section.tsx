import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';

export const MyPageLandingReportSection: React.FC = () => {
  function pressReportButtonHandler() {
    console.log('Press Button');
  }
  return (
    <ReportButton onPress={pressReportButtonHandler}>
      <ReportButtonText>팝업 제보하기</ReportButtonText>
    </ReportButton>
  );
};

const ReportButton = styled.TouchableOpacity`
  background-color: ${theme => theme.theme.color.blue.main};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(14)}px;
  align-items: center;
  margin-bottom: ${moderateScale(16)}px;
`;

const ReportButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;
