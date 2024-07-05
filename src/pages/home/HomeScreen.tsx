import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import HomeMainTitle from '../../components/organisms/header/HomeMainTitle';
import ForLoginBox from '../../components/ForLoginBox.tsx';
import useGetTasteList from '../../hooks/popUpList/useGetTasteList.tsx';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import useGetUser from '../../hooks/auth/useGetUser.tsx';
import HomeHeader from '../../components/organisms/header/HomeHeader.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';
import getUserSetting from '../../apis/myPage/getUserSetting.ts';
import userSlice from '../../redux/slices/user.ts';

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
  const {
    data: tasteList,
    loading: newTasteLoading,
    error: newTastePopUpError,
  } = useGetTasteList();

  const isLoggedIn = useIsLoggedIn();
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserSetting();
        if (userResponse.success) {
          dispatch(userSlice.actions.setUser(userResponse.data));
        } else {
          dispatch(userSlice.actions.resetUser());
        }
      } catch (error) {
        console.log('Error fetching user info:', error);
        dispatch(userSlice.actions.resetUser());
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToFind = () => {
    navigation.navigate('Find');
  };

  const goToAlarmScreen = () => {
    navigation.navigate('Alarm');
  };

  if (hotListLoading || newListLoading || loadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.blue} />
      </View>
    );
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
          {isLoggedIn ? (
            <View style={styles.container}>
              <HomeMainTitle
                text1={`안녕하세요, ${user?.nickname}님`}
                text2={'취향저격 팝업을 알려드릴게요'}
              />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.popUpScrollView}>
                {tasteList?.popupSummaryDtos.map(item => (
                  <Pressable
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('PopUpDetail', {id: item.id})
                    }>
                    <RowPopUpCard
                      id={item.id}
                      imageUrl={item.image_url}
                      name={item.name}
                      introduce={item.introduce}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.container}>
              <ForLoginBox
                isNeedSvg={false}
                text1={'로그인하고'}
                text2={'팝업 추천을 받아보세요!'}
                buttonText={'로그인 하러 가기'}
                onPress={() => navigation.replace('Entry')}
              />
            </View>
          )}
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
                <Pressable onPress={toggleDropdown}>
                  {isDropdownOpen ? (
                    <UpSvg style={{paddingLeft: 420}} />
                  ) : (
                    <DownSvg style={{paddingLeft: 420}} />
                  )}
                </Pressable>
              </View>
            </View>

            <HotListCard
              isDropdownOpen={isDropdownOpen}
              textList={hotList?.slice(0, 5).map(item => item.name) || []}
            />

            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>새로 오픈</Text>
              <View style={styles.textAndQuestionContainer}>
                <Pressable onPress={navigateToFind}>
                  <Text style={[Text14R.text, {color: globalColors.black}]}>
                    전체 보기
                  </Text>
                </Pressable>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.popUpScrollView}>
              {newList?.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('PopUpDetail', {id: item.id})
                  }>
                  <RowPopUpCard
                    id={item.id}
                    imageUrl={item.image_url}
                    name={item.name}
                    introduce={item.introduce}
                  />
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>종료 임박</Text>
              <View style={styles.textAndQuestionContainer}>
                <Pressable onPress={navigateToFind}>
                  <Text style={[Text14R.text, {color: globalColors.black}]}>
                    전체 보기
                  </Text>
                </Pressable>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.popUpScrollView}>
              {closingList?.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('PopUpDetail', {id: item.id})
                  }>
                  <RowPopUpCard
                    id={item.id}
                    imageUrl={item.image_url}
                    name={item.name}
                    introduce={item.introduce}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </DismissKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
