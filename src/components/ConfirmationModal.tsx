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
import CheckSvg from '../assets/images/check3.svg'; // 경로 확인 필요
import AlertSvg from '../assets/images/alert.svg';
import Text14R from '../styles/texts/body_medium/Text14R.ts';
import Text20B from '../styles/texts/title/Text20B.ts';
import Text18B from '../styles/texts/body_large/Text18B.ts';
import Text16M from '../styles/texts/body_medium_large/Text16M.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts';

const ConfirmationModal = ({
  isVisible,
  onClose,
  mainTitle,
  subTitle,
  isAlertSvg = false,
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
            <Text style={[Text20B.text, styles.mainText, {marginTop: 20}]}>
              {mainTitle}
            </Text>
            <View>{isAlertSvg ? <AlertSvg /> : <CheckSvg />}</View>
            <Text style={[Text14M.text, styles.subText, {marginTop: 20}]}>
              {subTitle}
            </Text>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.okButton]}>
              {({pressed}) => (
                <Text
                  style={[
                    Text16M.text,
                    {
                      color: pressed
                        ? globalColors.buttonPressed
                        : globalColors.blue,
                    },
                  ]}>
                  확인
                </Text>
              )}
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
    width: '80%',
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
    marginBottom: 20, // 메인 텍스트와 서브 텍스트 사이의 간격
  },
  subText: {
    marginBottom: 20, // 서브 텍스트와 버튼 사이의 간격
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

export default ConfirmationModal;
