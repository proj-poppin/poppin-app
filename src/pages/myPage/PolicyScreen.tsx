import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import LeftArrow from "../../assets/icons/leftArrow.svg"

function PolicyScreen({navigation}) {
  return <View style={styles.container} >
    <View style={styles.itemWrapper}>
      <Text >서비스 이용약관</Text>
      <LeftArrow/>
    </View>
    <View style={styles.itemWrapper}>
      <Text>개인정보 처리 방침 및 위치 기반 서비스 이용약관</Text>
      <LeftArrow/>
    </View>
    
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
    marginTop:15
  },
  itemWrapper: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign:"center"
    
  }
});

export default PolicyScreen;
