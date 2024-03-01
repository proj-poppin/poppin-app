import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyles} from '../style/textStyles'; // 경로는 실제 환경에 맞게 조정
import primaryColors from '../style/primaryColors'; // 경로는 실제 환경에 맞게 조정
import CheckSvg from '../assets/images/check3.svg'; // 경로 확인 필요
import AlertSvg from '../assets/images/alert.svg';

const ConfirmationModal = ({
  isVisible,
  onClose,
  mainTitle,
  subTitle, // subTitle 파라미터 추가
  isAlertSvg = false, // isAlertSvg 삭제
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
            <Text
              style={[globalStyles.title, styles.mainText, {marginTop: 20}]}>
              {mainTitle}
            </Text>
            <View>{isAlertSvg ? <AlertSvg /> : <CheckSvg />}</View>
            <Text
              style={[
                globalStyles.labelPrimary,
                styles.subText,
                {marginTop: 20},
              ]}>
              {subTitle}
            </Text>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.okButton]}>
              {({pressed}) => (
                <Text
                  style={[
                    globalStyles.bodyMediumSub,
                    {
                      color: pressed
                        ? primaryColors.buttonPressed
                        : primaryColors.blue,
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
    backgroundColor: primaryColors.white, // 확인 버튼 배경색
  },
  okButton: {
    // 필요한 경우 추가 스타일링
  },
});

export default ConfirmationModal;
