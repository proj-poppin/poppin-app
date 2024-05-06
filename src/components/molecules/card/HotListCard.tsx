import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

interface HotListCardProps {
  textList: string[];
  isDropdownOpen: boolean;
}

const HotListCard: React.FC<HotListCardProps> = ({
  textList,
  isDropdownOpen,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [textList]);

  return (
    <View style={styles.longTextBadgeContainer}>
      {isDropdownOpen ? (
        textList.map((text, index) => (
          <Text key={index} style={styles.longTextBadgeItem}>
            🔥{text}
          </Text>
        ))
      ) : (
        <Text style={styles.longTextBadgeItem}>🔥{textList[currentIndex]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  longTextBadgeContainer: {
    backgroundColor: globalColors.hotList,
    borderRadius: 10,
    borderColor: globalColors.hotList,
    padding: 10,
    marginVertical: 10,
    marginRight: 8,
    marginBottom: 28,
    alignItems: 'flex-start',
    gap: 12,
  },
  longTextBadgeItem: {
    color: 'black',
    fontSize: 14,
  },
});

export default HotListCard;
