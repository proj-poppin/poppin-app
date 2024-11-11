import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import CustomBottomSheet from '../../../../Component/BottomSheet/CustomBottomSheet';
import MypageReportBottomSheetContainer from '../../Report/Mypage.report.bottomsheet.container';

export const MyPageLandingReportSection: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const pressReportButtonHandler = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <ReportButton onPress={pressReportButtonHandler}>
        <ReportButtonText>팝업 제보하기</ReportButtonText>
      </ReportButton>
      <CustomBottomSheet
        isVisible={isVisible}
        onClose={handleClose}
        title="제보하는 사람이 누구인가요?">
        <SheetContent>
          <MypageReportBottomSheetContainer handleClose={handleClose} />
        </SheetContent>
      </CustomBottomSheet>
    </>
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

const SheetContent = styled.View`
  align-items: center;
`;