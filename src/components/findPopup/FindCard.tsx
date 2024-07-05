import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import StarOnSvg from '../../assets/icons/starOn.svg';
import StarOffSvg from '../../assets/icons/favorite.svg';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text12B from '../../styles/texts/label/Text12B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../DividerLine.tsx';
import {POP_UP_TYPES} from './constants.ts';
import useAddInterestPopUp from '../../hooks/detailPopUp/useAddInterestPopUp.tsx';
import useDeleteInterestPopUp from '../../hooks/detailPopUp/useDeleteInterestPopUp.tsx';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import {RootState} from '../../redux/stores/reducer.ts';
import {setInterest} from '../../redux/slices/interestSlice.ts';
import useGetInterestList from '../../hooks/popUpList/useGetInterestList.tsx';
import {setOnRefresh} from '../../redux/slices/refreshSlice.ts';
import Text16B from '../../styles/texts/body_medium_large/Text16B.ts';

const FindCard = ({item, status, showToast}: any) => {
  const navigation = useNavigation();
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch();
  const isInterested = useSelector(
    (state: RootState) => state.interest[item.id],
  );
  const {addInterest, loading: addLoading} = useAddInterestPopUp();
  const {deleteInterest, loading: deleteLoading} = useDeleteInterestPopUp();
  const {refetch: refetchInterestList} = useGetInterestList();
  const formattedTitle =
    item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name;
  const onRefresh = useSelector((state: RootState) => state.refresh.onRefresh);
  const calculateRemainingDays = (serverDate: string) => {
    const closeDate = new Date(serverDate);
    const currentDate = new Date();
    const timeDifference = closeDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const remainingDays = calculateRemainingDays(item.closeDate);

  const handleToggleInterest = async () => {
    if (!isLoggedIn) {
      navigation.navigate('Entry');
      return;
    }
    if (isInterested) {
      await deleteInterest(item.id);
      showToast('관심팝업에서 삭제되었어요!');
      dispatch(setInterest({id: item.id, isInterested: false}));
    } else {
      await addInterest(item.id);
      showToast('관심팝업에 저장되었어요!');
      dispatch(setInterest({id: item.id, isInterested: true}));
    }
    if (onRefresh) {
      onRefresh();
    } // 리스트 다시 불러오기
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('PopUpDetail', {id: item.id})}>
      <View style={styles.cardContainer}>
        <Spinner
          textContent={'로딩중...'}
          visible={addLoading || deleteLoading}
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.svgContainer}>
          <Image
            source={{uri: item.posterUrl}}
            style={{width: 120, height: 120}}
          />
          {status === 'TERMINATED' ? (
            <View style={styles.closeWrapper}>
              <Text style={[Text16B.text, {color: globalColors.white}]}>
                {status === 'TERMINATED' ? '팝업 종료' : `D-${remainingDays}`}
              </Text>
            </View>
          ) : (
            <View style={styles.deadlineWrapper}>
              <Text style={styles.deadlineText}>종료 D-{remainingDays}</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.statusAndStarContainer}>
            <Text style={[Text18B.text, styles.title]}>{formattedTitle}</Text>
            <Pressable
              onPress={handleToggleInterest}
              style={styles.starIcon}
              disabled={addLoading || deleteLoading}>
              {isInterested ? (
                <StarOnSvg style={styles.starIcon} />
              ) : (
                <StarOffSvg style={styles.starIcon} />
              )}
            </Pressable>
          </View>
          <Text style={styles.location}>{item.address}</Text>
          <Text style={[Text12B.text, styles.date]}>
            {item.openDate}~{item.closeDate}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(item.prefered).map(([key, value]) => {
              if (value) {
                const matchingTag = POP_UP_TYPES.find(tag => tag.name === key);
                if (matchingTag) {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.tagWrapper,
                        {backgroundColor: globalColors.redLight},
                      ]}>
                      <Text style={styles.tag}>{matchingTag.label}</Text>
                    </View>
                  );
                }
              }
            })}
            {Object.entries(item.taste).map(([key, value]) => {
              if (value) {
                const matchingTag = POP_UP_TYPES.find(tag => tag.name === key);
                if (matchingTag) {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.tagWrapper,
                        {backgroundColor: globalColors.blueLight},
                      ]}>
                      <Text style={styles.tag}>{matchingTag.label}</Text>
                    </View>
                  );
                }
              }
            })}
          </ScrollView>
        </View>
      </View>
      <DividerLine height={1} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'flex-start',
    backgroundColor: globalColors.white,
  },
  svgContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    height: '100%',
    gap: 5,
  },
  statusAndStarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  statusContainer: {
    backgroundColor: globalColors.purpleLight,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  statusText: {
    color: globalColors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 5,
  },
  location: {
    color: globalColors.font,
  },
  date: {
    color: globalColors.font,
    marginBottom: 10,
  },
  starIcon: {
    // 필요한 경우 크기나 마진 조정
  },
  tagsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  deadlineWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 5,
    borderRadius: 100,
  },
  deadlineText: {
    color: 'white',
    fontSize: 10,
  },
  tagWrapper: {
    borderRadius: 100,
    width: 'auto',
    height: 28,
    padding: 8,
    marginLeft: 8,
  },
  tag: {
    fontSize: 11,
  },
  closeWrapper: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
  },
});

export default FindCard;
