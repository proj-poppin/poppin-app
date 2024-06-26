import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import StarOnSvg from '../../../assets/icons/starOn.svg';
import StarOffSvg from '../../../assets/icons/favorite.svg';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import useDeleteInterestPopUp from '../../../hooks/detailPopUp/useDeleteInterestPopUp.tsx';
import useAddInterestPopUp from '../../../hooks/detailPopUp/useAddInterestPopUp.tsx';
import {calculateDaysRemaining} from '../../../utils/function/calculateDaysRemaining.tsx';
import Text14M from '../../../styles/texts/body_medium/Text14M.ts';
import Spinner from 'react-native-loading-spinner-overlay';

interface InterestPopUpCardProps {
  image_url: string;
  name: string;
  close_date: string;
  open_date: string;
  status: 'TERMINATED' | 'OPERATING' | 'NOTYET';
  id: number;
  isInterested: boolean; // true 고정으로 받은뒤, toggle 가능하게 처리
}

const InterestPopUpCard: React.FC<InterestPopUpCardProps> = ({
  image_url,
  name,
  close_date,
  open_date,
  status,
  id,
  isInterested: initialInterest,
}) => {
  const {deleteInterest, loading: deleteLoading} = useDeleteInterestPopUp();
  const {addInterest, loading: addLoading} = useAddInterestPopUp();
  const [isInterested, setIsInterested] = useState(initialInterest);

  const handleToggleInterest = async () => {
    if (isInterested) {
      await deleteInterest(id);
    } else {
      await addInterest(id);
    }
    setIsInterested(!isInterested);
  };

  const date = `${open_date} ~ ${close_date}`;
  const formattedName = name.length > 15 ? `${name.substring(0, 15)}...` : name;

  const remainingDays = calculateDaysRemaining(close_date);

  return (
    <View style={styles.cardContainer}>
      <Spinner
        visible={addLoading || deleteLoading}
        textContent={'로딩중...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.svgContainer}>
        <Image source={{uri: image_url}} style={{width: 120, height: 120}} />
        {status === 'TERMINATED' ? (
          <View style={styles.closeWrapper}>
            <Text style={styles.closeText}>운영 종료</Text>
          </View>
        ) : (
          <View style={styles.deadlineWrapper}>
            <Text style={styles.deadlineText}>종료 D-{remainingDays}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.statusAndStarContainer}>
          <View style={[styles.statusContainer]}>
            <Text style={styles.statusText}>
              {status === 'TERMINATED' ? '운영 종료' : `D-${remainingDays}`}
            </Text>
          </View>
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
        <Text style={[Text18B.text, styles.title]}>{formattedName}</Text>
        <Text style={[Text14M.text, styles.date]}>{date}</Text>
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
    height: '100%',
    gap: 10,
    padding: 10,
  },
  title: {
    marginBottom: 2,
  },
  date: {
    color: globalColors.font,
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
});

export default InterestPopUpCard;
