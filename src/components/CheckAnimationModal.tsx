// CheckModal.js
import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';
import Check1Svg from '../assets/images/check1.svg';
import Check2Svg from '../assets/images/check2.svg';
import Check3Svg from '../assets/images/check3.svg';
import Text18B from './texts/body_large/Text18B.ts';
import Text14R from './texts/body_medium/Text14R.ts';

const CheckModal = ({isVisible, onClose}) => {
  const [checkStage, setCheckStage] = useState(1);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isVisible && checkStage < 3) {
      timer = setTimeout(() => {
        setCheckStage(checkStage + 1);
      }, 100); // 1초 간격으로 체크 스테이지 변경
    }
    return () => clearTimeout(timer);
  }, [checkStage, isVisible]);

  const renderCheckSvg = () => {
    switch (checkStage) {
      case 1:
        return <Check1Svg />;
      case 2:
        return <Check2Svg />;
      default:
        return <Check3Svg />;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.overlayStyle}>
        <View style={styles.modalView}>
          <Text style={[Text18B.text, {textAlign: 'center', marginBottom: 20}]}>
            소중한 제보 감사합니다
          </Text>
          {renderCheckSvg()}
          <Text
            style={[
              Text14R.text,
              {textAlign: 'center', marginTop: 20, paddingBottom: 3},
            ]}>
            제보하신 팝업은
          </Text>
          <Text style={[Text14R.text, {textAlign: 'center', paddingBottom: 3}]}>
            POPPIN에서 확인 후 업로드 될 예정입니다.
          </Text>
          <Text style={[Text14R.text, {textAlign: 'center'}]}>
            더 나은 POPPIN이 되겠습니다.
          </Text>
          <Pressable style={styles.confirmButton} onPress={onClose}>
            {({pressed}) => (
              <Text
                style={[
                  Text14R.text,
                  {
                    color: pressed
                      ? globalColors.buttonPressed
                      : globalColors.blue,
                  }, // 조건부 색상 적용
                ]}>
                확인
              </Text>
            )}
          </Pressable>
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
    padding: 35,
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
  confirmButton: {
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
});

export default CheckModal;
