import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import LabelAndInputWithCloseSvg from '../LabelAndInputWithCloseSvg.tsx';
import TextInputWithSvgIconInRight from '../TextInputWithSvgIconInRight.tsx';
import RequiredTextLabel from '../RequiredTextLabel.tsx';
import OperationCalendarBottomSheet from '../OperationCalendarBottomSheet.tsx';
import OperationHoursBottomSheet from '../OperationHoursBottomSheet.tsx';
import Text12R from '../../styles/texts/label/Text12R.ts';
import ImageContainerRow from '../ImageContainerRow.tsx';
import CompleteButton from '../button/CompleteButton.tsx';
import DownSvg from '../../assets/icons/down.svg';
import Text12M from '../../styles/texts/label/Text12M.ts';
import CategorySelectButton from '../Button/⭐\uFE0FCategorySelectButton.tsx';
import {POP_UP_TYPES, TFilter} from '../findPopup/constants.ts';
import DismissKeyboardView from '../DismissKeyboardView.tsx';
import {requestGalleryPermissions} from '../../utility/function/requestGalleryPermission.ts';

interface StepTwoProps {
  name: string;
  setName: (text: string) => void;
  selectedCategory: string;
  selectedCategoryValue: string; // Add this prop to store internal value
  handlePresentModal: () => void;
  onSelectSingleOption: (option: TFilter) => void; // Update type to TFilter
  selectedPopupType: string[];
  setSelectedPopupType: (value: string[]) => void;
  selectedPopupTypeTags: TFilter[];
  setSelectedPopupTypeTags: (value: TFilter[]) => void;
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
  selectedCategoryValue, // Add this prop to access internal value
  handlePresentModal,
  onSelectSingleOption,
  selectedPopupType,
  setSelectedPopupType,
  selectedPopupTypeTags,
  setSelectedPopupTypeTags,
  selectedDates,
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
  const [nameLength, setNameLength] = useState(0);
  const [operationExceptLength, setOperationExceptLength] = useState(0);
  const [addressDetailLength, setAddressDetailLength] = useState(0);
  const [homepageLinkLength, setHomepageLinkLength] = useState(0);

  const handleSelectImagesWithPermission = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
      Alert.alert(
        '갤러리 접근 권한 요청',
        '팝핀에서 제보하기 기능 사용시 필요한 사진 첨부 기능 사용을 위해 사진 라이브러리 접근 권한 동의가 필요합니다. 설정에서 이를 변경할 수 있습니다.',
        [
          {text: '다음에 하기', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }
    handleSelectImages();
  };

  const handlePopupTypeClick = (selectedTag: TFilter) => {
    setSelectedPopupTypeTags(prev => {
      const exists = prev.find(item => item.id === selectedTag.id);
      if (exists) {
        return prev.filter(item => item.id !== selectedTag.id);
      } else {
        return [...prev, selectedTag];
      }
    });

    setSelectedPopupType(prev => {
      const exists = prev.includes(selectedTag.name);
      if (exists) {
        return prev.filter(item => item !== selectedTag.name);
      } else {
        return [...prev, selectedTag.name];
      }
    });
  };

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

  const tagDeleteClick = (tid: number) => {
    setSelectedTags(prev =>
      prev.map(item => (item.id === tid ? {...item, selected: false} : item)),
    );
  };

  return (
    <DismissKeyboardView>
      <View style={styles.purpleInfo}>
        <Text style={[Text18B.text, {color: globalColors.purple}]}>
          📝팝업의 기본 정보를 알려주세요
        </Text>
      </View>
      <View style={[{paddingHorizontal: 10}, {paddingVertical: 10}]}>
        <LabelAndInputWithCloseSvg
          label={'팝업이름'}
          value={name}
          onChangeText={text => {
            setName(text);
            setNameLength(text.length);
          }}
          isRequired={true}
          maxLength={30}
        />
        <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
          {nameLength}/30
        </Text>
        <TextInputWithSvgIconInRight
          label={'카테고리'}
          value={selectedCategory}
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
        <View style={styles.popupTypeContainer}>
          {availableTags.slice(14, 17).map(item => (
            <CategorySelectButton
              key={item.id}
              item={item}
              onClick={handlePopupTypeClick}
              isMultipleNeeded={true}
              selectedTag={selectedPopupTypeTags}
            />
          ))}
        </View>
        <RequiredTextLabel label={'운영 기간'} isRequired={true} />
        <OperationCalendarBottomSheet
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
        />
        <RequiredTextLabel label={'운영 시간'} isRequired={true} />
        <OperationHoursBottomSheet
          setOperationTimes={setOperationTimes}
          operationTimes={operationTimes}
        />
        <RequiredTextLabel label={'운영시간 외 예외사항'} isRequired={false} />
        <TextInput
          style={styles.exceptionalInput}
          value={operationExcept}
          onChangeText={text => {
            setOperationExcept(text);
            setOperationExceptLength(text.length);
          }}
          placeholder="운영 시간 외 예외사항이 있다면 작성해 주세요.\nex) 마지막 날에는 5시에 조기 마감"
          multiline={true}
          maxLength={100}
        />

        <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
          {operationExceptLength}/100
        </Text>
        <RequiredTextLabel label={'주소'} isRequired={true} />
        <View style={styles.addressContainer}>
          <View
            style={[styles.addressInputContainer, {flex: 7, marginRight: 10}]}>
            <TextInput
              style={styles.input}
              value={address}
              placeholder="주소"
              editable={false}
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
            onChangeText={text => {
              setAddressDetail(text);
              setAddressDetailLength(text.length);
            }}
            placeholder="상세주소 입력(필수)"
            maxLength={30}
          />
          <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
            {addressDetailLength}/30
          </Text>
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
                    isMultipleNeeded={false}
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                    selectedTag={selectedCategory}
                  />
                ))}
              </View>
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
          onChangeText={text => {
            setHomepageLink(text);
            setHomepageLinkLength(text.length);
          }}
          isRequired={true}
          maxLength={300}
        />
        <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
          {homepageLinkLength}/300
        </Text>
        <RequiredTextLabel label={'관련사진'} isRequired={true} />
        <ImageContainerRow
          selectedImages={selectedImages}
          handleSelectImages={handleSelectImagesWithPermission}
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
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  popupTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -5,
  },
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
  },
  exceptionalInput: {
    height: 60,
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
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
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
});
export default StepTwo;
