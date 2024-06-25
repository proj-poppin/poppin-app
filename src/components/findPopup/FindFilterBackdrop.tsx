import BottomSheet from '@gorhom/bottom-sheet';
import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
function FindFilterBottomSheet({visible, onClose}: any) {
  const bottomSheetRef = useRef<any>(null);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['1%', '95%']} index={0}>
      <View style={styles.bottomSheetContent}>
        <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 20}}>
          찾고 싶은 팝업의 카테고리를 선택해 주세요
        </Text>
        <View>
          <Text>팝업 카테고리</Text>
        </View>
      </View>
    </BottomSheet>
  );
}

export default FindFilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
