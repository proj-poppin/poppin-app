import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import globalColors from '../styles/color/globalColors.ts'; // 경로는 실제 환경에 맞게 조정
import AlertSvg from '../assets/images/alert.svg';
import CheckSvg from '../assets/images/check3.svg';
import Text14R from '../styles/texts/body_medium/Text14R.ts';
import Text18B from '../styles/texts/body_large/Text18B.ts';
import Text12M from '../styles/texts/label/Text12M.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts'; // CheckSvg 경로도 실제 환경에 맞게 조정

const CustomOKModal = ({
  isVisible,
  onClose,
  isSuccessModal: isSuccessModal,
  mainTitle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayStyle}>
          <View style={styles.modalView}>
            <Text style={[Text18B.text, styles.mainText, {marginTop: 20}]}>
              {mainTitle}
            </Text>
            {isSuccessModal ? <CheckSvg /> : <AlertSvg />}
            <Text style={[Text12M.text, styles.subText, {marginTop: 20}]}>
              {isSuccessModal
                ? '변경 사항이 저장되었습니다.'
                : ' 다시 시도해 주세요.'}
            </Text>
            <Pressable
              style={[styles.button, styles.okButton]}
              onPress={onClose}>
              <Text style={[Text14M.text, {color: globalColors.blue}]}>
                확인
              </Text>
            </Pressable>
          </View>
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
    width: '90%',
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
  mainText: {
    borderRadius: 20,
    paddingHorizontal: 40,
    marginHorizontal: 10, // 버튼 사이의 간격
    marginBottom: 20,
  },
  subText: {
    marginBottom: 20, // 메시지와 버튼 사이 간격 조정
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    backgroundColor: globalColors.white, // 확인 버튼 배경색
  },
  okButton: {
    // 필요한 경우 추가 스타일링
  },
});

export default CustomOKModal;
