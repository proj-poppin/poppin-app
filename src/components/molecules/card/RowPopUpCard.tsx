import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Props type definition
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
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.introduce}>
          {introduce}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: 'white',
    width: 180,

    // iOS용 그림자 스타일
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // Android용 그림자 스타일
    elevation: 5,

    // 테두리 선 추가
    borderWidth: 0.5, // 테두리 선의 두께
    borderColor: '#ddd', // 테두리 선의 색상
  },
  image: {
    width: '100%',
    height: 150, // Adjust the height as needed
    borderTopLeftRadius: 10, // To ensure iOS also respects the border radius
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  introduce: {
    fontSize: 14,
    color: 'gray',
  },
});

export default RowPopUpCard;
