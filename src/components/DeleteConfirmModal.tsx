import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyles} from '../style/textStyles.ts'; // 경로는 실제 환경에 맞게 조정
import primaryColors from '../style/primaryColors.ts'; // 경로는 실제 환경에 맞게 조정
import AlertSvg from '../assets/images/alert.svg';

const DeleteConfirmationModal = ({isVisible, onClose, onConfirm}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayStyle}>
          <View style={styles.modalView}>
            <AlertSvg />
            <Text
              style={[globalStyles.title, styles.mainText, {marginTop: 10}]}>
              정말 탈퇴 하시겠습니까?
            </Text>
            <Text style={[globalStyles.labelPrimaryGray, styles.subText]}>
              탈퇴하신 아이디로는{'\n'}30일간 재가입 하실 수 없어요
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.continueButton]}
                onPress={onClose}>
                <Text
                  style={[
                    globalStyles.labelPrimaryGray,
                    {color: primaryColors.font},
                  ]}>
                  계속 사용하기
                </Text>
              </Pressable>
              <Text
                style={{
                  color: primaryColors.warmGray,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  paddingBottom: 8,
                  fontSize: 24,
                }}>
                |
              </Text>
              <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={onConfirm}>
                <Text
                  style={[
                    globalStyles.bodyMediumSub,
                    {color: primaryColors.blue},
                  ]}>
                  탈퇴하기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginBottom: 15, // 메인 텍스트와 서브 텍스트 사이의 간격
  },
  subText: {
    marginBottom: 20, // 서브 텍스트와 버튼 사이의 간격
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // 버튼을 모달 너비에 맞춤
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, // 버튼 사이의 간격
    elevation: 2,
  },
  continueButton: {
    backgroundColor: primaryColors.white, // 계속 사용하기 버튼 배경색
  },
  deleteButton: {
    backgroundColor: primaryColors.white, // 탈퇴하기 버튼 배경색
  },
});

export default DeleteConfirmationModal;
