import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import DismissKeyboardView from '../../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../../components/atoms/button/CompleteButton.tsx';
import PreferenceOptionButtons from '../../../components/PreferenceOptionButtons.tsx';
import CustomOKModal from '../../../components/CustomOKModal.tsx';
import Text20B from '../../../styles/texts/title/Text20B.ts';
import Text12R from '../../../styles/texts/label/Text12R.ts';
import { POP_UP_TYPES,TFilter } from "./types.ts"
import CategorySelectButton from '../../../components/findPopup/CategorySelectButton.tsx';
import { useSelector } from 'react-redux';
import usePreferenceSetting from '../../../hooks/password/usePreferenceSetting.tsx';
import useGetPreferenceSetting from '../../../hooks/password/useGetPreferenceSetting.tsx.tsx';

function PreferenceSettingScreen({ navigation }: any) {
    const user = useSelector(state => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [availableTags, setAvailableTags] = useState<TFilter[]>(POP_UP_TYPES);
    const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
    const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
      useState(false);
  const { data } = useGetPreferenceSetting()
  console.log("data",data)
  const {resetPreference} = usePreferenceSetting();

  const [selections, setSelections] = useState({
    type: [],
    interest: [],
    mate: [],
  });

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // 각 단계에 맞는 제목 렌더링 함수
  // const renderTitleForStep = step => {
  //   switch (step) {
  //     case 1:
  //       return '팝업 유형';
  //     case 2:
  //       return '관심사';
  //     case 3:
  //       return '팝업 MATE';
  //     default:
  //       return '';
  //   }
  // };
  // // 옵션 선택 처리 함수
  // const handleSelectOption = (option, step) => {
  //   setSelections(prevSelections => {
  //     const newSelections = {...prevSelections};
  //     switch (step) {
  //       case 1:
  //         // 타입 선택 업데이트
  //         const typeIndex = newSelections.type.indexOf(option);
  //         if (typeIndex === -1) {
  //           newSelections.type = [option]; // 예시 코드에서는 단일 선택만을 가정합니다.
  //         } else {
  //           newSelections.type = [];
  //         }
  //         break;
  //       case 2:
  //         // 관심사 선택 업데이트
  //         const interestIndex = newSelections.interest.indexOf(option);
  //         if (interestIndex === -1) {
  //           newSelections.interest.push(option);
  //         } else {
  //           newSelections.interest.splice(interestIndex, 1);
  //         }
  //         break;
  //       case 3:
  //         // 메이트 선택 업데이트
  //         const mateIndex = newSelections.mate.indexOf(option);
  //         if (mateIndex === -1) {
  //           newSelections.mate = [option]; // 예시 코드에서는 단일 선택만을 가정합니다.
  //         } else {
  //           newSelections.mate = [];
  //         }
  //         break;
  //       default:
  //         // 기타 경우 처리
  //         break;
  //     }
  //     return newSelections;
  //   });
  // };

  // 디버깅용 로그
  // useEffect(() => {
  //   console.log(
  //     `Type Selected: ${selections.type.length}, Interest Selected: ${selections.interest.length}, Mate Selected: ${selections.mate}`,
  //   );
  // }, [selections]);
  // 모든 카테고리에서 최소 하나의 옵션이 선택되었는지 확인
  // const isButtonDisabled = Object.values(selections).some(
  //   value => value.length === 0,
  // );
    

  const handleClick = (selectedTag: TFilter) => {
    setSelectedTags(prev =>
      prev.map(item =>
        item.id === selectedTag.id ? {...item, selected: !item.selected} : item,
      ),
    );
  };

  const tagDeleteClick = (tid: number) => {
    setSelectedTags(prev =>
      prev.map(item => (item.id === tid ? {...item, selected: false} : item)),
    );
  };

  const checkSelectionInRanges = (tags:any) => {
    const range1 = tags.slice(0, 13); // id 1-13
    const range2 = tags.slice(13, 17); // id 14-17
    const range3 = tags.slice(17, 21); // id 18-21

    const isRange1Selected = range1.some((tag:any) => tag.selected);
    const isRange2Selected = range2.some((tag:any)  => tag.selected);
    const isRange3Selected = range3.some((tag:any)  => tag.selected);

    return isRange1Selected && isRange2Selected && isRange3Selected;
  };

  useEffect(() => {
    const isSelected = checkSelectionInRanges(selectedTags);
    setIsOneMoreCategorySelected(isSelected);
  }, [selectedTags]);
 

  return (
    <DismissKeyboardView style={styles.container}>
      <View>
        <Text style={[Text20B.text, {marginTop: 20,  marginBottom: 10}]}>
          <Text style={{color: globalColors.blue}}>{user.nickname}</Text>
          <Text>{'님의 팝업 취향을'}</Text>
        </Text>
        <View style={styles.selectionRow}>
          <Text style={[Text20B.text, {marginBottom: 10}]}>
            {'선택해주세요'}
          </Text>
          <Text style={[Text12R.text, {marginLeft: 4, marginTop: 7}]}>
            {'(카테고리 당 1개 이상 필수 선택)'}
          </Text>
        </View>
        </View>
            <Text style={styles.popCat}>팝업 유형</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(13, 17).map(item => (
                <CategorySelectButton
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  // selected={item.selected}
                  tagDeleteClick={tagDeleteClick}
                />
              ))}
          </View>
           <Text style={styles.popCat}>관심사</Text>
           <View style={styles.popWrapper}>
            {selectedTags.slice(0, 13).map(item => (
                <CategorySelectButton
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  // selected={item.selected}
                  tagDeleteClick={tagDeleteClick}
                />
              ))}
      </View>
       <Text style={styles.popCat}>MATE</Text>
           <View style={styles.popWrapper}>
            {selectedTags.slice(17, POP_UP_TYPES.length).map(item => (
                <CategorySelectButton
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  // selected={item.selected}
                  tagDeleteClick={tagDeleteClick}
                />
              ))}
            </View>
      {/* {[1, 2, 3].map(step => (
        <View key={step}>
          <Text style={[Text20B.text, {marginTop: 20, marginBottom: 10}]}>
            {renderTitleForStep(step)}
          </Text>
          <PreferenceOptionButtons
            step={step}
            onSelectOption={(option, index) => handleSelectOption(option, step)}
          />
        </View>
      ))} */}
      <CompleteButton
        onPress={() => setModalVisible(true)}
        title={'설정 저장하기'}
        disabled={!isOneMoreCategorySelected}
      />
      <CustomOKModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        isSuccessModal={true}
        mainTitle="취향설정이 완료됐어요."
      />
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom:20   
  },
  popCat: {
    fontSize: 18,
    fontWeight:"600"
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
    color: globalColors.blue,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default PreferenceSettingScreen;
