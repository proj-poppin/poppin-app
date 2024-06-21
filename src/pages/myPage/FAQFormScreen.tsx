import React, { useState, useCallback } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import ImagePicker from 'react-native-image-crop-picker';

function FAQFormScreen({ navigation }: any) {
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState('apple');
  const [items, setItems] = useState([
    {label: '문의 유형을 선택해주세요.', value: 'apple'},
    { label: '불편사항 및 개선사항', value: 'banana' },
    { label: '정보 및 시스템 오류', value: 'banana' },
    {label: '기타 문의', value: 'banana'},
  ]);
  const [content, setContent] = useState("")
  const [error,setError]=useState(false)
  
  const handleSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length, // 최대 5개까지 선택 가능
    })
      .then(images => {
        // 선택된 이미지들을 상태에 추가
        const newImages = images.map(image => ({
          uri: image.path,
          width: image.width,
          height: image.height,
        }));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
      })
      .catch(error => {
        console.log(error);
      });
  };

 const handleRemoveImage = useCallback(indexToRemove => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
 }, []);
  
  
  const handleChangeText = (text: string) => {
    setContent(text); // 입력된 내용을 content 상태에 반영
    if (text.length >= 10 && text.length <= 1000) {
      setError(false); // 글자 수 조건을 만족하면 에러 상태를 false로 설정
      console.log("글자 수가 조건을 만족합니다.");
    } else {
      setError(true); // 글자 수 조건을 만족하지 않으면 에러 상태를 true로 설정
      console.log("글자 수가 조건을 만족하지 않습니다.");
    }
  };

  const handleSubmit = () => {
    console.log("hi")
  }


  return (
    <>
    <View style={styles.container}>
        <Text style={styles.headreTitle}>더 나은 POPPIN을 위한 {'\n'}여러분의 소중한 의견에 감사드립니다.</Text>
        <Text style={{padding:10,color:globalColors.font}}> 팝핀(POPIN)을 이용하면서 느끼신 불편/개선/보완 사항이 있다면 알려주세요. 소중한 의견을 참고하여 더 나은 팝핀(POPIN)이 되도록 노력하겠습니다.</Text>
        <ScrollView>
            <View style={{ padding: 20 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
              setItems={setItems}
          style={{borderRadius:20,borderColor:globalColors.font}}
            />
            <TextInput
          style={styles.introduceInput}
          value={content}
          onChangeText={handleChangeText}
          placeholder={'내용을 입력해주세요.(최소 10자, 최대 1000자)ㄴ'}
          multiline={true}
            />
            {error && <Text style={{color:"red",marginBottom:10,marginTop:3,paddingLeft:5}}>글자 수가 10개 이상 1000이하 여야 합니다.</Text>}
         <ImageContainerRow
            selectedImages={selectedImages}
            handleSelectImages={handleSelectImages}
            handleRemoveImage={handleRemoveImage}
            />   
            <View style={{marginTop:20}}>
              <View style={styles.dotTextContainer}>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.descText}>문의사항은 접수 후 수정이 불가합니다.</Text>
      </View>
      <View style={styles.dotTextContainer}>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.descText}>첨부파일은 20MB 이하의 파일만 첨부 가능하며, 최대 5개까지 등록 가능합니다.</Text>
      </View>
      <View style={styles.dotTextContainer}>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.descText}>이미지에 개인정보가 보이지 않도록 주의 바랍니다.</Text>
      </View>
            </View>  
       </View>
        
        </ScrollView>
      <View style={[styles.buttonContainer]}>
          <Pressable
            disabled={error}
            onPress={handleSubmit}
            style={[!error?{backgroundColor:globalColors.blue}:{backgroundColor:globalColors.stroke},{ borderRadius: 50, width: "90%",  height: "90%", display: "flex", justifyContent: "center", }]}>
          <Text style={{color:"white",textAlign:"center",fontSize:18}}>문의하기</Text>
        </Pressable>
      </View>
    </View>
    <SafeAreaView/> 
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    // paddingHorizontal: 20,
  },
   dotTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headreTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    paddingLeft: 10,
    marginTop:15
  },
    dot: {
    width: 20,
    textAlign: 'center',
   
  },
  descText: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10, // 들여쓰기를 위한 왼쪽 마진 추가
  },
  itemContainer: {
    minHeight: 50,
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: globalColors.redLight, 
    marginBottom: 20,
    padding: 10,
    
  },
   itemWrapper: {
    minHeight: 50,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
     justifyContent: 'space-between',
  },
    selectedItemContainer: {
      backgroundColor: globalColors.purple,
      // 선택된 항목의 배경색
  },
    introduceInput: {
      minHeight: 200, // 입력 필드의 ,
      height:'auto',
    borderWidth: 1,
    borderColor: globalColors.warmGray, // 테두리 색상
    borderRadius: 15, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
  },
  svgStyle: {
    height: 60, // SVG 높이를 30으로 설정
    width: 60, // SVG 너비를 30으로 설정
    // paddingRight: 10, // SVG 우측 패딩 유지
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBox: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  boxText: {
    fontSize: 16,
  },
  descText: {
    color:globalColors.font
  }
});

export default FAQFormScreen;
