import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import FindPopupNoList from 'src/Resource/svg/filtered-no-result-popup-image.svg';
import NoListDot from 'src/Resource/svg/filtered-no-result-popup-dot.svg';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from 'src/Util';
import {BodyLargeText} from 'src/StyledComponents/Text/bodyLarge.component';
import CustomBottomSheet from '../BottomSheet/CustomBottomSheet';
import CustomBottomSheetButton from '../BottomSheet/CustomBottomSheetButton';
import MyPageReportBottomSheetContainer from 'src/Screen/MyPage/Report/Mypage.report.bottomsheet.container';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {showBlackToast} from 'src/Util';

const NotList = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const isLoggedIn = useUserStore.getState().isLoggedIn;

  // handleOpenBottomSheet 열기
  const handleOpenBottomSheet = useCallback(() => {
    const loggedIn = isLoggedIn();

    if (loggedIn) {
      setIsBottomSheetVisible(true);
    } else {
      setIsBottomSheetVisible(false);
      showBlackToast({text1: '로그인이 필요한 서비스입니다.'});
    }
  }, [isLoggedIn]);

  // handleOpenBottomSheet 닫기
  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <BodyLargeText>조건에 해당하는 팝업 이벤트가 없어요 😥</BodyLargeText>
      <FindPopupNoList style={styles.icon} />
      <NoListText>내가 알고 있는 팝업이 있다면?</NoListText>
      <NoListDot style={styles.dot} />

      <CustomBottomSheetButton
        text="제보하러 가기"
        onPress={handleOpenBottomSheet}
        // 기존의 CustomBottomSheetButton을 재활용하되, 스타일을 커스텀 합니다.
        style={{
          marginTop: moderateScale(12),
          width: moderateScale(343),
          height: moderateScale(52),
          backgroundColor: themeColors().blue.main,
          borderColor: themeColors().blue.main,
        }}
        textStyle={{
          color: themeColors().grey.white,
          fontSize: moderateScale(18),
          fontWeight: 600,
        }}
        hideArrowIcon={true}
      />

      <CustomBottomSheet
        height="34%"
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        title="제보하는 사람이 누구인가요?">
        <MyPageReportBottomSheetContainer
          handleClose={handleCloseBottomSheet}
        />
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(66),
    backgroundColor: '#fff',
  },
  icon: {
    marginTop: moderateScale(34),
    width: '90%',
  },
  dot: {
    marginTop: moderateScale(12),
  },
});

const NoListText = styled(BodyLargeText)`
  marginTop: ${moderateScale(123)}px;
  width: ${moderateScale(214)},
  height: ${moderateScale(23)},
  color: ${themeColors().blue.main}
`;

export default NotList;
