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
import NotLogginBox from '../../components/NotLogginBox.tsx';
import QuestionSvg from '../../assets/icons/question.svg';
import DownSvg from '../../assets/icons/down.svg';
import RightSvg from '../../assets/icons/smallright.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import useGetUser from '../../hooks/useGetUser.tsx';
import useGetHotList from '../../hooks/useGetHotList.tsx';
import useGetNewList from '../../hooks/useGetNewList.tsx';
import useGetDetailPopUp from '../../hooks/useGetDetailPopUp.tsx';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import RowPopUpCard from '../../components/molecules/card/RowPopUpCard.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import HomeHeader from '../../components/organisms/header/HomeHeader.tsx';
import HomeMainTitle from '../../components/organisms/header/HomeMainTitle.tsx';
import UpSvg from '../../assets/icons/up.svg';
import HotListCard from '../../components/molecules/card/HotListCard.tsx';
import useGetTasteList from '../../hooks/useGetTasteList.tsx';
import useGetClosingList from '../../hooks/useGetClosingList.tsx';
import HotListNoticeSvg from '../../assets/images/hotListNotice.svg';

// @ts-ignore
function HomeScreen({navigation}) {
  const handlePress = () => {
    navigation.replace('Entry');
  };
  const {data: user, loading, error} = useGetUser();

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
    data: tasteList,
    loading: newTasteLoading,
    error: newTastePopUpError,
  } = useGetTasteList();

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

  if (
    loading ||
    hotListLoading ||
    newListLoading ||
    newDetailPopUpLoading ||
    newTasteLoading
  ) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <DismissKeyboardView>
        <SafeAreaView
          style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
          <View style={styles.container}>
            <HomeHeader />
            <NotLogginBox
              text1={'로그인하고'}
              text2={'팝업 추천을 받아보세요!'}
              buttonText={'로그인 하러 가기'}
              onPress={handlePress}
            />
          </View>
          <DividerLine />
          <View style={styles.container}>
            <View style={styles.middleContainer}>
              <View style={styles.textAndQuestionContainer}>
                <Text style={Text18B.text}>인기 TOP 5</Text>
                <View style={styles.questionContainer}>
                  <TouchableOpacity
                    onPress={() => setShowNotice(prev => !prev)}>
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

  return (
    <DismissKeyboardView>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.container}>
          <HomeHeader />
          <HomeMainTitle
            text1={`안녕하세요, ${user?.nickname}님`}
            text2={'취향저격 팝업을 알려드릴게요'}
          />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.popUpScrollView}>
            {tasteList?.popupSummaryDtos.map(item => (
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
    marginTop: 5,
  },
  textAndQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popUpScrollView: {
    marginTop: 15,
    paddingHorizontal: 5, // 스크롤뷰의 좌우 패딩
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
