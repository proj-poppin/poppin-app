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

interface PopupCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: {
    selectedCategories: string[];
    selectedPopupTypes: string[];
  }) => void;
  buttonName: string;
  onReset: () => void;
}
const PopupCategoryModal: React.FC<PopupCategoryModalProps> = ({
  onClose,
  onApply,
  onReset,
  buttonName,
}) => {
  const {setSelectedCategories, setSelectedPopupStores} = usePopupScreenStore();
  const [preferenceCategory, setPreferenceCategory] = useState(
    BlankPreference.preferenceCategory,
  );
  const [images, setImages] = useState(null);
  const [preferencePopupStore, setPreferencePopupStore] = useState(
    BlankPreference.preferencePopupStore,
  );
  const [isOneSelected, setIsOneSelected] = useState(false);

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
    setIsOneSelected(
      Object.values(preferenceCategory).some(value => value) ||
        Object.values(preferencePopupStore).some(value => value),
    );
  }, [preferenceCategory, preferencePopupStore]);

  const toggleCategory = (
    key: keyof typeof BlankPreference.preferenceCategory,
  ) => {
    setPreferenceCategory(prev => ({...prev, [key]: !prev[key]}));
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
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backgroundTouchable} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.subCategoryTitle}>팝업 카테고리</Text>
        <View style={styles.selectionContainer}>
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
        </View>

        <Text style={styles.subTypeTitle}>팝업 유형</Text>
        <View style={styles.selectionContainer}>
          {popupStoreKeys.map(key => (
            <CategorySelectButton
              key={key}
              preferenceKey={key}
              isSelected={
                !!preferencePopupStore[key as keyof typeof preferencePopupStore]
              }
              onPress={() =>
                togglePopupStoreType(key as keyof typeof preferencePopupStore)
              }
            />
          ))}
        </View>

        <View style={styles.buttonsWrapper}>
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
            disabled={!isOneSelected}
          />
        </View>
      </View>
    </View>
  );
};
export default PopupCategoryModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 16,
    maxHeight: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  subCategoryTitle: {
    fontSize: 15,
    color: themeColors().purple.main,
    textAlign: 'center',
  },
  subTypeTitle: {
    fontSize: 15,
    color: themeColors().blue.main,
    textAlign: 'center',
    marginTop: 20,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
});
