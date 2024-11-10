// SuccessModal.tsx
import React from 'react';
import styled from 'styled-components/native';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {ModalContentContainer} from 'src/Component/Modal';
import {moderateScale} from 'src/Util';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import CheckIcon from 'src/Resource/svg/signup-succeed-welcome-icon.svg';

interface SuccessModalProps {
  mainTitle: string;
  subTitle: string;
  showIcon?: boolean;
  onConfirm?: () => void;
}

export function SuccessModal({
  mainTitle,
  subTitle,
  showIcon = true,
  onConfirm,
}: SuccessModalProps) {
  const navigation = useNavigation<NavigationProp<BottomTabBarProps>>();
  const {setAppModalVisible} = useAppStore(state => ({
    setAppModalVisible: state.setAppModalVisible,
  }));

  const handleConfirm = () => {
    setAppModalVisible(false);
    StackActions.replace('LandingBottomTabNavigator', {
      HomeLandingScreen: {},
      PopupSearchLandingScreen: {},
      PopupLikesLandingScreen: {},
      MyPageLandingScreen: {},
    });
    onConfirm?.();
  };

  return (
    <ModalContentContainer>
      <ModalWrapper>
        <MainTitle>{mainTitle}</MainTitle>
        {showIcon && (
          <SuccessIcon>
            <CheckIcon />
          </SuccessIcon>
        )}
        <SubTitle>{subTitle}</SubTitle>
        <ConfirmButton onPress={handleConfirm}>
          <ConfirmText>확인</ConfirmText>
        </ConfirmButton>
      </ModalWrapper>
    </ModalContentContainer>
  );
}

export const MainTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  color: ${({theme}) => theme.color.grey.black};
  text-align: center;
  margin-bottom: ${moderateScale(12)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${({theme}) => theme.color.grey.main};
  text-align: center;
  line-height: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(24)}px;
`;

const ModalWrapper = styled.View`
  align-items: center;
  padding: ${moderateScale(24)}px;
  background-color: white;
  border-radius: ${moderateScale(12)}px;
`;

const SuccessIcon = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${moderateScale(12)}px;
  background-color: ${({theme}) => theme.color.blue.main};
  border-radius: ${moderateScale(8)}px;
  align-items: center;
`;

const ConfirmText = styled.Text`
  color: white;
  font-size: ${moderateScale(14)}px;
  font-weight: bold;
`;
