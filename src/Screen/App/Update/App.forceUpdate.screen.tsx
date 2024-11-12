import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {FullViewPage} from 'src/Component/Page';
import {UpdateGuide} from 'src/Component/App';
import {H1, H2} from 'src/StyledComponents/Text';
import {moderateScale, openAppStore} from 'src/Util';
import {useDynamicServiceConstant} from 'src/Zustand/App/service.dynamic.constant.zustand';
import {FastImageContainer} from '../../../Component/Image/FastImage.component';

export type ForceUpdateScreenProps = {};

/**
 * 서버에서 받아온 앱 버전보다 현재 앱 버전이 낮고,
 * 강제 업데이트가 필요한 경우 보여주는 화면입니다.
 * @author 도형
 */
export const ForceUpdateScreen = () => {
  const APP_VERSION_INFO =
    useDynamicServiceConstant.getState().APP_VERSION_INFO;

  //* 강제 업데이트 페이지는 뒤로가기 버튼을 무시합니다.
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <FullViewPage
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#a9a8ff',
        paddingTop: moderateScale(72),
        paddingBottom: moderateScale(32),
        paddingHorizontal: moderateScale(16),
      }}
      PageContent={
        <>
          <UpperContainer>
            <LogoImageContainer>
              {/*<FastImageContainer*/}
              {/*  source={require('src/Resource/png/Logo/pickply-full-white-logo.png')}*/}
              {/*/>*/}
            </LogoImageContainer>
            <TitleText>{'팝핀 앱\n업데이트 안내'}</TitleText>
            <ContentText>
              {
                '보다 나은 서비스 이용을 위해\n지금 바로 업데이트 후 픽플러분들과 소통하고,\n다양한 프로젝트를 진행해보세요.'
              }
            </ContentText>

            {APP_VERSION_INFO.updateList &&
              APP_VERSION_INFO.updateList.length > 0 && (
                <UpdateContainer>
                  <UpdateTitleText>업데이트 내역</UpdateTitleText>
                  {APP_VERSION_INFO.updateList.map(update => (
                    <UpdateContentText
                      key={update}>{`  • ${update}`}</UpdateContentText>
                  ))}
                </UpdateContainer>
              )}
          </UpperContainer>

          <BottomContainer>
            <GuideMessageContainer>
              <UpdateGuide />
            </GuideMessageContainer>

            <ButtonContainer onPress={openAppStore}>
              <ButtonText>업데이트 하러 가기</ButtonText>
            </ButtonContainer>
          </BottomContainer>
        </>
      }
    />
  );
};

const UpperContainer = styled.View`
  padding: ${moderateScale(0)}px ${moderateScale(8)}px;
`;

const LogoImageContainer = styled.View`
  width: 40%;
  margin-left: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(32)}px;
`;

const TitleText = styled(H1)`
  font-size: ${moderateScale(36)}px;
  font-weight: 500;
  color: ${({theme}) => theme.color.grey.white};
  margin-bottom: ${moderateScale(32)}px;
`;

const ContentText = styled(H2)`
  color: ${({theme}) => theme.color.grey.white};
  line-height: ${moderateScale(24)}px;
`;

const UpdateContainer = styled.View`
  margin-top: ${moderateScale(36)}px;
`;

const UpdateTitleText = styled(H1)`
  color: ${({theme}) => theme.color.grey.white};
  font-weight: 600;
  margin-bottom: ${moderateScale(4)}px;
`;

const UpdateContentText = styled(H2)`
  color: ${({theme}) => theme.color.grey.white};
  line-height: ${moderateScale(24)}px;
`;

const BottomContainer = styled.View``;

const GuideMessageContainer = styled.View`
  margin-bottom: ${moderateScale(8)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({theme}) => theme.color.grey.white};
  padding: ${moderateScale(16)}px;
  border-radius: 8px;
`;

const ButtonText = styled(H1)`
  font-weight: bold;
  color: ${({theme}) => theme.color.blue.main};
`;
