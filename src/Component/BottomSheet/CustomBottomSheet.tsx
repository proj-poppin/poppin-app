import React, {useEffect, useRef} from 'react';
import {Modal, Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from '../../Util';
import ClsoseIcon from '../../Resource/svg/close-icon.svg';
/**
 * CustomBottomSheet를 제작해두어 이를 참고하여 쓸 수 있게 합니다,
 * height는 화면 기준 몇 퍼센트를 차지하게끔 할 건지에 대해서 작성하고, 이는 타입 여부에 관계없이 사용할 수 있습니다.
 * title은 Sheet 최상단에 들어가는 title입니다.
 * 내부의 children이라는 prop을 통해서 Container을 집어넣으면 됩니다!
 * ex) MypageLandingReportSection 을 참고하시면 됩니다!
 * @author 홍규진
 */
interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  height?: string | number; // height prop 추가
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  onClose,
  title,
  children,
  height = '40%', // 기본값 설정
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isVisible) {
      // 올라오는 애니메이션
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }).start();
    } else {
      // 내려가는 애니메이션
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [isVisible, translateY]);

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="fade">
      <Container>
        <Backdrop onPress={onClose} />
        <SheetContainer
          $height={height} // styled-components prop 전달
          as={Animated.View}
          style={{
            transform: [{translateY}],
          }}>
          <CloseIconContainer onPress={onClose}>
            <ClsoseIcon />
          </CloseIconContainer>
          <SheetContent>
            <HeaderContainer>
              <HeaderText>{title}</HeaderText>
              <HeaderDivider />
            </HeaderContainer>
            <BodyContainer>{children}</BodyContainer>
          </SheetContent>
        </SheetContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
  justify-content: flex-end;
  background-color: transparent;
`;

const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const CloseIconContainer = styled.Pressable`
  position: absolute;
  top: ${moderateScale(16)}px;
  right: ${moderateScale(20)}px;
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  z-index: 1;
`;

const SheetContainer = styled.View<{$height: string | number}>`
  background-color: white;
  border-top-left-radius: ${moderateScale(20)}px;
  border-top-right-radius: ${moderateScale(20)}px;
  height: ${props =>
    typeof props.$height === 'number' ? `${props.$height}px` : props.$height};
  margin-bottom: -${moderateScale(40)}px;
  padding-bottom: ${moderateScale(40)}px;
`;

const SheetContent = styled.View`
  flex: 1;
  padding: ${moderateScale(16)}px ${moderateScale(4)}px;
`;

const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: ${moderateScale(20)}px;
`;

const HeaderText = styled.Text`
  text-align: center;
  margin-top: ${moderateScale(18)}px;
  font-size: ${moderateScale(18)}px;
  font-weight: 600;
`;

const HeaderDivider = styled.View`
  width: ${moderateScale(40)}px;
  border-radius: ${moderateScale(2)}px;
`;

const BodyContainer = styled.View`
  flex: 1;
`;

export default CustomBottomSheet;
