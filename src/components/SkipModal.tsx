// SkipModal.js
import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import SkipSvg from '../assets/images/skip.svg';
import {globalStyles} from '../style/textStyles.ts';
import primaryColors from '../style/primaryColors.ts'; // 경로는 실제 환경에 맞게 조정

const SkipModal = ({isVisible, onClose, onSetNow}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.overlayStyle}>
        <View style={styles.modalView}>
          <SkipSvg style={{paddingBottom: 80}} />
          <Text style={[globalStyles.bodyLargePrimary, {textAlign: 'center'}]}>
            {'취향을 설정하면 맞춤 팝업 정보를\n받아볼 수 있어요!'}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Pressable style={styles.buttonSkip} onPress={onClose}>
              {({pressed}) => (
                <Text
                  style={[
                    globalStyles.bodyMediumSub,
                    {
                      color: pressed ? 'gray' : primaryColors.font,
                    }, // 조건부 색상 적용
                  ]}>
                  건너뛰기
                </Text>
              )}
            </Pressable>
            <Text
              style={{
                color: primaryColors.whiteGray,
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingBottom: 8,
                fontSize: 24,
              }}>
              |
            </Text>
            <Pressable onPress={onSetNow} style={styles.buttonSetNow}>
              {({pressed}) => (
                <Text
                  style={[
                    globalStyles.bodyMediumSub,
                    {
                      color: pressed
                        ? primaryColors.buttonPressed
                        : primaryColors.blue,
                    }, // 조건부 색상 적용
                  ]}>
                  지금 설정하기
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
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
    paddingHorizontal: 35,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSkip: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 10,
  },
  buttonSetNow: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
  },
});

export default SkipModal;
