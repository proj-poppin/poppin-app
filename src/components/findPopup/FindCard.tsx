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
    item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name;
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
            style={{width: 140, height: 140}}
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
            <View style={styles.titleContainer}>
              <Text
                style={[Text18B.text, styles.title]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {formattedTitle}
              </Text>
            </View>
            <Pressable
              onPress={handleToggleInterest}
              style={styles.starIcon}
              disabled={addLoading || deleteLoading}>
              {isInterested ? <StarOnSvg /> : <StarOffSvg />}
            </Pressable>
          </View>
          <Text style={[styles.location]}>{item.address}</Text>
          <Text style={[Text12B.text, styles.date]}>
            {item.openDate}~{item.closeDate}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}>
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
              return null; // Add a return null to avoid warning
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
              return null; // Add a return null to avoid warning
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
    marginTop: 15,
    width: 140,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
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
  titleContainer: {
    width: '90%',
  },
  starIcon: {
    position: 'absolute',
    top: 0,
    marginLeft: 5,
    right: -20,
    marginRight: 5,
  },
  title: {
    marginBottom: 5,
    width: '100%',
  },
  location: {
    color: globalColors.font,
    height: 30,
  },
  date: {
    color: globalColors.font,
    height: 15,
    marginBottom: 10,
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
    padding: 8,
    marginRight: 8,
  },
  tag: {
    fontSize: 11,
  },
  closeWrapper: {
    width: 140,
    height: 140,
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
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default FindCard;
