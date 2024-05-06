import {
  ActivityIndicator,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import useGetUser from '../../hooks/useGetUser.tsx';
import useGetHotList from '../../hooks/useGetHotList.tsx';
import useGetNewList from '../../hooks/useGetNewList.tsx';
import useGetDetailPopUp from '../../hooks/useGetDetailPopUp.tsx';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import RowPopUpCard from '../../components/molecules/card/RowPopUpCard.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import UpSvg from '../../assets/icons/up.svg';
import HotListCard from '../../components/molecules/card/HotListCard.tsx';
import useGetClosingList from '../../hooks/useGetClosingList.tsx';
import HotListNoticeSvg from '../../assets/images/hotListNotice.svg';
import HomeLoginHeader from '../../components/HomeLoginHeader.tsx';

// @ts-ignore
function HomeScreen({navigation}) {
  const [showNotice, setShowNotice] = useState(false);

  const toggleNotice = () => {
    setShowNotice(!showNotice);
  };

  const handleHideNotice = () => {
    if (showNotice) {
      setShowNotice(false);
    }
  };

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
    data: detailPopUpData,
    loading: newDetailPopUpLoading,
    error: newDetailPopUpError,
  } = useGetDetailPopUp(34);

  const {
    data: closingList,
    loading: closingListLoading,
    error: closingListError,
  } = useGetClosingList();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToFind = () => {
    navigation.navigate('Find');
  };

  // 드롭다운 아이콘을 렌더링하는 로직
  const renderDropdownIcon = () => {
    return isDropdownOpen ? <UpSvg /> : <DownSvg />;
  };

  if (hotListLoading || newListLoading || newDetailPopUpLoading) {
    return <ActivityIndicator />;
  }

  return (
    <DismissKeyboardView>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <HomeLoginHeader />
        <DividerLine />
        <View style={styles.bottomContainer}>
          <View style={styles.middleContainer}>
            <View style={styles.textAndQuestionContainer}>
              <Text style={Text18B.text}>인기 TOP 5</Text>
              <View style={styles.questionContainer}>
                <TouchableOpacity onPress={() => setShowNotice(prev => !prev)}>
                  <QuestionSvg style={{paddingLeft: 40}} />
                </TouchableOpacity>
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
          {isDropdownOpen ? (
            <HotListCard
              textList={hotList?.slice(0, 5).map(item => item.name) || []} // If hotList is defined, map over it; otherwise, use an empty array
            />
          ) : (
            <HotListCard
              textList={hotList?.slice(0, 1).map(item => item.name) || []} // Same as above
            />
          )}

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
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
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
