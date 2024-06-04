import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import VerticalDividerLine from '../VerticalDividerLine.tsx';
import Text18M from '../../../styles/texts/body_large/Text18M.ts';
import Text16B from '../../../styles/texts/body_medium_large/Text16B.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import HorizontalBarChart from '../../HorizontalBarChart.tsx';
import CongestionLabel from '../../findPopup/percentageButton.tsx';
import Text16M from '../../../styles/texts/body_medium_large/Text16M.ts';
import Text14M from '../../../styles/texts/body_medium/Text14M.ts';
import Text14B from '../../../styles/texts/body_medium/Text14B.ts';

const CongestionSection = ({ satisfyPercent, title, data }) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.satisfyRowSection}>
        <Text style={[Text14B.text, {color: globalColors.font}]}>
          {'팝업 만족도'}
        </Text>
        <Text style={Text14M.text}>
          방문자의 <Text style={Text14B.text}>{satisfyPercent}%</Text>
          {'가 이 팝업에 만족하고 있어요.'}
        </Text>
      </View>
      <View style={styles.congestionRowSection}>
        <Text style={[Text14B.text, {color: globalColors.font}]}>{title}</Text>
        <View style={styles.reviewChartSection}>
          <Text style={Text16B.text}>평일</Text>
          <View style={styles.chartRowSection}>
            <Text style={Text16M.text}>오전</Text>
            <VerticalDividerLine />
            <HorizontalBarChart
              congestionRate={data.weekdayAm.congestionRate}
              congestionRatio={data.weekdayAm.congestionRatio}
            />
            <CongestionLabel
              congestionRate={data.weekdayAm.congestionRate}
              congestionRatio={data.weekdayAm.congestionRatio}
            />
          </View>
          <View style={styles.chartRowSection}>
            <Text style={Text16M.text}>오후</Text>
            <VerticalDividerLine />
            <HorizontalBarChart
              congestionRate={data.weekdayPm.congestionRate}
              congestionRatio={data.weekdayPm.congestionRatio}
            />
            <CongestionLabel
              congestionRate={data.weekdayPm.congestionRate}
              congestionRatio={data.weekdayPm.congestionRatio}
            />
          </View>
          <Text style={Text16B.text}>주말</Text>
          <View style={styles.chartRowSection}>
            <Text style={Text16M.text}>오전</Text>
            <VerticalDividerLine />
            <HorizontalBarChart
              congestionRate={data.weekendAm.congestionRate}
              congestionRatio={data.weekendAm.congestionRatio}
            />
            <CongestionLabel
              congestionRate={data.weekendAm.congestionRate}
              congestionRatio={data.weekendAm.congestionRatio}
            />
          </View>
          <View style={styles.chartRowSection}>
            <Text style={Text16M.text}>오후</Text>
            <VerticalDividerLine />
            <HorizontalBarChart
              congestionRate={data.weekendPm.congestionRate}
              congestionRatio={data.weekendPm.congestionRatio}
            />
            <CongestionLabel
              congestionRate={data.weekendPm.congestionRate}
              congestionRatio={data.weekendPm.congestionRatio}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  satisfyRowSection: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 10,
  },
  congestionRowSection: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 40,
  },
  reviewChartSection: {
    flexDirection: 'column',
    columnGap: 20,
  },
  chartRowSection: {
   
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CongestionSection;
