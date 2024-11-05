import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {useMypageLandingScreenStore} from './Mypage.landing.zustand';
import AlertSvg from 'src/Resource/svg/modal-alert-icon.svg';
import {themeColors} from '../../../Theme/theme';
import {moderateScale} from '../../../Util';

/**
 * BlackBackgroundModal을 상속해서 모든 모달을 구현해야하나, 우선 급한대로 Modal
 * @see BlackBackgroundModal
 * @author 도형
 */

export function MypageLandingLogoutModal() {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'LandingBottomTabNavigator'>>();

  const {logout, logoutModalVisible, setLogoutModalVisible} =
    useMypageLandingScreenStore(state => ({
      logout: state.logout,
      logoutModalVisible: state.logoutModalVisible,
      setLogoutModalVisible: state.setLogoutModalVisible,
    }));

  /** Log out and navigate to the main page */
  async function logoutAndExitToHome() {
    await logout();
    navigation.reset({
      routes: [{name: 'LandingBottomTabNavigator', params: {}}],
    });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={logoutModalVisible}
      onRequestClose={() => setLogoutModalVisible(false)}>
      <Overlay>
        <ModalContainer>
          <AlertSvg />
          <MainText>로그아웃 하시겠습니까?</MainText>
          <ButtonContainer>
            <Pressable onPress={() => setLogoutModalVisible(false)}>
              <TextButton color="blue">아니오</TextButton>
            </Pressable>
            <Separator>|</Separator>
            <Pressable onPress={logoutAndExitToHome}>
              <TextButton color="grey">예</TextButton>
            </Pressable>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: ${moderateScale(320)}px;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
`;

const MainText = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(10)}px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* Center items vertically */
  padding-top: ${moderateScale(10)}px;
`;

const TextButton = styled.Text<{color: 'blue' | 'grey'}>`
  font-size: ${moderateScale(14)}px;
  font-weight: 600;
  color: ${({color}) =>
    color === 'blue' ? themeColors().blue.main : themeColors().grey.main};
  padding: 10px 20px;
  flex: 1; /* Allows even distribution of space */
  text-align: center; /* Centers text within the button area */
`;

const Separator = styled.Text`
  color: #e6e9ed;
  font-size: 24px;
  padding: 0 5px;
  font-weight: 300;
  text-align: center; /* Center the separator */
`;
