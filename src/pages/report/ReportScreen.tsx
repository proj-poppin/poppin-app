import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import ShallowDividerLine from '../../components/ShallowDividerLine.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import Text12M from '../../styles/texts/label/Text12M.ts';

const reasons = [
  '고의의 잘못된 내용이 혼동을 일으켜요',
  '부적절한 내용이 포함되어 있어요',
  '혐오 또는 폭력적인 단어가 포함되어 있어요',
  '관련없는 사진으로 사람들이 오해할 수 있어요',
  '기타',
];

function ReportScreen({navigation}) {
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
          <Text style={Text20B.text}>신고 완료</Text>
          <Text style={[Text12R.text, styles.completeText]}>
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
        <View
          style={[{flexDirection: 'row'}, {marginTop: 40, marginBottom: 10}]}>
          <Text style={[Text20B.text]}>{'신고 사유를 알려주세요'}</Text>
          <Text
            style={[
              Text12M.text,
              {color: globalColors.font},
              {marginLeft: 15, marginTop: 5},
            ]}>
            {'*복수 선택 가능'}
          </Text>
        </View>
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
                      backgroundColor: globalColors.purple,
                    },
                  ]}
                />
                <Text style={styles.reasonText}>{reason}</Text>
              </Pressable>
              {index < reasons.length - 1 && <ShallowDividerLine />}
            </View>
          ))}
        </View>
        <CompleteButton
          onPress={openModal}
          title={'신고하기'}
          disabled={selectedReason === null}
          style={styles.reportButton}
        />
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
    backgroundColor: globalColors.white,
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
    borderColor: globalColors.purple,
    backgroundColor: globalColors.white,
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
  reportButton: {
    position: 'absolute',
    bottom: 100,
    left: 15,
    right: 15,
  },
});

export default ReportScreen;
