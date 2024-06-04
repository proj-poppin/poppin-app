/* eslint-disable */
import { Image, StyleSheet, Text, View } from "react-native";
import { Agenda, AgendaEntry, Calendar, AgendaSchedule } from "react-native-calendars";
import { useState } from "react";
import StarOffSvg from '../../assets/icons/favorite.svg';

const LikeCalendarView = () => {
  const [selDayInfo, setSelDayInfo] = useState({});

  const agendaSchedule: AgendaSchedule = {
    '2024-05-22': [{ name: 'Meeting with Bob', height: 157, day:'22' }],
    '2024-05-23': [{ name: 'Lunch with Sarah', height: 157, day:'23' }],
  };


  const renderEmptyDate = () => {
    return (
      <View></View>
    );
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return <View style={{height:reservation.height, backgroundColor:"white", borderWidth:0, padding:16, marginBottom:2}}>

      {/* 아이템 전체 container */}
      <View style={{flex:1, flexDirection:"row", backgroundColor:"white", alignItems:'center'}}>
        {/* 이미지 */}
        <Image style={{width:124, height:124, borderRadius:8, marginRight:20 }} source={require('../../assets/likes/likeDummy.png')}/>

        {/* 텍스트 컨테이너 */}
        <View style={{backgroundColor:"white", height:'100%'}}>
          {/* 라운드 텍스트 박스 */}
          <View style={{flexDirection:"column", width:82, height:24, backgroundColor:"#FAF4FC", alignItems:'center', justifyContent:'center', borderRadius:30}}>
            <Text style={{fontSize:12, fontWeight:"600"}}>오픈 D-day</Text>
          </View>
          {/* 팝업 스토어 이름*/}
          <View style={{width:166, height:46}}>
            <Text style={{fontWeight:"600", fontSize:18, marginTop:8.5}}>팝업스토어이름팝업스토어</Text>
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
    <View>
      <Agenda
        style={{height:1000}}
        items={agendaSchedule}
        renderItem={renderItem}
        renderDay={() => {return <View/>}}
        renderEmptyDate={renderEmptyDate}
        onDayChange={day => {
        }}
        onDayPress={day => {
        }}
        />



    </View>

  );
};

const styles = StyleSheet.create({});
export default LikeCalendarView;

