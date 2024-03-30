import {StyleSheet, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';

function FAQScreen({navigation}) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
});

export default FAQScreen;
