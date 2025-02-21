import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native';
import {ScreenHeader} from '../../Component/View';
import styled from 'styled-components/native';
import CommonCompleteButton from 'src/Components/Common/common.complete.button';
import {HomeLandingScreenProps} from 'src/Screen/Home/Landing/Home.landing.screen';
import PreferenceCategory from './Components/PreferenceCategory';
import PreferenceHeader from './Components/PreferenceHeader';
import {usePreferenceSettings} from './Hooks/Use.preference.setting';

export type MypagePreferenceSettingScreenProps = {
  HomeLandingScreen: HomeLandingScreenProps;
};

export const MypagePreferenceSettingScreen = ({
  navigation,
}: NativeStackScreenProps<MypagePreferenceSettingScreenProps>) => {
  const {
    categories,
    user,
    draftSelectedTags,
    toggleTag,
    isButtonDisabled,
    handleSubmit,
    goBack,
  } = usePreferenceSettings(navigation);

  return (
    <Container>
      <ScreenHeader
        title="취향 설정하기"
        LeftComponents={'CLOSE_BUTTON'}
        onPressLeftComponent={goBack}
      />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <PreferenceCategory
            title={item.title}
            keys={item.keys}
            selectedTags={draftSelectedTags}
            onToggleTag={toggleTag}
          />
        )}
        keyExtractor={item => item.title}
        ListHeaderComponent={<PreferenceHeader nickname={user.nickname} />}
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

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

export default MypagePreferenceSettingScreen;
