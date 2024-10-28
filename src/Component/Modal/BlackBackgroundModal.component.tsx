import React from 'react';
import {
  ModalBaseProps,
  StyleProp,
  ViewStyle,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

/**
 * 검은색 뒷배경을 가진 모달입니다. 검은색 배경을 누르면 모달이 닫힙니다.
 *
 * @example
 * ```
 * function ExampleModal(){
 *  const [modalVisible, setModalVisible] = useState<boolean>(false)
 *
 *  return(
 *    <BlackBackgroundModal
 *      modalVisible={modalVisible}
 *      setModalVisible={setModalVisible}
 *      props={{ animationType: "slide" }}>
 *      { modal content }
 *    </BlackBackgroundModal>
 *  )
 * }
 * ```
 *
 * @param modalVisible 모달 표시 여부 변수
 * @param setModalVisible modalVisible 상태 관리 함수
 * @param allowIgnore (Optional) 뒤로 가기, 혹은 모달 배경을 눌러 닫을 수 있는지 여부. 기본값 true
 * @author 도형
 */
export const BlackBackgroundModal = ({
  children,
  modalVisible,
  setModalVisible,
  allowIgnore = true,
  onModalHide,
  style,
  props,
  onPressBackground,
}: {
  children: any;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  allowIgnore?: boolean;
  onModalHide?: () => void;
  style?: StyleProp<ViewStyle>;
  props?: Partial<ModalBaseProps>;
  onPressBackground?: () => void;
}) => {
  /**
   * 모달을 닫을 때 호출하는 함수
   * @author 도형
   */
  const onClose = () => {
    setModalVisible(false);
    onModalHide?.();
  };

  return (
    <Modal
      visible={modalVisible}
      //? 하드웨어 뒤로 가기 버튼이 눌렸을 때 행동 지정
      onRequestClose={allowIgnore ? onClose : () => {}}
      transparent
      animationType="slide"
      {...props}>
      <TouchableWithoutFeedback
        style={[
          {
            position: 'relative',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          style,
        ]}
        onPress={
          onPressBackground
            ? onPressBackground
            : allowIgnore
            ? onClose
            : undefined
        }>
        {children}
      </TouchableWithoutFeedback>
    </Modal>
  );
};
