import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../../components/DividerLine.tsx';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import QuestionSvg from '../../assets/icons/question.svg';
import DownSvg from '../../assets/icons/down.svg';
import RightSvg from '../../assets/icons/smallright.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import {useDispatch} from 'react-redux';
import {resetUser} from '../../redux/slices/user.ts';
import useGetUser from '../../hooks/useGetUser.tsx';
import useGetHotList from '../../hooks/useGetHotList.tsx';
import useGetClosingList from '../../hooks/useGetClosingList.tsx';
import useGetNewList from '../../hooks/useGetNewList.tsx';
import useGetDetailPopUp from '../../hooks/useGetDetailPopUp.tsx';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import RowPopUpCard from '../../components/molecules/card/RowPopUpCard.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import HomeHeader from '../../components/organisms/header/HomeHeader.tsx';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(resetUser());
    navigation.replace('Entry');
  };
  const {data: user, loading, error} = useGetUser();

  const {
    data: hotList,
    loading: hotListLoading,
    error: hotListError,
  } = useGetHotList();

  const {
    data: closingList,
    loading: getClosingLoading,
    error: getClosingError,
  } = useGetClosingList();

  const {
    data: newList,
    loading: newListLoading,
    error: newListError,
  } = useGetNewList();

  const {
    data: detailPopUpData,
    loading: newDetailPopUpLoading,
    error: newDetailPopUpError,
  } = useGetDetailPopUp(17);

  if (loading) {
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
                <QuestionSvg style={{paddingLeft: 40}} />
              </View>
              <DownSvg />
            </View>
            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>새로 오픈</Text>
              <View style={styles.textAndQuestionContainer}>
                <Text style={[Text14R.text, {color: globalColors.black}]}>
                  전체 보기
                </Text>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.popUpScrollView}>
              {hotList?.map(item => (
                <RowPopUpCard
                  key={item.id}
                  imageUrl={item.image_url}
                  name={item.name}
                  introduce={item.introduce}
                />
              ))}
            </ScrollView>
            <View style={styles.middleContainer}>
              <Text style={Text18B.text}>종료 임박</Text>
              <View style={styles.textAndQuestionContainer}>
                <Text style={[Text12R.text, {color: globalColors.black}]}>
                  전체 보기
                </Text>
                <RightSvg style={{paddingLeft: 20}} />
              </View>
            </View>
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
            {hotList?.map(item => (
              <RowPopUpCard
                key={item.id}
                imageUrl={item.image_url}
                name={item.name}
                introduce={item.introduce}
              />
            ))}
          </ScrollView>
        </View>
        <DividerLine />
        <View style={styles.container}>
          <View style={styles.middleContainer}>
            <View style={styles.textAndQuestionContainer}>
              <Text style={Text18B.text}>인기 TOP 5</Text>
              <QuestionSvg style={{paddingLeft: 40}} />
            </View>
            <DownSvg />
          </View>
          <View style={styles.middleContainer}>
            <Text style={Text18B.text}>새로 오픈</Text>
            <View style={styles.textAndQuestionContainer}>
              <Text style={[Text14R.text, {color: globalColors.black}]}>
                전체 보기
              </Text>
              <RightSvg style={{paddingLeft: 20}} />
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.popUpScrollView}>
            {hotList?.map(item => (
              <RowPopUpCard
                key={item.id}
                imageUrl={item.image_url}
                name={item.name}
                introduce={item.introduce}
              />
            ))}
          </ScrollView>
          <View style={styles.middleContainer}>
            <Text style={Text18B.text}>종료 임박</Text>
            <View style={styles.textAndQuestionContainer}>
              <Text style={[Text12R.text, {color: globalColors.black}]}>
                전체 보기
              </Text>
              <RightSvg style={{paddingLeft: 20}} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  textAndQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popUpScrollView: {
    marginTop: 15,
    paddingHorizontal: 5, // 스크롤뷰의 좌우 패딩
  },
});
export default HomeScreen;
