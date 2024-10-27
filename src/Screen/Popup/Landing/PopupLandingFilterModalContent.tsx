import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CategorySelectButton from './category.select.button';
import {BackMiddleButton, NextMiddleButton} from './back.middle.button';
import {usePopupScreenStore} from './Popup.landing.zustand';
import {BlankPreference} from 'src/Schema/Preference/preference.schema';
import {themeColors} from 'src/Theme/theme';
import CommonCompleteButton from './common.complete.button';

interface PopupLandingFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}
const PopupLandingFilterModal: React.FC<PopupLandingFilterModalProps> = ({
  onClose,
  onApply,
  onReset,
}) => {
  const {setSelectedCategories, setSelectedPopupStores} = usePopupScreenStore();
  const [preferenceCategory, setPreferenceCategory] = useState(
    BlankPreference.preferenceCategory,
  );
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
    const categoryString = categoryKeys
      .map(key =>
        preferenceCategory[key as keyof typeof preferenceCategory] ? '1' : '0',
      )
      .join('');
    const popupStoreString = popupStoreKeys
      .map(key =>
        preferencePopupStore[key as keyof typeof preferencePopupStore]
          ? '1'
          : '0',
      )
      .join('');

    setSelectedCategories(categoryString);
    setSelectedPopupStores(popupStoreString);
    onApply();
    onClose();
  };

  return (
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backgroundTouchable} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={[styles.title, {marginTop: 30}]}>
          찾고 싶은 팝업의 카테고리를 선택해 주세요
        </Text>

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
            title="필터 적용하기"
            onPress={handleApplyFilter}
            style={{width: '60%'}}
            disabled={!isOneSelected}
          />
        </View>
      </View>
    </View>
  );
};

export default PopupLandingFilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    maxHeight: '90%',
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
    marginTop: 20,
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
