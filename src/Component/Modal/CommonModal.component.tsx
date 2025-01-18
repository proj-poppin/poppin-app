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
import {SvgProps} from 'react-native-svg';

interface CommonModalProps {
  mainTitle: string;
  subTitle: string;
  showIcon?: boolean;
  Icon?: React.FC<SvgProps>;
  iconSize?: number;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  navigateOnConfirm?: boolean;
}

export function CommonModal({
  mainTitle,
  subTitle,
  showIcon = true,
  Icon,
  iconSize = 42,
  confirmText = '확인',
  cancelText = '취소',
  showCancel = false,
  onConfirm,
  onCancel,
}: CommonModalProps) {
  const {setAppModalVisible} = useAppStore(state => ({
    setAppModalVisible: state.setAppModalVisible,
  }));

  const handleConfirm = () => {
    setAppModalVisible(false);
    onConfirm?.();
  };

  const handleCancel = () => {
    setAppModalVisible(false);
    onCancel?.();
  };

  return (
    <ModalContentContainer>
      <ModalWrapper>
        {showIcon && Icon && (
          <IconWrapper>
            <Icon
              width={moderateScale(iconSize)}
              height={moderateScale(iconSize)}
            />
          </IconWrapper>
        )}
        <MainTitle>{mainTitle}</MainTitle>

        <SubTitle>{subTitle}</SubTitle>
        <ButtonContainer showCancel={showCancel}>
          {showCancel && (
            <CancelButton onPress={handleCancel}>
              <CancelText>{cancelText}</CancelText>
            </CancelButton>
          )}
          <ConfirmButton showCancel={showCancel} onPress={handleConfirm}>
            <ConfirmText>{confirmText}</ConfirmText>
          </ConfirmButton>
        </ButtonContainer>
      </ModalWrapper>
    </ModalContentContainer>
  );
}

const MainTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  color: ${({theme}) => theme.color.grey.black};
  text-align: center;
  margin-bottom: ${moderateScale(12)}px;
`;

const SubTitle = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${({theme}) => theme.color.grey.main};
  text-align: center;
  font-weight: bold;

  line-height: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(24)}px;
`;

const ModalWrapper = styled.View`
  align-items: center;
  padding: ${moderateScale(12)}px;
  background-color: ${({theme}) => theme.color.grey.white};
  border-radius: ${moderateScale(12)}px;
`;

const IconWrapper = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

const ButtonContainer = styled.View<{showCancel: boolean}>`
  width: 100%;
  flex-direction: ${({showCancel}) => (showCancel ? 'row' : 'column')};
  justify-content: space-between;
  gap: ${moderateScale(8)}px;
`;

const BaseButton = styled.TouchableOpacity`
  padding: ${moderateScale(6)}px;
  align-items: center;
`;

const ConfirmButton = styled(BaseButton)<{showCancel: boolean}>`
  flex: ${({showCancel}) => (showCancel ? 1 : 'none')};
  width: ${({showCancel}) => (showCancel ? 'auto' : '100%')};
`;

const CancelButton = styled(BaseButton)`
  flex: 1;
  border-right-width: 1px;
  border-right-color: ${({theme}) => theme.color.grey.mild};
`;

const ConfirmText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(14)}px;
  font-weight: bold;
`;

const CancelText = styled.Text`
  color: ${({theme}) => theme.color.grey.main};
  font-weight: bold;
  font-size: ${moderateScale(14)}px;
`;
