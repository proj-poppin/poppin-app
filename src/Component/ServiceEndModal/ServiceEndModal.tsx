import {
  Modal,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useEffect} from 'react';

const ServiceEndModal = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={handleExit}>
      <View style={serviceEndModalStyles.centeredView}>
        <View style={serviceEndModalStyles.modalView}>
          <Image
            style={serviceEndModalStyles.modalImage}
            source={require('src/Resource/png/app-logo.png')}
            width={150}
            height={150}
          />
          <Text style={serviceEndModalStyles.modalTitle}>서비스 종료 안내</Text>
          <Text style={serviceEndModalStyles.modalText}>
            안녕하세요, 팝핀 서비스를 이용해 주셔서 감사합니다. 팝핀 서비스는
            2025년 5월 30일까지만 운영됩니다. 그동안 팝핀 서비스를 이용해 주셔서
            진심으로 감사드립니다.
          </Text>
          <TouchableOpacity
            style={serviceEndModalStyles.exitButton}
            onPress={handleExit}>
            <Text style={serviceEndModalStyles.exitButtonText}>
              앱 종료하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ServiceEndModal;

const serviceEndModalStyles = StyleSheet.create({
  centeredView: {
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
    width: '80%',
  },
  modalImage: {
    marginBottom: 20,
    width: 150,
    height: 150,
  },
  modalTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  exitButton: {
    marginTop: 30,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
