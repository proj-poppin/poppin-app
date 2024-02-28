import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ProfileAppBar from '../../components/ProfileAppBar.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import primaryColors from '../../style/primaryColors.ts';
import ShallowDividerLine from '../../components/ShallowDividerLine.tsx';
import BackMiddleButton from '../../components/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/NextMiddleButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';

const reasons = [
  '앱 사용이 불편해요',
  '팝업 스토어 찾기가 어려워요',
  '정보가 정확하지 않아요',
  '쓰지 않는 앱이에요',
  '새 계정을 만들고 싶어요',
  '기타',
];

function MemberDeleteScreen({navigation}) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmDelete = () => {
    setIsDeleted(true);
    closeModal();
  };

  if (isDeleted) {
    return (
      <DismissKeyboardView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={globalStyles.title}>회원 탈퇴 완료</Text>
          <Text style={[globalStyles.labelSub, styles.completeText]}>
            그동안 Poppin을{'\n'}이용해주셔서 감사합니다.
          </Text>
        </View>
        <View style={{paddingTop: 150}}>
          <CompleteButton
            onPress={() => navigation.navigate('Home')}
            title={'완료'}
          />
        </View>
      </DismissKeyboardView>
    );
  }

  return (
    <>
      <DismissKeyboardView style={styles.container}>
        <Text style={[globalStyles.title, {marginTop: 40, marginBottom: 10}]}>
          {'탈퇴하는 이유를 알려주세요'}
        </Text>
        <Text style={globalStyles.labelSubGray}>
          {'계정을 삭제하면 후기, 저장 등의 활동 정보가 모두 사라져요.'}
        </Text>
        <View style={styles.reasonContainer}>
          {reasons.map((reason, index) => (
            <View key={index}>
              <Pressable
                style={styles.reasonRow}
                onPress={() => setSelectedReason(index)}>
                <View
                  style={[
                    styles.circle,
                    selectedReason === index && {
                      backgroundColor: primaryColors.purple,
                    },
                  ]}
                />
                <Text style={styles.reasonText}>{reason}</Text>
              </Pressable>
              {index < reasons.length - 1 && <ShallowDividerLine />}
            </View>
          ))}
        </View>
        <View style={styles.buttonRow}>
          <BackMiddleButton
            onPress={() => navigation.goBack()}
            title={'계속 사용하기'}
            textColor={primaryColors.font}
          />
          <View style={{width: 100}} />
          <NextMiddleButton onPress={openModal} title={'탈퇴하기'} />
        </View>
      </DismissKeyboardView>
      <TwoSelectConfirmationModal
        mainAlertTitle={'정말 탈퇴 하시겠습니까?'}
        subAlertTitle={'탈퇴하신 아이디로는\n30일간 재가입 하실 수 없어요'}
        onConfirm={confirmDelete}
        onClose={closeModal}
        onBlankSpacePressed={closeModal}
        isVisible={modalVisible}
        selectFirstText={'계속 사용하기'}
        selectSecondText={'탈퇴하기'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColors.white,
    paddingHorizontal: 15,
  },
  reasonContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: primaryColors.purple,
    backgroundColor: primaryColors.white,
    marginRight: 12,
    marginTop: 10,
  },
  reasonText: {
    fontSize: 16,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 230,
    paddingHorizontal: 20,
  },
  completeTitle: {
    marginBottom: 10,
  },
  completeText: {
    textAlign: 'center',
    paddingTop: 5,
  },
  completeButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default MemberDeleteScreen;
