// Mypage.report.bottomsheet.container.tsx
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../Util';
import ArrowIcon from '../../../Resource/svg/right-arrow-gray-icon.svg';
import {PopupDetailDividerSection} from '../../Popup/Detail/Section/Popup.detail.divider.section';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
interface MyPageReportBottomSheetContainerProps {
  handleClose: () => void;
  onSelectType?: (type: 'user' | 'operator') => void;
}

const MyPageReportBottomSheetContainer: React.FC<
  MyPageReportBottomSheetContainerProps
> = ({handleClose}) => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const handleSelection = useCallback(
    (type: 'user' | 'operator') => {
      // ReportScreenProps의 route.params 형태에 맞춰 파라미터 전달
      navigation.navigate('ReportScreen', {
        reportType: type,
      });
      handleClose();
    },
    [navigation],
  );

  return (
    <Container>
      <OptionButton onPress={() => handleSelection('user')}>
        <OptionContent>
          <TitleContainer>
            <UserTitle>팝업 이용자</UserTitle>
            <ArrowContainer>
              <ReportText>제보하기</ReportText>
              <ArrowIcon />
            </ArrowContainer>
          </TitleContainer>
          <OptionDescription>
            관심있는 팝업이 POPPIN에 올라와 있지 않다면
          </OptionDescription>
        </OptionContent>
      </OptionButton>
      <PopupDetailDividerSection />
      <OptionButton onPress={() => handleSelection('operator')}>
        <OptionContent>
          <TitleContainer>
            <OptionTitle>팝업 운영자</OptionTitle>
            <ArrowContainer>
              <ReportText>제보하기</ReportText>
              <ArrowIcon />
            </ArrowContainer>
          </TitleContainer>
          <OptionDescription>
            운영하는 팝업이 POPPIN에 올라와있지 않다면
          </OptionDescription>
        </OptionContent>
      </OptionButton>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  width: 100%;
  padding: ${moderateScale(4)}px;
`;

const OptionButton = styled.TouchableOpacity<{isSelected?: boolean}>`
  width: 100%;
  border-radius: ${moderateScale(8)}px;
  background-color: ${props => props.theme.color.grey.white};
  margin-bottom: ${moderateScale(12)}px;
  border: 1px solid ${props => props.theme.color.grey.white};
`;

const OptionContent = styled.View`
  padding: ${moderateScale(16)}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${moderateScale(4)}px;
`;
const ArrowContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const ReportText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${theme => theme.theme.color.grey.main};
  margin-right: ${moderateScale(5)}px;
`;
const UserTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: 600;
  color: ${props => props.theme.color.blue.main};
`;

const OptionTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: 600;
  color: ${props => props.theme.color.purple.main};
`;

const OptionDescription = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
`;

export default MyPageReportBottomSheetContainer;
