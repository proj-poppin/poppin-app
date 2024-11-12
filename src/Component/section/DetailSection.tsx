import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';

const DetailSection = ({title, value}) => (
  <View style={styles.detailRow}>
    <Text style={[Text14B.text, {color: globalColors.purple}]}>{title}:</Text>
    <Text style={Text14M.text}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});

export default DetailSection;
