import {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useMypagePreferenceSettingScreenStore} from '../Zustand/Mypage.preferenceSetting.zustand';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import shallow from 'zustand/shallow';
import {CategoryType} from '../Types/category.schema';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
} from 'src/Object/preference.enum';

/**
 * 취향 설정시 사용하는 핸들러
 * @author 희진
 */

export const usePreferenceSettings = (navigation: any) => {
  const categories: CategoryType[] = [
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
  const isAllSelected = useCallback(
    () => isAllCategoriesSelected(),
    [draftSelectedTags],
  );

  useEffect(() => {
    setIsButtonDisabled(!isAllSelected());
  }, [draftSelectedTags, isAllSelected]);

  // 화면 진입/이탈 시 초기화
  const resetTagsMemoized = useCallback(() => {
    resetTags();
  }, [resetTags]);

  useFocusEffect(resetTagsMemoized);

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
      goBack();
    }
  };

  return {
    categories,
    user,
    draftSelectedTags,
    toggleTag,
    isButtonDisabled,
    handleSubmit,
    goBack,
  };
};
