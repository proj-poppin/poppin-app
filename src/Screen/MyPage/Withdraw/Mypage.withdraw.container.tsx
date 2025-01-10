import React from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {ScreenHeader} from 'src/Component/View';
import {moderateScale} from 'src/Util';
import EmptyCheckCircle from 'src/Resource/svg/empty-purple-circle-check.svg';
import PurpleCheckCircle from 'src/Resource/svg/purple-circle-check.svg';
import {useWithdrawContext} from './Mypage.withdraw.context';
import CommonCompleteButton from 'src/Screen/Popup/Landing/common.complete.button';
import {themeColors} from 'src/Theme/theme';
import {MypageWithdrawModal} from './Mypage.withdraw.modal';

const WITHDRAW_REASONS = [
  '앱 사용이 불편해요',
  '팝업 스토어 찾기가 어려워요',
  '정보가 정확하지 않아요',
  '쓰지 않는 앱이에요',
  '새 계정을 만들고 싶어요',
  '기타',
];

const MypageWithdrawContainer: React.FC = () => {
  const {
    onDoubleCheckSubmit,
    onCloseSubmit,
    isModalVisible,
    onSubmitWithdraw,
    reasons,
    toggleReason,
    isValid,
  } = useWithdrawContext();
  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'회원 탈퇴'} />
      }
      PageContent={
        <Container>
          <MypageWithdrawModal
            title="정말 탈퇴하시겠습니까?"
            isVisible={isModalVisible}
            message={'탈퇴하신 아이디로는\n 30일간 재가입 하실 수 없어요.'}
            onClose={onCloseSubmit}
            onSubmit={onDoubleCheckSubmit}
          />
          <MainContentContainer>
            <TitleText>탈퇴하는 이유를 알려주세요</TitleText>
            <SubtitleText>
              제품을 더 나은 서비스로 만들기 위해, 소중한 의견을 남겨주세요.
            </SubtitleText>
            {WITHDRAW_REASONS.map((item, index) => (
              <ReasonButton
                key={index}
                onPress={() => toggleReason(item)}
                isSelected={reasons.includes(item)}>
                {reasons.includes(item) == true ? (
                  <PurpleCheckCircle
                    width={moderateScale(20)}
                    height={moderateScale(20)}
                    // fill={props => props.theme.color.purple.main}
                  />
                ) : (
                  <EmptyCheckCircle
                    width={moderateScale(20)}
                    height={moderateScale(20)}
                    // fill={props => props.theme.color.purple.main}
                  />
                )}

                <ReasonText isSelected={reasons.includes(item)}>
                  {item}
                </ReasonText>
              </ReasonButton>
            ))}
          </MainContentContainer>
        </Container>
      }
      BottomPart={
        <ButtonContainer>
          <CommonCompleteButton
            title={'탈퇴하기'}
            isDisabled={!isValid}
            style={[
              {
                backgroundColor: isValid
                  ? themeColors().purple.main
                  : themeColors().grey.mild,
                borderRadius: moderateScale(20),
              },
            ]}
            onPress={onSubmitWithdraw}
          />
        </ButtonContainer>
      }
    />
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${moderateScale(12)}px;
  background-color: white;
`;

const MainContentContainer = styled.View`
  flex: 1;
  padding: ${moderateScale(4)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(8)}px;
`;

const SubtitleText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.main};
  margin-bottom: ${moderateScale(24)}px;
`;

const ReasonButton = styled.TouchableOpacity<{isSelected: boolean}>`
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(8)}px;
  border: 1px solid ${props => props.theme.color.grey.mild};
  margin-bottom: ${moderateScale(8)}px;
`;

const ReasonText = styled.Text<{isSelected: boolean}>`
  font-size: ${moderateScale(14)}px;
  margin-left: ${moderateScale(24)}px;
  color: ${props =>
    props.isSelected
      ? props.theme.color.purple.main
      : props.theme.color.grey.black};
`;

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: ${moderateScale(40)}px;
`;

export default MypageWithdrawContainer;
