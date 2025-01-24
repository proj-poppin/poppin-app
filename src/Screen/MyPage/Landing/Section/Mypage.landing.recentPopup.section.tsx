// Section/RecentPopupSection.tsx
import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, Platform} from 'react-native';
import {moderateScale} from '../../../../Util';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {useRecentPopups} from 'src/Util/local.util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

export const MyPageLandingRecentPopupSection = () => {
  const {recentPopups, getRecentPopups} = useRecentPopups(); // getRecentPopups 함수 추가
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  // 화면이 포커스될 때마다 최근 팝업 목록을 새로 불러옴
  useFocusEffect(
    useCallback(() => {
      getRecentPopups();
    }, [getRecentPopups]),
  );

  // 날짜 포맷팅 함수
  const formatDate = (openDate: string, closeDate: string) => {
    const start = new Date(openDate);
    const end = new Date(closeDate);
    return `${start.getMonth() + 1}.${start.getDate()}-${
      end.getMonth() + 1
    }.${end.getDate()}`;
  };

  const renderItem = ({item}: {item: PopupSchema}) => (
    <PopupItemContainer
      onPress={() =>
        navigation.navigate('PopupDetailScreen', {popupId: item.id})
      }>
      <PopupImage source={{uri: item.mainImageUrl}} />
      <PopupTextContainer>
        <PopupTitle numberOfLines={1}>{item.name}</PopupTitle>
        <PopupDate>{formatDate(item.openDate, item.closeDate)}</PopupDate>
      </PopupTextContainer>
    </PopupItemContainer>
  );

  // 최근 본 팝업이 없으면 섹션을 숨김
  if (!recentPopups || recentPopups.length === 0) {
    return null;
  }

  return (
    <Container>
      <SectionHeader>
        <HeaderTitle>최근 본 팝업</HeaderTitle>
      </SectionHeader>
      <FlatList
        data={recentPopups}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: moderateScale(16)}}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-top: ${moderateScale(4)}px;
`;

const SectionHeader = styled.View`
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const HeaderTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
`;

const PopupItemContainer = styled.TouchableOpacity`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(140)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: #fff;
  ${Platform.select({
    ios: `
     shadow-color: #000;
     shadow-offset: 0px 2px;
     shadow-opacity: 0.25;
     shadow-radius: 3.84px;
   `,
    android: `
     elevation: 5;
   `,
  })}
`;

const PopupImage = styled.Image`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(8)}px;
`;
const PopupTextContainer = styled.View`
  padding: ${moderateScale(8)}px;
`;
const PopupTitle = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-top: ${moderateScale(8)}px;
`;

const PopupDate = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: #666;
  margin-top: ${moderateScale(4)}px;
`;

const Separator = styled.View`
  width: ${moderateScale(12)}px;
`;
