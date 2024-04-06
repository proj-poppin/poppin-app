import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

interface HotListCardProps {
  textList: string[];
}

const HotListCard = ({textList}: HotListCardProps) => {
  return (
    <View style={styles.longTextBadgeContainer}>
      {textList.map((text, index) => (
        <Text key={index} style={styles.longTextBadgeItem}>
          🔥{text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  longTextBadgeContainer: {
    backgroundColor: globalColors.hotList, // 배경색
    borderRadius: 10, // 둥근 모서리
    borderColor: globalColors.hotList, // 테두리 색상
    padding: 10, // 안쪽 여백
    marginVertical: 10, // 수직 마진
    marginRight: 8, // 오른쪽 마진
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  longTextBadgeItem: {
    color: 'black', // 텍스트 색상
    fontSize: 14, // 폰트 사이즈

    marginBottom: 4, // 아래쪽 마진
  },
});

export default HotListCard;
