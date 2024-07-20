import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import useIsLoggedIn from '../hooks/auth/useIsLoggedIn.tsx';
import HomeMainTitle from './organisms/header/HomeMainTitle';
import RowPopUpCard from './molecules/card/RowPopUpCard';
import ForLoginBox from './ForLoginBox.tsx';
import useGetTasteList from '../hooks/popUpList/useGetTasteList.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../types/AppNavigatorParamList.ts';
import {useNavigation} from '@react-navigation/native';
import useGetUser from '../hooks/auth/useGetUser.tsx';

export type EntryScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'Entry'
>;

export default function HomeLoginHeader() {
  const navigation = useNavigation<EntryScreenNavigationProp>();
  const isLoggedIn = useIsLoggedIn();
  const {data: user, loading, error} = useGetUser();
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
              navigation.navigate('PopUpDetail', {
                id: item.id,
                isLoggedIn: isLoggedIn,
              })
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
  ) : (
    <View style={styles.container}>
      <ForLoginBox
        isNeedSvg={false}
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
