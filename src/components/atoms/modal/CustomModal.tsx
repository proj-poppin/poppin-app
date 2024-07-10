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

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  SvgIcon: React.ElementType; // SVG 컴포넌트
  contentFirstLine: string;
  contentSecondLine: string;
  checkText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  SvgIcon,
  contentFirstLine,
  contentSecondLine,
  checkText,
}) => {
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
    height: '23%',
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
