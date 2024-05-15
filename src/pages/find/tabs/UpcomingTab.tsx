import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import CustomSelectDropdown from '../../../components/CustomDropDown.tsx';
import OrderSvg from '../../../assets/icons/order.svg';
import Text14M from '../../../styles/texts/body_medium/Text14M.ts';
import {dummydata} from '../../../components/findPopup/dummydata.ts';
import {POPUUP_TYPES} from '../../../components/findPopup/constants.ts';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import CategorySelectButton from '../../../components/findPopup/CategorySelectButton.tsx';
import FilterSettingButton from '../../../components/atoms/button/FilterSettingButton.tsx';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import globalColors from '../../../styles/color/globalColors.ts';
import NextMiddleButton from '../../../components/atoms/button/NextMiddleButton.tsx';
import BackMiddleButton from '../../../components/atoms/button/BackMiddleButton.tsx';
import {findOrderTypes} from '../FindScreen.tsx';

type TFilter = {id: number; name: string; selected: boolean};

function UpcomingTab({onOrderSelect, onCategoryClick, availableTags}: any) {
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
  const [isSettingApplied, setIsSettingApplied] = useState(false);
  const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
    useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  console.log('hi222');

  useEffect(() => {
    const isSelected = selectedTags.some(tag => tag.selected);
    setIsOneMoreCategorySelected(isSelected);
  }, [selectedTags]);

  // variables
  const snapPoints = useMemo(() => ['77%'], []);

  const handlePresentModal = useCallback((action: () => void) => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClick = (tid: number) => {
    setSelectedTags(prev => {
      return prev.map(item => {
        if (item.id === tid) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
    });
  };
  const tagDeleteClick = (tid: number) => {
    setSelectedTags(prev => {
      return prev.map(item => {
        if (item.id === tid) {
          return {...item, selected: false};
        } else {
          return item;
        }
      });
    });
  };
  // 화면클릭시 모달 내려감
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.headerContainer}>
          <FilterSettingButton
            onPress={handlePresentModal}
            isSetting={isSettingApplied}
          />
          <CustomSelectDropdown
            data={findOrderTypes}
            onSelect={(selectedItem: any, index: any) =>
              console.log(selectedItem, index)
            }
            buttonWidth={120}
            iconComponent={<OrderSvg style={styles.dropdownIcon} />}
            buttonTextAfterSelection={(selectedItem: any, index: any) =>
              selectedItem
            }
            buttonTextStyle={Text14M.text}
          />
        </View>
        <DividerLine height={1} />
        {dummydata.map(item => {
          return <FindCard type="close" key={item.id} item={item} />;
        })}
        <DividerLine height={1} />
      </ScrollView>
      <View style={styles.modalContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={styles.popupTitle}>
              찾고 싶은 팝업의 카테고리를 선택해 주세요
            </Text>
            <Text style={styles.popCat}>팝업 카테고리</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(0, 14).map(item => {
                return (
                  <CategorySelectButton
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              })}
            </View>
            <Text style={styles.popType}>팝업 유형</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(14, POPUUP_TYPES.length).map(item => {
                return (
                  <CategorySelectButton
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              })}
            </View>
          </View>
          <DividerLine height={2} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.popSelectedWrapper}>
              {selectedTags.map(tag => {
                if (tag.selected) {
                  return (
                    <CategorySelectButton
                      onClick={() => {}}
                      tagDeleteClick={tagDeleteClick}
                      selected
                      item={tag}
                    />
                  );
                }
                return null;
              })}
            </View>
          </ScrollView>
          <View style={styles.buttonsWrapper}>
            <BackMiddleButton
              onPress={() => {}}
              title={'초기화'}
              buttonWidth={'30%'}
            />
            <NextMiddleButton
              onPress={() => {
                setIsSettingApplied(true);
                bottomSheetModalRef.current?.close();
              }}
              disabled={!isOneMoreCategorySelected}
              title={'필터 적용하기'}
            />
          </View>
        </BottomSheetModal>
      </View>
    </>
  );
}

export default UpcomingTab;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 0,
    marginLeft: 16,
    marginRight: 16,
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  popCat: {
    textAlign: 'center',
    fontSize: 15,
    color: '#C37CD2',
  },
  popWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    justifyContent: 'center',
  },
  popType: {
    color: '#0EB5F9',
    textAlign: 'center',
    fontSize: 15,
  },
  diverLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  sumbmitButton: {
    color: 'white',
    fontSize: 18,
  },
  popSelectedWrapper: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  buttonsWrapper: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  resetButton: {
    width: '35%',
    height: '40%',
    borderWidth: 1,
    borderColor: globalColors.blue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: '55%',
    height: '40%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.blue,
  },
  resetText: {
    color: 'gray',
    fontSize: 18,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
});
