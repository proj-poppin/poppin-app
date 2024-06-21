import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import React, {useEffect, useState} from 'react';
import ProfileAppBar from '../../components/ProfileAppBar.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import PasswordCheckTextFormField from '../../components/molecules/form_field/PasswordCheckTextFormField.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import useResetPassword from '../../hooks/password/useResetPassword.tsx';
import { useSelector } from 'react-redux';
import LabelAndInput from '../../components/LabelAndInput.tsx';
import GoBackSvg from "../../assets/icons/goBack.svg"
import OrderSvg from '../../assets/icons/order.svg';
import useGetUserSetting from '../../hooks/myPage/useGetUserSetting.tsx';
import useConfirmPassword from '../../hooks/myPage/useConfirmPassword.tsx';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';

export const FIND_ORDER_TYPES = [
  {label: '최신순', value: 'OPEN'},
  {label: '오래된 순', value: 'CLOSE'},
 
];

function MyReviewsList({ navigation }: any) {
  const { data: userData } = useGetUserSetting()

  const [password, setPassword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('OPEN');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const {confirmPassword,...confirmPasswordState}=useConfirmPassword()



  

  const handleSumbit = async() => {

    await confirmPassword(password)
   
  }
  useEffect(() => {
     if (confirmPasswordState.success === true) {
       navigation.navigate('PasswordChange')
       setPassword("")
    }
    
  }, [confirmPasswordState])
  
  
 

  useEffect(() => {
    navigation.setOptions(
      ProfileAppBar({
        navigation,
        appBarTitle: '작성 완료 후기',
        isHeaderRight: false,
      }),
    );
  }, [navigation]);

  const handleOrderSelect = (value: any) => {
    const orderValue = FIND_ORDER_TYPES[value].value;
    setSelectedFilter(orderValue);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>12개</Text>
         <CustomSelectDropdown
            data={FIND_ORDER_TYPES}
            onSelect={(selectedItem: any, index: any) =>
                handleOrderSelect(index)
              }
              buttonWidth={120}
              iconComponent={<OrderSvg style={styles.dropdownIcon} />}
              buttonTextAfterSelection={(selectedItem: any) =>
                selectedItem.label
                    }
              buttonTextStyle={Text14M.text}
            />
      </View>
      <View>
        <View style={styles.cardWrapper}>
          <View><Text>hi</Text></View>
        </View>
      </View>
      
     
     
    </ScrollView>
  );
}


export default MyReviewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 15,
  },
  headerText: {
    color: globalColors.font
    
    
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
  },
  cardWrapper: {
    
  },
  dropdownIcon: {
    marginLeft: 5,
     
  },
});
