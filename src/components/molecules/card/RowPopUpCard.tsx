import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Props 타입 정의
interface RowPopUpCardProps {
  imageUrl: string;
  name: string;
  introduce: string;
}

const RowPopUpCard: React.FC<RowPopUpCardProps> = ({
  imageUrl,
  name,
  introduce,
}) => {
  console.log('name', name);
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.introduce}>{introduce}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: 'white',
  },
  image: {
    width: '66.66%',
    height: 730,
  },
  textContainer: {
    padding: 10,
    width: '33.33%',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  introduce: {
    marginTop: 4,
  },
});

export default RowPopUpCard;
