import React, {useState, useRef, useEffect} from 'react';
import {BackHandler, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {useDynamicServiceConstant} from '../../../Zustand/App/service.dynamic.constant.zustand';
import {moderateScale, showBlackToast} from '../../../Util';
import {FullViewPage} from '../../../Component/Page';
import {FastImageContainer} from '../../../Component/Image/FastImage.component';
import {H1, H2} from '../../../StyledComponents/Text';

export type ServiceStatusScreenProps = {};

/**
 * 서비스가 이용 불가 상태일 때 보여주는 화면입니다.
 * @author 도형
 */
export const ServiceStatusScreen = ({
  navigation,
}: NativeStackScreenProps<AppStackProps, 'ServiceStatusScreen'>) => {
  const [jailBroken, setJailBroken] = useState(false);
  const imageTouch = useRef<number>(0);
  const SERVICE_STATUS = useDynamicServiceConstant.getState().SERVICE_STATUS;

  function onPressImage() {
    imageTouch.current++;
  }

  function onLongPressHeader() {
    if (imageTouch.current >= 8) {
      setJailBroken(true);
      showBlackToast({text1: '앱 점검이 준비되었습니다'});
    }
  }

  function exitApp() {
    BackHandler.exitApp();
  }

  function jailBreak() {
    navigation.replace('LandingBottomTabNavigator', {
      HomeLandingScreen: {},
      PopupSearchLandingScreen: {},
      PopupLikesLandingScreen: {},
      MyPageLandingScreen: {},
    });
  }

  //* 뒤로 가기 버튼을 무시합니다.
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
        paddingBottom: moderateScale(32),
        paddingHorizontal: moderateScale(16),
      }}
      PageContent={
        <>
          <UpperContainer>
            <TouchableOpacity
              activeOpacity={1}
              style={{height: moderateScale(72)}}
              onLongPress={onLongPressHeader}
            />
            <LogoImageContainer onTouchStart={onPressImage}>
              {/*<FastImageContainer*/}
              {/*  source={require('src/Resource/png/Logo/pickply-full-white-logo.png')}*/}
              {/*/>*/}
            </LogoImageContainer>
            <TitleText>{SERVICE_STATUS.title}</TitleText>
            <ContentText>{SERVICE_STATUS.content}</ContentText>
          </UpperContainer>

          <BottomContainer>
            <ButtonContainer onPress={jailBroken ? jailBreak : exitApp}>
              <ButtonText>확인</ButtonText>
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

const BottomContainer = styled.View``;

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
