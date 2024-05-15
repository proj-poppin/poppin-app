import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import {dummydata} from '../../../components/findPopup/dummydata.ts';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

function FindPopupTab({type}: any) {
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
