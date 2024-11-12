import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import SkipSvg from 'src/Resource/svg/location-pin-icon.svg';
import globalColors from '../styles/color/globalColors.ts';
import Text18B from '../styles/texts/body_large/Text18B.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts';

interface BlockModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSetNow: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({
  isVisible,
  onClose,
  onSetNow,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.overlayStyle}>
        <View style={styles.modalView}>
          <SkipSvg style={{paddingBottom: 80}} />
          <Text style={[Text18B.text, {textAlign: 'center'}]}>
            {'차단한 게시글은 다시 볼 수 없습니다.'}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Pressable style={styles.buttonSkip} onPress={onSetNow}>
              {({pressed}) => (
                <Text
                  style={[
                    Text14M.text,
                    {
                      color: pressed ? 'gray' : globalColors.font,
                    },
                  ]}>
                  확인
                </Text>
              )}
            </Pressable>
            <Text
              style={{
                color: globalColors.warmGray,
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingBottom: 8,
                fontSize: 24,
              }}>
              |
            </Text>
            <Pressable onPress={onClose} style={styles.buttonSetNow}>
              {({pressed}) => (
                <Text
                  style={[
                    Text14M.text,
                    {
                      color: pressed
                        ? globalColors.buttonPressed
                        : globalColors.blue,
                    },
                  ]}>
                  취소
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

export default BlockModal;
