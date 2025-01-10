import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createContext, useContext, useState} from 'react';
import {axiosMypageWithdraw} from 'src/Axios/Mypage/mypage.delete.axios';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {useUserStore} from 'src/Zustand/User/user.zustand';

interface WithdrawContextType {
  reasons: string[];
  isModalVisible: boolean;
  toggleReason: (reason: string) => void;
  isValid: boolean;
  onCloseSubmit: () => void;
  onSubmitWithdraw: () => void;
  onDoubleCheckSubmit: () => void;
}

export const MypageWithdrawContext = createContext<
  WithdrawContextType | undefined
>(undefined);

export const MypageWithdrawProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const logout = useUserStore(state => state.logout);
  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const [reasons, setReasons] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleReason = (reason: string) => {
    setReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason],
    );
  };

  const isValid = reasons.length > 0;
  const onCloseSubmit = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };
  const onSubmitWithdraw = async () => {
    setIsModalVisible(true);
  };

  const onDoubleCheckSubmit = async () => {
    const response = await axiosMypageWithdraw();
    if (response.data) {
      setIsModalVisible(false);
      navigation.goBack();
      logout();
    }
  };

  return (
    <MypageWithdrawContext.Provider
      value={{
        reasons,
        toggleReason,
        isValid,
        onSubmitWithdraw,
        onCloseSubmit,
        isModalVisible,
        onDoubleCheckSubmit,
      }}>
      {children}
    </MypageWithdrawContext.Provider>
  );
};

export const useWithdrawContext = () => {
  const context = useContext(MypageWithdrawContext);
  if (!context) {
    throw new Error('useWithdrawContext must be used within WithdrawProvider');
  }
  return context;
};
