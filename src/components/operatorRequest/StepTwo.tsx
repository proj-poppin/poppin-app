import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import LabelAndInputWithCloseSvg from '../LabelAndInputWithCloseSvg.tsx';
import TextInputWithSvgIconInRight from '../TextInputWithSvgIconInRight.tsx';
import RequiredTextLabel from '../RequiredTextLabel.tsx';
import PopupTypeOptions from '../PopUpTypeOptions.tsx';
import OperationCalendarBottomSheet from '../OperationCalendarBottomSheet.tsx';
import OperationHoursBottomSheet from '../OperationHoursBottomSheet.tsx';
import Text12R from '../../styles/texts/label/Text12R.ts';
import ImageContainerRow from '../ImageContainerRow.tsx';
import PreferenceOptionButtons from '../PreferenceOptionButtons.tsx';
import CompleteButton from '../atoms/button/CompleteButton.tsx';
import DownSvg from '../../assets/icons/down.svg';
import Text12M from '../../styles/texts/label/Text12M.ts';
import CategorySelectButton from '../findPopup/CategorySelectButton.tsx';
import {POP_UP_TYPES, TFilter} from '../findPopup/constants.ts';

interface StepTwoProps {
  name: string;
  setName: (text: string) => void;
  selectedCategory: string;
  handlePresentModal: () => void;
  onSelectSingleOption: (option: string) => void;
  selectedPopupType: string;
  onSelectPopupType: (value: string) => void;
  selectedDates: {start: string; end: string};
  setSelectedDates: (dates: {start: string; end: string}) => void;
  operationTimes: {start: string; end: string};
  setOperationTimes: (times: {start: string; end: string}) => void;
  operationExcept: string;
  setOperationExcept: (text: string) => void;
  address: string;
  handlePostalCodeSearch: () => void;
  addressDetail: string;
  setAddressDetail: (text: string) => void;
  homepageLink: string;
  setHomepageLink: (text: string) => void;
  selectedImages: any[];
  handleSelectImages: () => void;
  handleRemoveImage: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  snapPoints: string[];
  handleSheetChanges: (index: number) => void;
  renderBackdrop: any;
  handleConfirmSelection: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  name,
  setName,
  selectedCategory,
  handlePresentModal,
  onSelectSingleOption,
  selectedPopupType,
  onSelectPopupType,
  setSelectedDates,
  operationTimes,
  setOperationTimes,
  operationExcept,
  setOperationExcept,
  address,
  handlePostalCodeSearch,
  addressDetail,
  setAddressDetail,
  homepageLink,
  setHomepageLink,
  selectedImages,
  handleSelectImages,
  handleRemoveImage,
  bottomSheetModalRef,
  snapPoints,
  handleSheetChanges,
  renderBackdrop,
  handleConfirmSelection,
}) => {
  const [availableTags, setAvailableTags] = useState<TFilter[]>(POP_UP_TYPES);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
  const handleClick = (selectedTag: TFilter) => {
    setSelectedTags(prev =>
      prev.map(item =>
        item.id === selectedTag.id
          ? {...item, selected: true}
          : {...item, selected: false},
      ),
    );
  };

  const tagDeleteClick = (tid: number) => {
    setSelectedTags(prev =>
      prev.map(item => (item.id === tid ? {...item, selected: false} : item)),
    );
  };
  return (
    <>
      <View style={styles.purpleInfo}>
        <Text style={[Text18B.text, {color: globalColors.purple}]}>
          📝팝업의 기본 정보를 알려주세요
        </Text>
      </View>
      <View style={[{paddingHorizontal: 10}, {paddingVertical: 10}]}>
        <LabelAndInputWithCloseSvg
          label={'팝업이름'}
          value={name}
          onChangeText={setName}
          isRequired={true}
        />
        <TextInputWithSvgIconInRight
          label={'카테고리'}
          value={selectedCategory} // 변경됨
          onIconPress={handlePresentModal}
          IconComponent={<DownSvg />}
          isRequired={true}
          isClickableTextInput={true}
        />
        <View style={{flexDirection: 'row'}}>
          <RequiredTextLabel label={'팝업유형'} isRequired={true} />
          <Text
            style={[
              Text12M.text,
              {color: globalColors.blue},
              {marginLeft: 15, marginTop: 5},
            ]}>
            {'*복수 선택 가능'}
          </Text>
        </View>
        <PopupTypeOptions
          onSelectOption={onSelectPopupType}
          selectedPopUpType={selectedPopupType}
        />
        <RequiredTextLabel label={'운영 기간'} isRequired={true} />
        <OperationCalendarBottomSheet setSelectedDates={setSelectedDates} />
        <RequiredTextLabel label={'운영 시간'} isRequired={true} />
        <OperationHoursBottomSheet
          setOperationTimes={setOperationTimes}
          operationTimes={operationTimes}
        />
        <RequiredTextLabel label={'운영시간 외 예외사항'} isRequired={false} />
        <TextInput
          style={styles.exceptionalInput}
          value={operationExcept}
          onChangeText={setOperationExcept}
          placeholder={
            '운영 시간 외 예외사항이 있다면 작성해 주세요.\nex) 마지막 날에는 5시에 조기 마감'
          }
          multiline={true}
        />
        <RequiredTextLabel label={'주소'} isRequired={true} />
        <View style={styles.addressContainer}>
          <View
            style={[styles.addressInputContainer, {flex: 7, marginRight: 10}]}>
            <TextInput
              style={styles.input}
              value={address} // 우편번호 검색을 통해 선택된 주소를 표시
              placeholder="주소"
              editable={false} // 우편번호는 사용자가 직접 수정할 수 없도록 설정
            />
          </View>
          <TouchableOpacity
            style={[styles.searchButton, {flex: 3}]}
            onPress={handlePostalCodeSearch}>
            <Text style={styles.searchButtonText}>우편번호 검색</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            value={addressDetail}
            onChangeText={setAddressDetail}
            placeholder="상세주소 입력"
          />
        </View>
        <View style={styles.modalContainer}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
                제보할 팝업의 카테고리를 설정해 주세요
              </Text>
              <View style={styles.popWrapper}>
                {selectedTags.slice(0, 14).map(item => (
                  <CategorySelectButton
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                    // selected={item.selected}
                    tagDeleteClick={tagDeleteClick}
                  />
                ))}
              </View>
              {/*<PreferenceOptionButtons*/}
              {/*  step={2}*/}
              {/*  onSelectOption={onSelectSingleOption}*/}
              {/*  isEmojiRemoved={true}*/}
              {/*  isSingleSelect={true}*/}
              {/*  selectedCategory={selectedCategory}*/}
              {/*/>*/}
              <CompleteButton
                onPress={handleConfirmSelection}
                title={'확인'}
                buttonWidth={'90%'}
              />
            </View>
          </BottomSheetModal>
        </View>
        <LabelAndInputWithCloseSvg
          label={'공식 사이트 주소'}
          value={homepageLink}
          onChangeText={setHomepageLink}
          isRequired={true}
        />
        <RequiredTextLabel label={'관련사진'} isRequired={true} />
        <ImageContainerRow
          selectedImages={selectedImages}
          handleSelectImages={handleSelectImages}
          handleRemoveImage={handleRemoveImage}
        />
        <Text
          style={[
            Text12R.text,
            {color: globalColors.font},
            {paddingVertical: 10},
          ]}>
          *첨부파일은 20MB 이하의 파일만 첨부 가능하며, 최대 5개까지 등록
          가능합니다.{'\n'}
          *올려주신 사진은 정보 업데이트시 사용될 수 있습니다.{'\n'}
          *사진은 팝업명과 내/외부 사진이 명확하게 나와야 합니다.{'\n'}
          *저품질의 사진은 정보 제공이 불가할 수 있습니다.{'\n'}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  popWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleInfo: {
    backgroundColor: globalColors.purpleLight,
    padding: 10,
    borderRadius: 10,
    // 기타 필요한 스타일
  },
  exceptionalInput: {
    height: 60, // 입력 필드의 높이
    borderWidth: 1,
    borderColor: globalColors.warmGray, // 테두리 색상
    borderRadius: 10, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressInputContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
  },
  searchButton: {
    flex: 3,
    backgroundColor: globalColors.blue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchButtonText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default StepTwo;
