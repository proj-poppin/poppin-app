import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import Text14M from '../../../styles/texts/body_medium/Text14M.ts';
import Text12M from '../../../styles/texts/label/Text12M.ts';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  SvgIcon: React.ElementType; // SVG 컴포넌트
  contentFirstLine: string;
  contentSecondLine: string;
  checkText: string;
  distance: number; // 거리 값을 위한 새로운 prop
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  SvgIcon,
  contentFirstLine,
  contentSecondLine,
  checkText,
  distance, // 거리 값을 받음
}) => {
  // 거리 메시지를 계산하는 로직
  const distanceMessage = distance
    ? distance <= 1
      ? `거의 다 왔어요 ${Math.floor(distance * 1000)}m만 남았어요!` // 소수점 제거
      : '팝업에서 1km 이상 떨어져 있어요!'
    : 'N/A';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayStyle}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <SvgIcon style={{marginBottom: 20}} />
              <Text style={[Text18B.text, styles.mainText1]}>
                {contentFirstLine}
              </Text>
              <Text style={[Text18B.text, styles.mainText2]}>
                {contentSecondLine}
              </Text>
              {distanceMessage !== '팝업에서 1km 이상 떨어져 있어요!' ? (
                <Text
                  style={[
                    Text12M.text,
                    styles.mainText2,
                    {color: globalColors.blue},
                  ]}>
                  {distanceMessage}
                </Text>
              ) : (
                <Text
                  style={[Text12M.text, styles.mainText2, styles.fontColor]}>
                  {distanceMessage}
                </Text>
              )}
              <Pressable
                style={[styles.button, styles.okButton]}
                onPress={onClose}>
                <Text style={[Text14M.text, {color: globalColors.blue}]}>
                  {checkText}
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    height: '26%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mainText1: {
    textAlign: 'center',
  },
  mainText2: {
    textAlign: 'center',
    marginBottom: 20,
  },
  fontColor: {
    color: globalColors.font,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: globalColors.white, // 확인 버튼 배경색
  },
  okButton: {
    // 필요한 경우 추가 스타일링
  },
});

export default CustomModal;
