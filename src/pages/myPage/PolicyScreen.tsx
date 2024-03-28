import {StyleSheet, View} from 'react-native';
import globalColors from '../../utils/color/globalColors.ts';

function PolicyScreen({navigation}) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
});

export default PolicyScreen;
