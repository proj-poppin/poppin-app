import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import useDeleteUser from '../../hooks/myPage/useDeleteUser.tsx';
import ReportCheckSvg from '../../assets/images/reportCheck.svg';
import BackMiddleButton from '../../components/atoms/button/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/atoms/button/NextMiddleButton.tsx';
import ShallowDividerLine from '../../components/ShallowDividerLine.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user.ts';
import {resetInterests} from '../../redux/slices/interestSlice.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

const reasons = [
  '앱 사용이 불편해요',
  '팝업 스토어 찾기가 어려워요',
  '정보가 정확하지 않아요',
  '쓰지 않는 앱이에요',
  '새 계정을 만들고 싶어요',
  '기타',
];

function MemberDeleteScreen({navigation}) {
  const dispatch = useDispatch();
  const [selectedReason, setSelectedReason] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const {loading, error, handleDeleteUser} = useDeleteUser();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleContinueUsing = () => {
    navigation.goBack();
  };

  const confirmDelete = async () => {
    try {
      const resp = await handleDeleteUser();
      if (resp && resp.success) {
        await EncryptedStorage.removeItem('accessToken');
        await EncryptedStorage.removeItem('refreshToken');
        dispatch(userSlice.actions.resetUser());
        dispatch(resetInterests());
      } else {
      }
    } catch (error) {
    } finally {
      closeModal();
      setTimeout(() => {
        navigation.navigate('DeleteComplete');
      }, 500); // Add a slight delay to ensure the modal closes before navigation
    }
  };

  const characterCount = otherReason.length;
  const isOverLimit = characterCount > 100;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
          탈퇴하는 이유를 알려주세요
        </Text>
        <Text style={[Text12R.text, {color: globalColors.font}]}>
          계정을 삭제하면 후기, 저장 등의 활동 정보가 모두 사라져요.
        </Text>
        <View style={styles.reasonContainer}>
          {reasons.map((reason, index) => (
            <View key={index}>
              <Pressable
                style={styles.reasonRow}
                onPress={() => setSelectedReason(index)}>
                {selectedReason === index ? (
                  <ReportCheckSvg
                    width={24}
                    height={24}
                    style={styles.svgIcon}
                  />
                ) : (
                  <View style={styles.circle} />
                )}
                <Text style={styles.reasonText}>{reason}</Text>
              </Pressable>
              {index < reasons.length - 1 && <ShallowDividerLine />}
            </View>
          ))}
        </View>
        {selectedReason === reasons.length - 1 && (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isFocused
                    ? globalColors.blue
                    : globalColors.warmGray,
                  ...(isOverLimit && {borderColor: 'red'}),
                },
              ]}
              multiline
              placeholder="탈퇴 사유를 알려주세요."
              placeholderTextColor={globalColors.font}
              maxLength={100}
              value={otherReason}
              onChangeText={setOtherReason}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Text
              style={[styles.characterCount, isOverLimit && styles.overLimit]}>
              {characterCount}/100
            </Text>
          </>
        )}
        <View style={styles.buttonRow}>
          <BackMiddleButton
            onPress={handleContinueUsing}
            title="계속 사용하기"
          />
          <NextMiddleButton onPress={openModal} title="탈퇴하기" />
        </View>
      </View>
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
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  reasonContainer: {
    marginTop: 30,
  },
  buttonRow: {
    position: 'absolute',
    top: 600,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 100,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // 각 행에 위아래로 패딩 추가
    marginBottom: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: globalColors.purple,
    backgroundColor: 'white',
    marginRight: 12,
  },
  svgIcon: {
    marginRight: 12,
  },
  reasonText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 100,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: 14,
    color: globalColors.font,
  },
  overLimit: {
    color: 'red',
  },
});

export default MemberDeleteScreen;
