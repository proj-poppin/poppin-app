import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import StarOnSvg from '../../../assets/icons/starOn.svg';
import Text12B from '../../../styles/texts/label/Text12B.ts';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';

interface InterestPopUpCardProps {
  image_url: string;
  name: string;
  close_date: string;
  open_date: string;
  status: string;
  id: number;
}

const InterestPopUpCard: React.FC<InterestPopUpCardProps> = ({
  image_url,
  name,
  close_date,
  open_date,
  status,
  id,
}) => {
  const date = `${open_date} ~ ${close_date}`;
  const formattedName = name.length > 15 ? `${name.substring(0, 15)}...` : name; // Adjust the character limit as needed

  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: image_url}} style={styles.imageStyle} />
      <View style={styles.textContainer}>
        <Text style={[Text18B.text, styles.title]}>{formattedName}</Text>
        <Text style={[Text12B.text, styles.date]}>{date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text>{status}</Text>
      </View>
      <StarOnSvg style={styles.starIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center', // Adjust alignment as per UI requirements
    backgroundColor: globalColors.white,
    marginBottom: 10, // Add space between the cards
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  date: {
    color: globalColors.warmGray,
  },
  statusContainer: {
    backgroundColor: globalColors.purpleLight,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  starIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default InterestPopUpCard;
