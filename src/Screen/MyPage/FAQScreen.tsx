import React, {useState, useEffect} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import useFAQList from '../../hooks/myPage/useFAQList.tsx';
import UpSvg from '../../assets/icons/up.svg';
import DownSvg from '../../assets/icons/down.svg';
import {SafeAreaView} from 'react-native-safe-area-context';

function FAQScreen({navigation}: any) {
  const {data: initialData} = useFAQList();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleClick = (id: number) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, selected: !item.selected} : item,
      ),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headreTitle}>자주 묻는 질문</Text>
        <ScrollView style={{marginBottom: 30}}>
          {data &&
            data.map((item: any) => {
              return (
                <View
                  key={item.id}
                  style={[
                    styles.itemContainer,
                    item.selected && styles.selectedItemContainer,
                  ]}>
                  <View style={styles.itemWrapper}>
                    <Text style={{width: '85%'}}>Q. {item.question}</Text>
                    <Pressable onPress={() => handleClick(item.id)}>
                      {item.selected ? (
                        <UpSvg style={styles.svgStyle} />
                      ) : (
                        <DownSvg style={styles.svgStyle} />
                      )}
                    </Pressable>
                  </View>
                  {item.selected && (
                    <View>
                      <Text>A.{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => navigation.navigate('FAQFormScreen')}
            style={{
              borderRadius: 50,
              width: '90%',
              backgroundColor: globalColors.blue,
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              1:1문의하기
            </Text>
          </Pressable>
        </View>
      </View>
      {/* <SafeAreaView /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
  },
  headreTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    paddingLeft: 15,
  },
  itemContainer: {
    width: '100%',
    minHeight: 50,
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: globalColors.redLight,
    marginBottom: 20,
    padding: 15,
  },
  itemWrapper: {
    minHeight: 50,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  selectedItemContainer: {
    backgroundColor: globalColors.redLight,
    // 선택된 항목의 배경색
  },
  svgStyle: {
    height: 60, // SVG 높이를 30으로 설정
    width: 60, // SVG 너비를 30으로 설정
    // paddingRight: 10, // SVG 우측 패딩 유지
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default FAQScreen;
