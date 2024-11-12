import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CategorySelectButton from '../Screen/Popup/Landing/category.select.button';
import {
  BackMiddleButton,
  NextMiddleButton,
} from '../Screen/Popup/Landing/back.middle.button';
import {usePopupScreenStore} from '../Screen/Popup/Landing/Popup.landing.zustand';
import {BlankPreference} from 'src/Schema/Preference/preference.schema';
import {themeColors} from 'src/Theme/theme';
import CommonCompleteButton from '../Screen/Popup/Landing/common.complete.button';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components/native';

interface PopupCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => void;
  buttonName: string;
  onReset: () => void;
  validationMode: 'both' | 'any';
  isPopupRequestModal?: boolean;
}

const PopupCategoryModal: React.FC<PopupCategoryModalProps> = ({
  onClose,
  onApply,
  onReset,
  buttonName,
  validationMode = 'any',
  isPopupRequestModal = false,
}) => {
  const [preferenceCategory, setPreferenceCategory] = useState(
    BlankPreference.preferenceCategory,
  );
  const [preferencePopupStore, setPreferencePopupStore] = useState(
    BlankPreference.preferencePopupStore,
  );
  const [isValidSelection, setIsValidSelection] = useState(false);

  const popupStoreKeys = ['market', 'display', 'experience'];
  const categoryKeys = [
    'fashionBeauty',
    'characters',
    'foodBeverage',
    'webtoonAni',
    'interiorThings',
    'movie',
    'musical',
    'sports',
    'game',
    'itTech',
    'kpop',
    'alcohol',
    'animalPlant',
    'guitar',
  ];

  useEffect(() => {
    const hasCategory = Object.values(preferenceCategory).some(value => value);
    const hasPopupType = Object.values(preferencePopupStore).some(
      value => value,
    );

    // 하나라도 선택되어 있다면 버튼을 활성화
    setIsValidSelection(hasCategory || hasPopupType);
  }, [preferenceCategory, preferencePopupStore]);

  const toggleCategory = (
    key: keyof typeof BlankPreference.preferenceCategory,
  ) => {
    if (isPopupRequestModal) {
      // 모든 카테고리를 false로 설정하고, 현재 클릭한 카테고리만 토글 (단일 선택)
      setPreferenceCategory(prev => ({
        ...Object.keys(prev).reduce((acc, cur) => {
          acc[cur as keyof typeof BlankPreference.preferenceCategory] = false;
          return acc;
        }, {} as typeof BlankPreference.preferenceCategory),
        [key]: !prev[key],
      }));
    } else {
      // 현재 클릭한 카테고리만 토글 (다중 선택)
      setPreferenceCategory(prev => ({...prev, [key]: !prev[key]}));
    }
  };

  const togglePopupStoreType = (
    key: keyof typeof BlankPreference.preferencePopupStore,
  ) => {
    setPreferencePopupStore(prev => ({...prev, [key]: !prev[key]}));
  };

  const handleApplyFilter = () => {
    //TODO- [규진] 여러 군데에서 쓸 수 있게끔 확장성 고려하면서 수정해야 함.
    // 선택된 카테고리만 필터링하여 배열로 생성
    const selectedCategories = categoryKeys
      .filter(key => preferenceCategory[key as keyof typeof preferenceCategory])
      .map(key => key);

    // 선택된 팝업 스토어 타입만 필터링하여 배열로 생성
    const selectedPopupTypes = popupStoreKeys
      .filter(
        key => preferencePopupStore[key as keyof typeof preferencePopupStore],
      )
      .map(key => key);

    console.log('selectedCategories', selectedCategories);
    console.log('selectedPopupTypes', selectedPopupTypes);
    // setSelectedCategories(categoryString);
    // setSelectedPopupStores(popupStoreString);
    onApply({
      selectedCategories: selectedCategories,
      selectedPopupTypes: selectedPopupTypes,
    });
    onClose();
  };

  return (
    <ModalOverlay>
      <TouchableWithoutFeedback onPress={onClose}>
        <BackgroundTouchable />
      </TouchableWithoutFeedback>
      <ModalContent>
        <CategoryTitle type="category">
          팝업 카테고리
          {validationMode === 'both' && <RequiredMark> *</RequiredMark>}
        </CategoryTitle>
        <SelectionContainer>
          {categoryKeys.map(key => (
            <CategorySelectButton
              key={key}
              preferenceKey={key}
              isSelected={
                !!preferenceCategory[key as keyof typeof preferenceCategory]
              }
              onPress={() =>
                toggleCategory(key as keyof typeof preferenceCategory)
              }
            />
          ))}
        </SelectionContainer>

        {!isPopupRequestModal && (
          <>
            <CategoryTitle type="type">
              팝업 유형
              {validationMode === 'both' && <RequiredMark> *</RequiredMark>}
            </CategoryTitle>
            <SelectionContainer>
              {popupStoreKeys.map(key => (
                <CategorySelectButton
                  key={key}
                  preferenceKey={key}
                  isSelected={
                    !!preferencePopupStore[
                      key as keyof typeof preferencePopupStore
                    ]
                  }
                  onPress={() =>
                    togglePopupStoreType(
                      key as keyof typeof preferencePopupStore,
                    )
                  }
                />
              ))}
            </SelectionContainer>
          </>
        )}

        <ButtonsWrapper>
          <BackMiddleButton
            title="초기화"
            onPress={() => {
              setPreferenceCategory(BlankPreference.preferenceCategory);
              setPreferencePopupStore(BlankPreference.preferencePopupStore);
              onReset();
            }}
            style={{marginRight: 10}}
          />
          <NextMiddleButton
            title={buttonName}
            onPress={handleApplyFilter}
            style={{width: '60%'}}
            disabled={!isValidSelection}
          />
        </ButtonsWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
export default PopupCategoryModal;
const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackgroundTouchable = styled.View`
  flex: 1;
`;

const ModalContent = styled.View`
  background-color: white;
  padding: 20px 16px;
  max-height: 100%;
`;

const CategoryTitle = styled.Text<{type: 'category' | 'type'}>`
  font-size: 16px;
  text-align: center;
  color: ${props =>
    props.type === 'category'
      ? props.theme.color.purple.main
      : props.theme.color.blue.main};
`;

const RequiredMark = styled.Text`
  color: red;
`;

const SelectionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;

const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;
