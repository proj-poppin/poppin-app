import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Modal, Animated, Dimensions, PanResponder, View} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from '../../Util';

/**
 * CustomBottomSheet를 제작해두어 이를 참고하여 쓸 수 있게 합니다,
 * height는 화면 기준 몇 퍼센트를 차지하게끔 할 건지에 대해서 작성하고, 이는 타입 여부에 관계없이 사용할 수 있습니다.
 * title은 Sheet 최상단에 들어가는 title입니다.
 * 내부의 children이라는 prop을 통해서 Container을 집어넣으면 됩니다!
 * ex) MypageLandingReportSection 을 참고하시면 됩니다!
 * @author 규진, 도형
 */
interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
                                                                      isVisible,
                                                                      onClose,
                                                                      title,
                                                                      children,
                                                                    }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      // View 타입으로 타입 단언
      const view = contentRef.current as unknown as View;
      view.measure((x, y, width, height) => {
        setContentHeight(height);
      });
    }
  }, [children]);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [isVisible, translateY, contentHeight]);

  const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy > SCREEN_HEIGHT * 0.2) {
            Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT,
              useNativeDriver: true,
              duration: 200,
            }).start(() => onClose());
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 40,
              friction: 8,
            }).start();
          }
        },
      }),
  ).current;

  return (
      <Modal
          visible={isVisible}
          transparent
          statusBarTranslucent
          animationType="fade">
        <Container>
          <Backdrop onPress={onClose} />
          <SheetContainer
              $height={contentHeight}
              as={Animated.View}
              style={{
                transform: [{translateY}],
              }}
              {...panResponder.panHandlers}>
            <HandleBar />
            <SheetContent ref={contentRef}>
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
`;

const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const HandleBar = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(4)}px;
  background-color: #dddddd;
  border-radius: ${moderateScale(3)}px;
  align-self: center;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(10)}px;
`;

const SheetContainer = styled.View<{$height: string | number}>`
  background-color: white;
  border-top-left-radius: ${moderateScale(20)}px;
  border-top-right-radius: ${moderateScale(20)}px;
  ${({$height}) =>
      typeof $height === 'string'
          ? `min-height: ${$height};`
          : `min-height: ${$height}px;`
  }
`;


const SheetContent = styled.View`
`;

const HeaderContainer = styled.View``;

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
  background-color: white;
`;

export default CustomBottomSheet;
