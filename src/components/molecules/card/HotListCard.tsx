import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

interface HotListCardProps {
  itemList: {id: string; name: string; image_url: string; introduce: string}[];
  isDropdownOpen: boolean;
  navigation: any;
  isLoggedIn: boolean;
}

const HotListCard: React.FC<HotListCardProps> = ({
  itemList,
  isDropdownOpen,
  navigation,
  isLoggedIn,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log('hello is logged in', isLoggedIn);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % itemList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [itemList]);

  return (
    <View style={styles.longTextBadgeContainer}>
      {isDropdownOpen ? (
        itemList.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('PopUpDetail', {
                id: item.id,
                isLoggedIn: isLoggedIn,
              })
            }>
            <Text
              style={styles.longTextBadgeItem}
              numberOfLines={1}
              ellipsizeMode="tail">
              🔥{item.name}
            </Text>
          </Pressable>
        ))
      ) : (
        <Pressable
          onPress={() =>
            navigation.navigate('PopUpDetail', {id: itemList[currentIndex].id})
          }>
          <Text
            style={styles.longTextBadgeItem}
            numberOfLines={1}
            ellipsizeMode="tail">
            🔥{itemList[currentIndex].name}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  longTextBadgeContainer: {
    backgroundColor: globalColors.redLight,
    borderRadius: 10,
    borderColor: globalColors.redLight,
    padding: 10,
    marginVertical: 10,
    marginRight: 8,
    marginBottom: 28,
    alignItems: 'flex-start',
    gap: 12, // Note: React Native does not support `gap` property. Use margin/padding instead.
  },
  longTextBadgeItem: {
    color: 'black',
    fontSize: 14,
  },
});

export default HotListCard;
