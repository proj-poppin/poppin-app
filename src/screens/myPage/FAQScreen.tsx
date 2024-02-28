import {StyleSheet, View} from 'react-native';
import primaryColors from '../../style/primaryColors.ts';

function FAQScreen({navigation}) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColors.white,
    paddingHorizontal: 20,
  },
});

export default FAQScreen;
