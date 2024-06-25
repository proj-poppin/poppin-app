import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import StarOnSvg from '../../../assets/icons/starOn.svg';
import StarOffSvg from '../../../assets/icons/favorite.svg';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';
import Text12B from '../../../styles/texts/label/Text12B.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import useDeleteInterestPopUp from '../../../hooks/detailPopUp/useDeleteInterestPopUp.tsx';
import useAddInterestPopUp from '../../../hooks/detailPopUp/useAddInterestPopUp.tsx';
import {toggleInterest} from '../../../redux/slices/interestedPopUpSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/stores/reducer.ts';

interface InterestPopUpCardProps {
  image_url: string;
  name: string;
  close_date: string;
  open_date: string;
  status: 'TERMINATED' | 'OPERATING' | string;
  id: number;
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'TERMINATED':
      return '운영 종료';
    case 'OPERATING':
      return '운영 중';
    default:
      return status.startsWith('D-') ? status : '상태 미정';
  }
};

const InterestPopUpCard: React.FC<InterestPopUpCardProps> = ({
  image_url,
  name,
  close_date,
  open_date,
  status,
  id,
}) => {
  const {deleteInterest} = useDeleteInterestPopUp();
  const {addInterest} = useAddInterestPopUp();
  const dispatch = useDispatch();
  const isInterested = useSelector(
    (state: RootState) => state.interestedPopups[id],
  );
  const [localInterested, setLocalInterested] = useState(isInterested);

  useEffect(() => {
    setLocalInterested(isInterested);
  }, [isInterested]);

  const handleToggleInterest = async () => {
    setLocalInterested(!localInterested);
    if (localInterested) {
      await deleteInterest(id);
    } else {
      await addInterest(id);
    }
    dispatch(toggleInterest(id));
  };

  const date = `${open_date} ~ ${close_date}`;
  const formattedName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
  const statusText = getStatusText(status);

  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: image_url}} style={styles.imageStyle} />
      <View style={styles.textContainer}>
        <View style={styles.statusAndStarContainer}>
          <View style={[styles.statusContainer]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
          <Pressable onPress={handleToggleInterest}>
            {localInterested ? (
              <StarOnSvg style={styles.starIcon} />
            ) : (
              <StarOffSvg style={styles.starIcon} />
            )}
          </Pressable>
        </View>
        <Text style={[Text18B.text, styles.title]}>{formattedName}</Text>
        <Text style={[Text12B.text, styles.date]}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
    backgroundColor: globalColors.white,
    marginBottom: 10,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    height: '100%',
    gap: 10,
    padding: 10,
  },
  title: {
    marginBottom: 2,
  },
  date: {
    color: globalColors.warmGray,
  },
  statusAndStarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    backgroundColor: globalColors.purpleLight,
    borderRadius: 10,
    padding: 6,
  },
  statusText: {
    color: globalColors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  starIcon: {
    // Assuming no style changes needed here
  },
});

export default InterestPopUpCard;
