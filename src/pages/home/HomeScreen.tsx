import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../../components/DividerLine.tsx';
import QuestionSvg from '../../assets/icons/question.svg';
import DownSvg from '../../assets/icons/down.svg';
import RightSvg from '../../assets/icons/smallright.svg';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import useGetHotList from '../../hooks/popUpList/useGetHotList.tsx';
import useGetNewList from '../../hooks/popUpList/useGetNewList.tsx';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import RowPopUpCard from '../../components/molecules/card/RowPopUpCard.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import UpSvg from '../../assets/icons/up.svg';
import HotListCard from '../../components/molecules/card/HotListCard.tsx';
import useGetClosingList from '../../hooks/popUpList/useGetClosingList.tsx';
import HotListNoticeSvg from '../../assets/images/hotListNotice.svg';
import HomeLoginHeader from '../../components/HomeLoginHeader.tsx';
import HomeHeader from '../../components/organisms/header/HomeHeader.tsx';

function HomeScreen({navigation}) {
  const [showNotice, setShowNotice] = useState(false);
  const {
    data: hotList,
    loading: hotListLoading,
    error: hotListError,
  } = useGetHotList();
  const {
    data: newList,
    loading: newListLoading,
    error: newListError,
  } = useGetNewList();
  const {
    data: closingList,
    loading: closingListLoading,
    error: closingListError,
  } = useGetClosingList();
  const goToAlarmScreen = () => {
    navigation.navigate('Alarm');
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigateToFind = () => {
    navigation.navigate('Find');
  };
  if (hotListLoading || newListLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <HomeHeader />
      <DismissKeyboardView>
        <View
          style={[
            {flex: 1},
            {backgroundColor: globalColors.white},
            {marginTop: 20, marginBottom: 120},
          ]}>
          <HomeLoginHeader />
          <DividerLine height={12} />
          <View style={styles.bottomContainer}>
            <View style={styles.middleContainer}>
              <View style={styles.textAndQuestionContainer}>
                <Text style={Text18B.text}>인기 TOP 5</Text>
                <View style={styles.questionContainer}>
                  <Pressable onPress={() => setShowNotice(prev => !prev)}>
                    <QuestionSvg style={{paddingLeft: 40}} />
                  </Pressable>
                  {showNotice && (
                    <View style={styles.noticeAbsoluteContainer}>
                      <HotListNoticeSvg />
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={toggleDropdown}>
                  {isDropdownOpen ? (
                    <UpSvg style={{paddingLeft: 420}} />
                  ) : (
                    <DownSvg style={{paddingLeft: 420}} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <HotListCard
              isDropdownOpen={isDropdownOpen}
              textList={hotList?.slice(0, 5).map(item => item.name) || []}
            />

            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>새로 오픈</Text>
              <View style={styles.textAndQuestionContainer}>
                <TouchableOpacity onPress={navigateToFind}>
                  <Text style={[Text14R.text, {color: globalColors.black}]}>
                    전체 보기
                  </Text>
                </TouchableOpacity>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.popUpScrollView}>
              {newList?.map(item => (
                <TouchableOpacity
                  key={item.id} // `key` should be here
                  onPress={() =>
                    navigation.navigate('PopUpDetail', {id: item.id})
                  }>
                  <RowPopUpCard
                    key={item.id}
                    id={item.id}
                    imageUrl={item.image_url}
                    name={item.name}
                    introduce={item.introduce}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>종료 임박</Text>
              <View style={styles.textAndQuestionContainer}>
                <TouchableOpacity onPress={navigateToFind}>
                  <Text style={[Text14R.text, {color: globalColors.black}]}>
                    전체 보기
                  </Text>
                </TouchableOpacity>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.popUpScrollView}>
              {closingList?.map(item => (
                <TouchableOpacity
                  key={item.id} // `key` should be here
                  onPress={() => navigation.navigate('PopUpDetail', {id: 1})}>
                  <RowPopUpCard
                    key={item.id}
                    id={item.id}
                    imageUrl={item.image_url}
                    name={item.name}
                    introduce={item.introduce}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </DismissKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 60,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAndQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  popUpScrollView: {
    marginTop: 13,
    paddingHorizontal: 5, // 스크롤뷰의 좌우 패딩
    marginBottom: 28,
  },
  questionContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeAbsoluteContainer: {
    position: 'absolute',
    right: -200,
    top: -30,
    zIndex: 1,
  },
});
export default HomeScreen;
