import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import DefaultImageSvg from '../../assets/images/interestSample.svg';
import StarOnSvg from '../../assets/icons/starOn.svg';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text12B from '../../styles/texts/label/Text12B.ts';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../DividerLine.tsx';
import {POPUUP_TYPES} from './constants.ts';

const FindCard = ({item, type}: any) => {
  const formattedTitle =
    item.name.length > 20 ? `${item.title.substring(0, 20)}...` : item.title;
  const calculateRemainingDays = (serverDate: string) => {
    const closeDate = new Date(serverDate);

    const currentDate = new Date();

    const timeDifference = closeDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  };

  const remainingDays = calculateRemainingDays(item.closeDate);
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.svgContainer}>
          <Image src={item.posterUrl} style={{width: 120, height: 120}} />
          {type === 'close' ? (
            <View style={styles.closeWrapper}>
              <Text style={styles.closeText}>팝업 종료</Text>
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
            <StarOnSvg style={styles.starIcon} />
          </View>
          <Text style={styles.location}>{item.address}</Text>

          <Text style={[Text12B.text, styles.date]}>
            {item.openDate}~{item.closeDate}
          </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.entries(item.prefered).map(([key, value]) => {
              if (value) {
                const matchingTag = POPUUP_TYPES.find(tag => tag.id === key);

                if (matchingTag) {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.tagWrapper,
                        {backgroundColor: globalColors.redLight},
                      ]}>
                      <Text style={styles.tag}>{matchingTag.name}</Text>
                    </View>
                  );
                }
              }
            })}
            {Object.entries(item.taste).map(([key, value]) => {
              if (value) {
                const matchingTag = POPUUP_TYPES.find(tag => tag.id === key);

                if (matchingTag) {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.tagWrapper,
                        {backgroundColor: globalColors.blueLight},
                      ]}>
                      <Text style={styles.tag}>{matchingTag.name}</Text>
                    </View>
                  );
                }
              }
            })}
          </ScrollView>
        </View>
      </View>
      <DividerLine height={1} />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'flex-start', // SVG와 텍스트 컨테이너를 위쪽으로 정렬
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
    justifyContent: 'space-between', // 상태와 별 아이콘 사이 공간을 균등하게 배분
    alignItems: 'center',
    width: '100%', // 부모 컨테이너의 전체 너비 사용
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
    color: globalColors.stroke2,
  },
  date: {
    color: globalColors.stroke2,
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
