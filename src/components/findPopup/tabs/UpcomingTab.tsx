import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import DividerLine from '../../DividerLine.tsx';
import CustomSelectDropdown from '../../CustomDropDown.tsx';
import OrderSvg from '../../../assets/icons/order.svg';
import Text14M from '../../../styles/texts/body_medium/Text14M.ts';
import {dummydata} from '../dummydata.ts';
import {POPUUP_TYPES, findOrderTypes} from '../constants.ts';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import BottomSheetModal, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import PopupTag from '../../../components/findPopup/PopupTag.tsx';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import FilterSettingButton from '../../atoms/button/FilterSettingButton.tsx';

type TFilter = {id: number; name: string; selected: boolean};

function UpcomingTab() {
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(POPUUP_TYPES);

  const toggleBackdrop = () => {
    setBackdropVisible(!backdropVisible);
    // if (bottomSheetRef.current) {
    //   if (backdropVisible) {
    //     bottomSheetRef.current.snapTo(0); // 바텀 시트 닫기
    //   } else {
    //     bottomSheetRef.current.snapTo(0.6); // 바텀 시트 열기 (화면의 반 정도 차지)
    //   }
    // }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['98%'], []);

  // callbacks
  const handlePresentModal = useCallback((action: () => void) => {
    // present()라는 함수가 없다고 나와서 -> expand()함수로 대체함
    bottomSheetModalRef.current?.expand();
    // bottomSheetModalRef.current?.present();
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
  const tagDeletClick = (tid: number) => {
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
          <FilterSettingButton onPress={handlePresentModal} />
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
          return <FindCard key={item.id} item={item} />;
        })}

        <DividerLine height={1} />
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.popupTitle}>
            찾고 싶은 팝업의 카테고리를 선택해 주세요
          </Text>
          <View>
            <Text style={styles.popCat}>팝업 카테고리</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(0, 14).map(item => {
                return (
                  <PopupTag key={item.id} item={item} onClick={handleClick} />
                );
              })}
            </View>
            <Text style={styles.popType}>팝업 유형</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(14, POPUUP_TYPES.length).map(item => {
                return (
                  <PopupTag key={item.id} item={item} onClick={handleClick} />
                );
              })}
            </View>
          </View>
          <View style={styles.diverLine}></View>
          <View style={styles.popSelectedWrapper}>
            {selectedTags.map(tag => {
              if (tag.selected) {
                return (
                  <PopupTag tagDeletClick={tagDeletClick} selected item={tag} />
                );
              }
              return null;
            })}
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={styles.resetButton}>
              <Text style={styles.resetText}>초기화</Text>
            </View>

            <View style={styles.filterButton}>
              <Text style={styles.sumbmitButton}>필터 적용하기</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default UpcomingTab;

const styles = StyleSheet.create({
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
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 15,
  },
  resetButton: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#0EB5F9',
    borderStyle: 'solid',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: '50%',
    height: 50,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EB5F9',
  },
  resetText: {
    color: 'gray',
    fontSize: 18,
  },
});
