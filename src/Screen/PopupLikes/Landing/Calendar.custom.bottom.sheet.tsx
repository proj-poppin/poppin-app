import React, {useEffect, useRef} from 'react';
import {Modal, Animated, Dimensions, PanResponder} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from '../../../Util';

interface CalendarCustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string | number;
  showHandleBar?: boolean; // HandleBar 표시 여부
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const CalendarCustomBottomSheet: React.FC<
  CalendarCustomBottomSheetProps
> = ({isVisible, onClose, children, height = '50%', showHandleBar = true}) => {
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
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
          $height={height}
          as={Animated.View}
          style={{
            transform: [{translateY}],
          }}
          {...panResponder.panHandlers}>
          {showHandleBar && <HandleBar />}
          <SheetContent>{children}</SheetContent>
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
  min-height: ${({$height}) =>
    typeof $height === 'string' ? $height : `${$height}px`};
`;

const SheetContent = styled.View`
  flex: 1;
  padding: ${moderateScale(16)}px;
  background-color: white;
`;

export default CalendarCustomBottomSheet;
