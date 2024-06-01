/* eslint-disable */
import { FlatList, Image, Text, View } from "react-native";
import { CalendarProvider, DateData, ExpandableCalendar } from "react-native-calendars";
import React, { useState } from "react";
import StarOffSvg from "../../assets/icons/favorite.svg";
import {GetInterestPopUpListResponse} from '../../types/PopUpListData.ts';
import { MarkedDates } from "react-native-calendars/src/types";

interface LikeCalendarComponentProps {
  data: GetInterestPopUpListResponse[] | null;
}

const LikeCalendarComponent:React.FC<LikeCalendarComponentProps> = ({data}) => {

  const [selDate, setSelDate] = useState<string>(getTodayDate());

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
    return `${year}-${month}-${day}`;
  }

  return (
    <View style={{flexDirection:"column"}}>
      {/* 캘린더 컨테이너 */}
      <View style={{backgroundColor:"red"}}>
        <LikeCalendar
          selDate={selDate}
          setSelDate={setSelDate}
          data={data}/>
      </View>

      {/* 아젠다 리스트 */}
      <AgendaList
          selDate={selDate}
          setSelDate={setSelDate}
          data={data}/>
    </View>
  );
}

interface LikeCalendarProps {
  selDate: string;
  setSelDate: React.Dispatch<React.SetStateAction<string>>;
  data: GetInterestPopUpListResponse[] | null;
}

const LikeCalendar: React.FC<LikeCalendarProps> = (
  {
    selDate,
    setSelDate ,
    data}) => {

  const getMarkedDates = (data: GetInterestPopUpListResponse[] | null, selDate: string) => {
    data?.forEach((item) => {
      item.id
      item.name
      item.close_date
      item.open_date
      // console.log(`${item.id} ${item.name} ${item.close_date} ${item.open_date}`)
      // console.log(`${selDate}`)
    })

    const markedOpenDates: MarkedDates = data?.reduce((acc, item) => {
      if (!acc[item.open_date]) {
        acc[item.open_date] = {type:'multi-dot', marked:true, dots: [{key:'dot1', color:'red'}, {key:'dot2', color:'red'}]};
      }
      if (!acc[item.open_date]) {
        acc[item.open_date] = {type:'multi-dot', marked:true, dots: [{key:'dot1', color:'red'}, {key:'dot2', color:'red'}] };
      }
      // acc[item.open_date].dots.push({ key: item.id.toString(), color: 'red' });
      // console.log(acc);
      return acc;
    }, {} as MarkedDates);

    return markedOpenDates;
  }

  return (
    <CalendarProvider date={selDate}>
      <ExpandableCalendar
        initialPosition={ExpandableCalendar.positions.OPEN}
        disablePan={false} //we need this
        disableWeekScroll={true}
        animateScroll={true}
        onDayPress={(date: DateData) => {setSelDate(date.dateString)}}
        markedDates={getMarkedDates(data, selDate)}
        // markedDates={marked.current}
        // leftArrowImageSource={leftArrowIcon}
        // rightArrowImageSource={rightArrowIcon}
      />
    </CalendarProvider>
  );
}

const AgendaList: React.FC<LikeCalendarProps>  = ({
                      selDate,
                      setSelDate ,
                      data}) => {

  type ItemData = {
    item: GetInterestPopUpListResponse;
  }
  const renderItem = ({item}:ItemData, selDate:string, setSeldate:React.Dispatch<React.SetStateAction<string>>) => {

    // console.log(selDate);
    console.log(item);
    return <View style={{height:147, backgroundColor:"white", borderWidth:0, padding:16, marginBottom:2}}>

      {/* 아이템 전체 container */}
      <View style={{flex:1, flexDirection:"row", backgroundColor:"white", alignItems:'center'}}>
        {/* 이미지 */}
        <Image style={{width:124, height:124, borderRadius:8, marginRight:20 }} source={{uri: item.image_url}}/>

        {/* 텍스트 컨테이너 */}
        <View style={{backgroundColor:"white", height:'100%'}}>
          {/* 라운드 텍스트 박스 */}
          <View style={{flexDirection:"column", width:82, height:24, backgroundColor:"#FAF4FC", alignItems:'center', justifyContent:'center', borderRadius:30}}>
            <Text style={{fontSize:12, fontWeight:"600"}}>오픈 D-day</Text>
          </View>
          {/* 팝업 스토어 이름*/}
          <View style={{width:166, height:46}}>
            <Text style={{fontWeight:"600", fontSize:18, marginTop:8.5}}>{item.name}</Text>
          </View>
          {/* 날짜 */}
          <View style={{width:166, height:16}}>
            <Text style={{fontWeight:"400", fontSize:12, marginTop:2, color:"#9F9F9F"}}>2024.01.01~2024.02.02</Text>
          </View>
        </View>

        {/* 별 이미지 */}
        <View style={{flex:1,height:'100%', alignItems:'flex-end', backgroundColor:'white'}}>
          {/*<Image style={{width:24, height:24, borderRadius:8 }} source={require('../../assets/likes/starOff.svg')}/>*/}
          <StarOffSvg />
        </View>

      </View>
    </View>
  }

  return (
    <FlatList
      data={data}
      renderItem={(props) => renderItem(props, selDate, setSelDate)}>
    </FlatList>
  );
}

export default LikeCalendarComponent;
