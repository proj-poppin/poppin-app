import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, FlatList} from 'react-native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';
import {moderateScale} from '../../../Util';
import CommonCompleteButton from '../../Popup/Landing/common.complete.button';
import CategorySelectButton from '../../Popup/Landing/category.select.button';
import {useUserStore} from '../../../Zustand/User/user.zustand';
import shallow from 'zustand/shallow';
import {useMypagePreferenceSettingScreenStore} from './Mypage.preferenceSetting.zustand';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
} from 'src/Object/preference.enum';
import {HomeLandingScreenProps} from 'src/Screen/Home/Landing/Home.landing.screen';

export type MypagePreferenceSettingScreenProps = {
  HomeLandingScreen: HomeLandingScreenProps;
};

// MypagePreferenceSettingScreen
// export interface MypagePreferenceSettingScreenProps {}
export const MypagePreferenceSettingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<MypagePreferenceSettingScreenProps>) => {
  const goBack = () => navigation.goBack();

  const {
    draftSelectedTags,
    toggleTag,
    resetTags,
    isAllCategoriesSelected,
    savePreferences,
  } = useMypagePreferenceSettingScreenStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {user} = useUserStore(state => ({user: state.user}), shallow);

  // 버튼 활성화 여부 업데이트
  useEffect(() => {
    setIsButtonDisabled(!isAllCategoriesSelected());
  }, [draftSelectedTags, isAllCategoriesSelected]);

  // 화면 진입/이탈 시 초기화
  useFocusEffect(
    React.useCallback(() => {
      resetTags(); // draft 상태를 저장된 상태로 초기화
    }, [resetTags]),
  );

  const handleSubmit = async () => {
    const success = await savePreferences();
    if (success) {
      Alert.alert(
        '알림',
        '설정이 성공적으로 저장되었습니다!',
        [
          {
            text: '확인',
            onPress: () => navigation.navigate('HomeLandingScreen', {}),
          },
        ],
        {cancelable: false},
      );
    } else {
      goBack(); // 이전 화면으로 이동
      // alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const categories = [
    {
      title: '팝업 유형',
      keys: preferenceKeysForPopupCategory,
    },
    {
      title: '관심사',
      keys: preferenceKeysForPopupInterest,
    },
    {
      title: '팝업 MATE',
      keys: preferenceKeysForPopupMate,
    },
  ];

  const renderCategory = ({item}: {item: {title: string; keys: string[]}}) => (
    <CategoryContainer>
      <CategoryTitleTextRow>
        <CategoryTitleText>{item.title}</CategoryTitleText>
        <CategorySubTitlePurpleText>
          1개 이상 선택해주세요
        </CategorySubTitlePurpleText>
      </CategoryTitleTextRow>
      <ButtonWrapper>
        {item.keys.map(key => (
          <CategorySelectButton
            key={key}
            preferenceKey={key}
            isSelected={draftSelectedTags[key]}
            onPress={() => toggleTag(key)}
          />
        ))}
      </ButtonWrapper>
    </CategoryContainer>
  );

  return (
    <Container>
      <ScreenHeader
        title="취향 설정하기"
        LeftComponents={'CLOSE_BUTTON'}
        onPressLeftComponent={goBack}
      />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.title}
        ListHeaderComponent={
          <TitleContainer>
            <TitleText>
              <NicknameBlueText>{user.nickname}</NicknameBlueText>님의 팝업
              취향을
            </TitleText>
            <SelectionRow>
              <SelectionTitleText>선택해주세요</SelectionTitleText>
              <SelectionSubText>
                (카테고리 당 1개 이상 필수 선택)
              </SelectionSubText>
            </SelectionRow>
          </TitleContainer>
        }
        ListFooterComponent={
          <CommonCompleteButton
            title="설정 저장하기"
            onPress={handleSubmit}
            isDisabled={isButtonDisabled}
          />
        }
        contentContainerStyle={{paddingBottom: 20}}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const TitleContainer = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NicknameBlueText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
`;

const SelectionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SelectionTitleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const SelectionSubText = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-left: ${moderateScale(5)}px;
  color: ${({theme}) => theme.color.grey.black};
`;

const CategoryContainer = styled.View`
  padding: 20px;
`;

const CategoryTitleTextRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryTitleText = styled.Text`
  font-size: ${moderateScale(20)}px;
  font-weight: bold;
`;

const CategorySubTitlePurpleText = styled.Text`
  font-size: ${moderateScale(12)}px;
  font-weight: 500;
  margin-left: ${moderateScale(5)}px;
  color: ${({theme}) => theme.color.purple.main};
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;
