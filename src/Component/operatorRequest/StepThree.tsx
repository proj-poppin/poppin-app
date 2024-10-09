import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DownSvg from '../../assets/icons/down.svg';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import RequiredTextLabel from '../RequiredTextLabel.tsx';
import SelectButtonsGroup from '../button/SelectButtonGroup.tsx';
import TextInputWithSvgIconInRight from '../TextInputWithSvgIconInRight.tsx';
import CompleteButton from '../button/CompleteButton.tsx';
import CategorySelectButton from '../Button/⭐\uFE0FCategorySelectButton.tsx';
import {POP_UP_TYPES, TFilter} from '../findPopup/constants.ts';
import DismissKeyboardView from '../DismissKeyboardView.tsx';

export type AgeGroup = '전체' | '7세 이상' | '12세 이상' | '15세 이상' | '성인';
export type AgeGroupValueType =
  | 'G_RATED'
  | 'PG_7'
  | 'PG_12'
  | 'PG_15'
  | 'PG_18'
  | 'G_RATED';

interface StepThreeProps {
  introduce: string;
  setIntroduce: (text: string) => void;
  resvRequired: boolean | null;
  handleReservationRequiredSelect: (value: boolean) => void;
  selectedAge: AgeGroup;
  handleAgePresentModal: () => void;
  entranceRequired: boolean | null;
  handleEntranceFeeStatusSelect: (value: boolean) => void;
  entranceFee: string;
  setEntranceFee: (text: string) => void;
  parkingAvailability: boolean | null;
  handleParkingAvailabilitySelect: (value: boolean) => void;
  bottomSheetAgeModalRef: React.RefObject<BottomSheetModal>;
  snapPoints2: string[];
  renderBackdrop: any;
  handleOpenAgeSheet: () => void;
  onSelectSingleOption: (option: TFilter) => void;
  handleConfirmAgeSelection: () => void;
  selectedCategory: string;
  setStepThreeValid: (isValid: boolean) => void;
}

export const mapAgeGroupToApiValue = (ageGroup: String): string => {
  switch (ageGroup) {
    case '전체':
      return 'G_RATED';
    case '7세 이상':
      return 'PG_7';
    case '12세 이상':
      return 'PG_12';
    case '15세 이상':
      return 'PG_15';
    case '성인':
      return 'PG_18';
    default:
      return 'G_RATED';
  }
};

const StepThree: React.FC<StepThreeProps> = ({
  introduce,
  setIntroduce,
  resvRequired,
  handleReservationRequiredSelect,
  selectedAge,
  handleAgePresentModal,
  entranceRequired,
  handleEntranceFeeStatusSelect,
  entranceFee,
  setEntranceFee,
  parkingAvailability,
  handleParkingAvailabilitySelect,
  bottomSheetAgeModalRef,
  snapPoints2,
  renderBackdrop,
  handleOpenAgeSheet,
  onSelectSingleOption,
  handleConfirmAgeSelection,
  selectedCategory,
  setStepThreeValid,
}) => {
  const [availableTags, setAvailableTags] = useState<TFilter[]>(POP_UP_TYPES);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleClick = (selectedTag: TFilter) => {
    setSelectedTags(prev =>
      prev.map(item =>
        item.id === selectedTag.id
          ? {...item, selected: true}
          : {...item, selected: false},
      ),
    );
    onSelectSingleOption(selectedTag); // Pass the entire selectedTag object
  };

  const handleSheetChanges = (index: number) => {
    setIsBottomSheetOpen(index >= 0);
  };

  const handleEntranceFeeStatus = (value: string) => {
    console.log('handleEntranceFeeStatus called with value:', value);
    handleEntranceFeeStatusSelect(value === '있음');
  };

  // Step validation
  useEffect(() => {
    const isValid =
      introduce.length >= 20 &&
      introduce.length <= 300 &&
      resvRequired !== null &&
      entranceRequired !== null &&
      parkingAvailability !== null;
    console.log('intro', introduce);
    console.log('resv', resvRequired);
    console.log('age', selectedAge);
    console.log('entrance', entranceRequired);
    console.log('parking', parkingAvailability);
    console.log('isValid', isValid);
    setStepThreeValid(isValid);
  }, [
    introduce,
    resvRequired,
    selectedAge,
    entranceRequired,
    parkingAvailability,
    setStepThreeValid,
  ]);

  return (
    <DismissKeyboardView>
      <View style={styles.purpleInfo}>
        <Text style={[Text18B.text, {color: globalColors.purple}]}>
          📝팝업의 상세 정보를 알려주세요
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <RequiredTextLabel label={'소개'} isRequired={true} />
        <TextInput
          style={styles.introduceInput}
          value={introduce}
          onChangeText={setIntroduce}
          placeholder={'팝업에 대한 내용을 소개해 주세요.'}
          multiline={true}
          maxLength={300}
        />
        <Text style={styles.characterCount}>{introduce.length}/300</Text>
        <RequiredTextLabel label={'예약 필수 여부'} isRequired={true} />
        <SelectButtonsGroup
          titles={['필수 아님', '예약 필수']}
          selected={
            resvRequired !== null
              ? resvRequired
                ? '예약 필수'
                : '필수 아님'
              : ''
          }
          onSelect={value =>
            handleReservationRequiredSelect(value === '예약 필수')
          }
        />
        <TextInputWithSvgIconInRight
          label={'이용 가능 연령'}
          value={selectedAge}
          onIconPress={handleAgePresentModal}
          IconComponent={<DownSvg />}
          isRequired={true}
          isClickableTextInput={true}
        />
        <BottomSheetModal
          ref={bottomSheetAgeModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints2}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
              제보할 팝업의 이용 가능 연령을 선택해 주세요
            </Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(22, 27).map(item => (
                <CategorySelectButton
                  isMultipleSelectionPossible={false}
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  selectedTag={selectedCategory}
                />
              ))}
            </View>
            <CompleteButton
              onPress={handleConfirmAgeSelection}
              title={'확인'}
              buttonWidth={'90%'}
            />
          </View>
        </BottomSheetModal>
        <RequiredTextLabel label={'입장료 유무'} isRequired={true} />
        <SelectButtonsGroup
          titles={['없음', '있음']}
          selected={
            entranceRequired !== null
              ? entranceRequired
                ? '있음'
                : '없음'
              : ''
          }
          onSelect={handleEntranceFeeStatus}
        />
        <RequiredTextLabel label={'입장료'} isRequired={false} />
        <TextInput
          style={styles.introduceInput}
          value={entranceFee}
          onChangeText={setEntranceFee}
          placeholder={
            '입장료가 있다면 작성해 주세요.\nex)성인 16000원, 어린이 7000원'
          }
          multiline={true}
          maxLength={50}
        />
        <Text style={styles.characterCount}>{entranceFee.length}/50</Text>
        <RequiredTextLabel label={'주차 가능 여부'} isRequired={true} />
        <SelectButtonsGroup
          titles={['주차 불가', '주차 가능']}
          selected={
            parkingAvailability !== null
              ? parkingAvailability
                ? '주차 가능'
                : '주차 불가'
              : ''
          }
          onSelect={value =>
            handleParkingAvailabilitySelect(value === '주차 가능')
          }
        />
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  purpleInfo: {
    backgroundColor: globalColors.purpleLight,
    padding: 10,
    borderRadius: 10,
  },
  introduceInput: {
    height: 100,
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    marginBottom: 10,
    fontSize: 14,
    color: globalColors.font,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  popWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    justifyContent: 'center',
  },
});

export default StepThree;
