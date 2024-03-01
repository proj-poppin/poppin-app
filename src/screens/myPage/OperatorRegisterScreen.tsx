import {ScrollView, StyleSheet, Text, View} from 'react-native';
import primaryColors from '../../style/primaryColors.ts';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import CompleteButton from '../../components/CompleteButton.tsx';
import BackMiddleButton from '../../components/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/NextMiddleButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import LabelAndInputWithCloseSvg from '../../components/LabelAndInputWithCloseSvg.tsx';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CategoryBottomSheetInput from '../../components/CategoryBottomSheetInput.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
import PopupTypeOptions from '../../components/PopUpTypeOptions.tsx';
import CalendarGraySvg from '../../assets/icons/calendarGray.svg';
import ClockGraySvg from '../../assets/icons/clock.svg';
import {Calendar} from 'react-native-calendars';
import OperationPeriodInput from '../../components/OperationPeriodInput.tsx';
import OperationTimerInput from '../../components/OperationTimerInput.tsx';
import * as timers from 'timers';

function OperatorRegisterScreen({navigation}) {
  const [step, setStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [operatorEmail, setOperatorEmail] = useState<string>('');

  const [storeName, setStoreName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPopupType, setSelectedPopupType] = useState('');
  const [exceptionalOperation, setExceptionalOperation] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('');

  const [selectedDates, setSelectedDates] = useState({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Handle opening the bottom sheet for calendar
  const handleOpenCalendar = () => {
    bottomSheetModalRef.current?.present();
  };

  // Assuming you have a function to handle date selection from the calendar
  const onDateSelected = date => {
    setSelectedDates(date);
    bottomSheetModalRef.current?.dismiss(); // Close the bottom sheet
    // Process selected dates for open and close date fields
  };

  // Memoize the snap points of the bottom sheet
  const snapPoints = useMemo(() => ['60%'], []);

  // Handling popup type selection
  const onSelectPopupType = value => {
    console.log('Selected Popup Type: ', value);
    setSelectedPopupType(value); // This will ensure that only one popup type can be selected at a time
  };

  // ref
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // handleOpenBottomSheet();
  }, []);

  // render backdrop
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onSelectSingleOption = option => {
    setSelectedCategory(option);
  };

  const handleConfirmSelection = useCallback(() => {
    console.log('Selected Category: ', selectedCategory); // 콘솔에 선택된 카테고리 출력

    bottomSheetModalRef.current?.close(); // 바텀 시트 닫기
    // setSelectedCategory(''); // 선택 상태 초기화
  }, [selectedCategory]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressBarStyle = {
    width: '100%',
    backgroundColor: primaryColors.blue,
    borderRadius: 20,
  };

  const progressBarContainerStyle = {
    height: 5,
    backgroundColor: primaryColors.warmGray,
    borderRadius: 20,
    paddingRight: undefined as number | undefined,
    paddingLeft: undefined as number | undefined,
  };

  // Adjust padding based on step
  if (step === 1) {
    progressBarContainerStyle.paddingRight = 220;
  } else if (step === 2) {
    progressBarContainerStyle.paddingLeft = 110;
    progressBarContainerStyle.paddingRight = 110;
  } else if (step === 3) {
    progressBarContainerStyle.paddingLeft = 220;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <DismissKeyboardView style={[styles.container, {flex: 1}]}>
          <View style={[progressBarContainerStyle]}>
            <View style={[styles.progressBarFill, progressBarStyle]} />
          </View>
          <ScrollView>
            <Text
              style={[
                globalStyles.title,
                {textAlign: 'left', paddingVertical: 30},
              ]}>
              {'POPPIN에 등록하기 위한\n정보가 필요해요!'}
            </Text>
            {step === 1 && (
              <>
                <LabelAndInputWithCloseSvg
                  label={'소속(업체명)'}
                  value={companyName}
                  onChangeText={setCompanyName}
                />
                <View style={{height: 20}} />
                <LabelAndInputWithCloseSvg
                  label={'담당자 이메일'}
                  value={operatorEmail}
                  onChangeText={setOperatorEmail}
                />
                <Text
                  style={[
                    globalStyles.labelSubGray,
                    {textAlign: 'center'},
                    {paddingTop: 20},
                  ]}>
                  *제공해주신 이메일로 정보확인차 연락을 드릴 예정이니,{'\n'}
                  이메일 정보가 정확한지 확인하여 주시기 바랍니다.
                </Text>
              </>
            )}
            {/* Step 2에서 보여줄 내용 */}
            {step === 2 && (
              <>
                <View style={styles.step2Container}>
                  <Text
                    style={[
                      globalStyles.bodyLargePrimaryBlack,
                      {color: primaryColors.purple},
                    ]}>
                    📝팝업의 기본 정보를 알려주세요
                  </Text>
                  {/* Step 2에서 필요한 입력 필드 등 추가 */}
                </View>
                <LabelAndInputWithCloseSvg
                  label={'팝업이름'}
                  value={storeName}
                  onChangeText={setStoreName}
                />
                <View style={{height: 20}} />
                <CategoryBottomSheetInput
                  label={'카테고리'}
                  value={selectedCategory} // 변경됨
                  onIconPress={handlePresentModal}
                />
                <View style={{height: 20}} />
                <Text style={{paddingVertical: 5}}>{'팝업유형'}</Text>
                <PopupTypeOptions
                  onSelectOption={onSelectPopupType}
                  selectedPopUpType={selectedPopupType}
                />
                <Text style={{paddingVertical: 5}}>{'운영 기간'}</Text>
                <OperationPeriodInput
                  onPeriodSelected={dates => {
                    console.log('Selected dates:', dates);
                    // Update your state or logic here based on selected dates
                  }}
                />
                <Text style={{paddingVertical: 5}}>{'운영 시간'}</Text>
                <OperationTimerInput
                  onTimesSelected={timers => {
                    console.log('Selected times:', timers);
                    // Update your state or logic here based on selected times
                  }}
                />
                <LabelAndInputWithCloseSvg
                  label={'운영 시간 외 예외사항'}
                  value={exceptionalOperation}
                  onChangeText={setExceptionalOperation}
                />
                <LabelAndInputWithCloseSvg
                  label={'공식 사이트 주소'}
                  value={storeUrl}
                  onChangeText={setStoreUrl}
                />

                <View style={styles.modalContainer}>
                  <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    backdropComponent={renderBackdrop}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}>
                    <View style={styles.contentContainer}>
                      <Text
                        style={[
                          globalStyles.bodyLargePrimaryBlack,
                          {paddingTop: 15, paddingBottom: 40},
                        ]}>
                        제보할 팝업의 카테고리를 설정해 주세요
                      </Text>
                      <PreferenceOptionButtons
                        step={2}
                        onSelectOption={onSelectSingleOption}
                        isEmojiRemoved={true}
                        isSingleSelect={true}
                        selectedCategory={selectedCategory}
                      />
                      <CompleteButton
                        onPress={handleConfirmSelection}
                        title={'확인'}
                        horizontalPadding={20}
                        buttonWidth={'90%'}
                      />
                    </View>
                  </BottomSheetModal>
                </View>
              </>
            )}

            {/* Step 3에서 보여줄 내용 */}
          </ScrollView>
          <View style={styles.buttonContainer}>
            {step === 1 && (
              <CompleteButton onPress={handleNext} title={'다음'} />
            )}
            {step === 2 && (
              <View style={styles.buttonRow}>
                <BackMiddleButton onPress={handleBack} title={'이전'} />
                <View style={{width: 30}} />
                <NextMiddleButton onPress={handleNext} title={'다음'} />
              </View>
            )}
            {step === 3 && (
              <View style={styles.buttonRow}>
                <BackMiddleButton onPress={handleBack} title={'이전'} />
                <View style={{width: 30}} />
                <NextMiddleButton
                  onPress={() => navigation.navigate('Main')}
                  title={'완료'}
                />
              </View>
            )}
          </View>
        </DismissKeyboardView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColors.white,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  progressBarFill: {
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },

  step2Container: {
    backgroundColor: primaryColors.purpleLight,
    padding: 10,
    borderRadius: 10,
    // 기타 필요한 스타일
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /////

  labelText: {
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  closeButton: {
    paddingRight: 10, // 닫기 버튼의 패딩 조정
  },
});

export default OperatorRegisterScreen;
