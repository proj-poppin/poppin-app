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

function FindPopupTab({type}: any) {
  // const [selectedTags, setSelectedTags] = useState<TFilter[]>(POPUUP_TYPES);

  // const [isSettingApplied, setIsSettingApplied] = useState(false);
  // const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
  //   useState(false);
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // useEffect(() => {
  //   const isSelected = selectedTags.some(tag => tag.selected);
  //   setIsOneMoreCategorySelected(isSelected);
  // }, [selectedTags]);

  return (
    <ScrollView>
      <DividerLine height={1} />
      {dummydata.map(item => {
        return <FindCard type={type} key={item.id} item={item} />;
      })}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default FindPopupTab;

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
