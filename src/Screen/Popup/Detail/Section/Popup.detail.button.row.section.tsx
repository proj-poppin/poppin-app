import React, {useState} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import QuestionIcon from 'src/Resource/svg/question.svg';
import {themeColors} from 'src/Theme/theme';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import shallow from 'zustand/shallow';
import CommonCompleteButton from '../../Landing/common.complete.button';
import {FastImageContainer} from '../../../../Component/Image/FastImage.component';
import {RadiusBlueButton} from '../../../../Component/Button/RadiusBlueButton';
import {
  calculateDistanceInMeters,
  requestLocationPermission,
} from '../../../../Util/location.util';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {BlackBackgroundModal} from '../../../../Component/Modal';
import {PreferenceSkipModal} from '../../../../Component/Modal/Auth.preference.skip.modal';

const PopupDetailBottomButtonRowSection: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({modalVisible, setModalVisible}) => {
  const [inProgress, setInProgress] = useState(false);
  const [visitorTooltipOpen, setVisitorTooltipOpen] = useState(false);
  const {popupDetail, visitPopup} = usePopupDetailContext();
  const {isVisitedPopup, isWaitingPopup, waitingPopups, startWaitingPopup} =
    usePopupStore(
      state => ({
        isVisitedPopup: state.isVisitedPopup,
        isWaitingPopup: state.isWaitingPopup,
        waitingPopups: state.waitingPopups,
        startWaitingPopup: state.startWaitingPopup,
      }),
      shallow,
    );

  const waiting = isWaitingPopup(popupDetail.id);
  const requestWaitingPopup = async () => {
    if (waiting) {
      return;
    }
    setInProgress(true);
    await startWaitingPopup(popupDetail.id);
    setInProgress(false);
  };

  const requestVisitPopup = async () => {
    if (isVisitedPopup(popupDetail.id)) {
      return;
    }

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const popupLatitude = popupDetail.latitude;
        const popupLongitude = popupDetail.longitude;

        const distance = calculateDistanceInMeters(
          userLatitude,
          userLongitude,
          popupLatitude,
          popupLongitude,
        );

        // 50m 보다는 조금 넉넉하게 100m로 설정 해야 그나마 정확한 방문 인증이 가능할 것으로 보임
        if (distance > 100) {
          setModalVisible(true);
          return;
        }

        setInProgress(true);
        try {
          await visitPopup();
        } catch (error) {
          Alert.alert('오류', '방문 인증 중 문제가 발생했습니다.');
        } finally {
          setInProgress(false);
        }
      },
      error => {
        Alert.alert('위치 확인 실패', '사용자의 위치를 가져올 수 없습니다.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleVisitorButton = () => setVisitorTooltipOpen(prev => !prev);

  if (popupDetail.operationStatus === 'NOTYET') {
    return (
      <PopupDetailBottomButtonBar>
        <CommonCompleteButton
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 0.8,
            borderColor: themeColors().grey.main,
            width: moderateScale(380),
          }}
          textStyle={{
            fontWeight: '800',
          }}
          title={'오픈예정 팝업이에요'}
          isDisabled={true}
        />
      </PopupDetailBottomButtonBar>
    );
  }

  if (popupDetail.operationStatus === 'OPERATING') {
    const visited = isVisitedPopup(popupDetail.id);

    return (
      <PopupDetailBottomButtonBar>
        <RowSection>
          <VisitorButton onPress={handleVisitorButton}>
            <RowContainer>
              <QuestionIcon
                style={{
                  marginRight: moderateScale(3),
                  transform: [{scale: 0.7}],
                }}
              />
              <LabelText>실시간 방문자 수</LabelText>
              <CountText>{popupDetail.viewCnt}명</CountText>
            </RowContainer>
          </VisitorButton>
          {visitorTooltipOpen && (
            <TooltipContainer>
              <FastImageContainer
                fitOnHeight
                style={{height: moderateScale(37)}}
                source={require('src/Resource/png/real-time-visitors-alert-tooltip.png')}
              />
            </TooltipContainer>
          )}
          <Spacer />
          <RadiusBlueButton
            text={visited ? '방문완료' : '방문하기'}
            onPress={requestVisitPopup}
            disable={visited}
            style={{
              width: moderateScale(175),
              height: moderateScale(50),
              borderRadius: 30,
            }}
            textStyle={{fontSize: moderateScale(18)}}
          />
        </RowSection>
      </PopupDetailBottomButtonBar>
    );
  }

  if (popupDetail.operationStatus === 'TERMINATED') {
    return (
      <PopupDetailBottomButtonBar>
        <RowSection>
          <VisitorButton onPress={() => {}}>
            <RowContainer>
              <LabelText>재오픈 알림 신청</LabelText>
              <CountText>{popupDetail.viewCnt}명</CountText>
            </RowContainer>
          </VisitorButton>
          {
            <TooltipContainer>
              <FastImageContainer
                fitOnHeight
                style={{height: moderateScale(37)}}
                source={require('src/Resource/png/real-time-visitors-alert-tooltip.png')}
              />
            </TooltipContainer>
          }
          <Spacer />
          <RadiusBlueButton
            text={waiting ? '알림 신청 완료' : '재오픈 알림 받기'}
            onPress={requestWaitingPopup}
            disable={waiting}
            style={{
              width: moderateScale(175),
              height: moderateScale(50),
              borderRadius: 30,
            }}
            textStyle={{fontSize: moderateScale(18)}}
          />
        </RowSection>
        <BlackBackgroundModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          allowIgnore={true}>
          <PreferenceSkipModal
            onSkip={navigateHome}
            onComplete={() => setModalVisible(false)}
          />
        </BlackBackgroundModal>
      </PopupDetailBottomButtonBar>
    );
  }

  return null;
};

export default PopupDetailBottomButtonRowSection;

const PopupDetailBottomButtonBar = styled.View`
  flex-direction: row;
  background-color: white;
  height: ${moderateScale(70)}px;
  border-top-left-radius: ${moderateScale(25)}px;
  border-top-right-radius: ${moderateScale(25)}px;
`;

const LabelText = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  color: ${themeColors().grey.main};
  margin-right: ${moderateScale(5)}px;
`;

const RowSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${moderateScale(10)}px;
`;

const VisitorButton = styled.Pressable`
  width: ${moderateScale(175)}px;
  height: ${moderateScale(50)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${moderateScale(30)}px;
  border-width: 1px;
  border-color: ${themeColors().grey.mild};
  background-color: white;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CountText = styled.Text`
  font-size: ${moderateScale(17)}px;
  font-weight: 700;
  color: ${themeColors().blue.main};
`;

const TooltipContainer = styled.View`
  position: absolute;
  top: -${moderateScale(25)}px;
  left: ${moderateScale(10)}px;
  z-index: 10;
`;

const Spacer = styled.View`
  width: ${moderateScale(10)}px;
`;
