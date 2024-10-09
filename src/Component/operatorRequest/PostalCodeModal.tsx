import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import globalColors from '../../styles/color/globalColors.ts';
import CloseSvg from '../../../src/assets/icons/close.svg';

interface PostalCodeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelected: (data: any) => void;
}

const PostalCodeModal: React.FC<PostalCodeModalProps> = ({
  isVisible,
  onClose,
  onSelected,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Postcode
            style={styles.postcodeStyle}
            jsOptions={{animation: false, hideMapBtn: false}}
            onSelected={onSelected}
            onError={error => console.log(error)}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseSvg style={{margin: 10}} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  postcodeStyle: {
    width: 300,
    height: 350,
    color: globalColors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 뒷배경을 불투명하게 만듭니다
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%', // 모달의 너비를 조절
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default PostalCodeModal;
