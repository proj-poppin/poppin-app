import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DownSvg from '../../assets/icons/down.svg';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import RequiredTextLabel from '../RequiredTextLabel.tsx';
import SelectButtonsGroup from '../atoms/button/SelectButtonGroup.tsx';
import TextInputWithSvgIconInRight from '../TextInputWithSvgIconInRight.tsx';
import CompleteButton from '../atoms/button/CompleteButton.tsx';
import CategorySelectButton from '../findPopup/CategorySelectButton.tsx';
import {POP_UP_TYPES, TFilter} from '../findPopup/constants.ts';

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
  resvRequired: any;
  handleReservationRequiredSelect: (value: any) => void;
  selectedAge: AgeGroup;
  handleAgePresentModal: () => void;
  entranceRequired: boolean;
  handleEntranceFeeStatusSelect: (value: boolean) => void;
  entranceFee: string;
  setEntranceFee: (text: string) => void;
  parkingAvailability: any;
  handleParkingAvailabilitySelect: (value: any) => void;
  bottomSheetAgeModalRef: React.RefObject<BottomSheetModal>;
  snapPoints2: string[];
  renderBackdrop: any;
  handleOpenAgeSheet: () => void;
  onSelectSingleOption: (option: TFilter) => void;
  handleConfirmAgeSelection: () => void;
  selectedCategory: string;
}

export const mapAgeGroupToApiValue = (ageGroup: AgeGroup): string => {
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
    handleEntranceFeeStatusSelect(value === '있음');
  };

  return (
    <>
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
        />
        <RequiredTextLabel label={'예약 필수 여부'} isRequired={true} />
        <SelectButtonsGroup
          titles={['필수 아님', '예약 필수']}
          selected={resvRequired}
          onSelect={handleReservationRequiredSelect}
        />
        <TextInputWithSvgIconInRight
          label={'이용 가능 연령'}
          value={selectedAge}
          onIconPress={handleAgePresentModal}
          IconComponent={<DownSvg />}
          isRequired={true}
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
          selected={entranceRequired ? '있음' : '없음'}
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
        />
        <RequiredTextLabel label={'주차 가능 여부'} isRequired={true} />
        <SelectButtonsGroup
          titles={['주차 불가', '주차 가능']}
          selected={parkingAvailability}
          onSelect={handleParkingAvailabilitySelect}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  purpleInfo: {
    backgroundColor: globalColors.purpleLight,
    padding: 10,
    borderRadius: 10,
    // 기타 필요한 스타일
  },
  introduceInput: {
    height: 100, // 입력 필드의 높이
    borderWidth: 1,
    borderColor: globalColors.warmGray, // 테두리 색상
    borderRadius: 15, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
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
