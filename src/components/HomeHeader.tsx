import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import HomeMainTitle from './organisms/header/HomeMainTitle';
import RowPopUpCard from './molecules/card/RowPopUpCard';
import NotLogginBox from './NotLogginBox';
import useGetTasteList from '../hooks/useGetTasteList';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';

export default function HomeHeader({navigation}: any) {
  const isLoggedIn = useIsLoggedIn();
  const userNickname = useSelector((state: RootState) => state.user.nickname);
  const handlePress = () => {
    navigation.replace('Entry');
  };

  const {
    data: tasteList,
    loading: newTasteLoading,
    error: newTastePopUpError,
  } = useGetTasteList();

  return isLoggedIn ? (
    <View style={styles.container}>
      <HomeMainTitle
        text1={`안녕하세요, ${userNickname}님`}
        text2={'취향저격 팝업을 알려드릴게요'}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.popUpScrollView}>
        {tasteList?.popupSummaryDtos.map(item => (
          <TouchableOpacity
            key={item.id} // `key` should be here
            onPress={() => navigation.navigate('PopUpDetail', {id: item.id})}>
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
  ) : (
    <View style={styles.container}>
      <NotLogginBox
        text1={'로그인하고'}
        text2={'팝업 추천을 받아보세요!'}
        buttonText={'로그인 하러 가기'}
        onPress={handlePress}
      />
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
