import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import ShallowDividerLine from '../../components/ShallowDividerLine.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import Text12M from '../../styles/texts/label/Text12M.ts';
import useReportPopup from '../../hooks/report/useReportPopUp.tsx';
import useReportReview from '../../hooks/report/useReportReview.tsx';
import ReportCheckSvg from '../../assets/images/reportCheck.svg';
import Text16M from '../../styles/texts/body_medium_large/Text16M.ts';

const reasons = [
  '고의의 잘못된 내용이 혼동을 일으켜요',
  '부적절한 내용이 포함되어 있어요',
  '혐오 또는 폭력적인 단어가 포함되어 있어요',
  '관련없는 사진으로 사람들이 오해할 수 있어요',
  '기타',
];

function ReportScreen({navigation, route}) {
  const {id, isReview, reviewId} = route.params;
  const [selectedReason, setSelectedReason] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {reportPopupDetails} = useReportPopup();
  const {reportReviewDetails} = useReportReview();
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  console.log(id, isReview, reviewId);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmDelete = async () => {
    setIsDeleted(true);
    closeModal();
    const reportContent =
      selectedReason === reasons.length - 1 ? content : reasons[selectedReason];
    if (isReview) {
      const resp = await reportReviewDetails(
        reviewId.toString(),
        reportContent,
      );
      console.log(resp);
    } else {
      await reportPopupDetails(id, reportContent);
    }
  };

  if (isDeleted) {
    return (
      <DismissKeyboardView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={Text20B.text}>신고 완료</Text>
          <Text style={[Text12R.text, styles.completeText]}>
            신고가 완료되었습니다.
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
          {/*<Text*/}
          {/*  style={[*/}
          {/*    Text12M.text,*/}
          {/*    {color: globalColors.font},*/}
          {/*    {marginLeft: 15, marginTop: 5},*/}
          {/*  ]}>*/}
          {/*  {'*복수 선택 가능'}*/}
          {/*</Text>*/}
        </View>
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
                <Text style={Text16M.text}>{reason}</Text>
              </Pressable>
              {index < reasons.length - 1 && <ShallowDividerLine />}
            </View>
          ))}
        </View>
        {selectedReason === reasons.length - 1 && (
          <TextInput
            style={[
              styles.reportInput,
              {
                borderColor: isFocused
                  ? globalColors.blue
                  : globalColors.warmGray,
              },
            ]}
            multiline
            placeholder="신고 사유를 알려주세요."
            placeholderTextColor={globalColors.font}
            maxLength={1000}
            value={content}
            onChangeText={setContent}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
        <Text style={[Text12R.text, {color: globalColors.font}]}>
          *문의사항은 접수 후 수정이 불가능합니다.{'\n'}
          *최대 24시간 이내에 검토 후 조치하도록 하겠습니다.{'\n'}
        </Text>
        <CompleteButton
          onPress={openModal}
          title={'신고하기'}
          disabled={
            selectedReason === null ||
            (selectedReason === reasons.length - 1 && !content)
          }
          style={styles.reportButton}
        />
      </DismissKeyboardView>
      <TwoSelectConfirmationModal
        mainAlertTitle={'정말 신고하시겠습니까?'}
        subAlertTitle={'신고 사유를 확인해주세요.'}
        onConfirm={confirmDelete}
        onClose={closeModal}
        onBlankSpacePressed={closeModal}
        isVisible={modalVisible}
        selectFirstText={'취소'}
        selectSecondText={'신고하기'}
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
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: globalColors.purple,
    backgroundColor: globalColors.white,
    marginRight: 12,
  },
  svgIcon: {
    marginRight: 12,
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
    top: 600,
  },
  reportInput: {
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 120,
    fontSize: 14,
  },
});

export default ReportScreen;
