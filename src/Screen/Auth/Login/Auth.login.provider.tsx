// Auth.login.provider.tsx
import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import {isValidEmail} from '../../../Util';
import {axiosLoginWithEmailPassword} from '../../../Axios/Auth/auth.axios';
import {useUserStore} from '../../../Zustand/User/user.zustand';

type Inputs = {
  email: string;
  password: string;
};

type AuthLoginState = {
  inputs: Inputs;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
};

const initialAuthLoginState: AuthLoginState = {
  inputs: {email: '', password: ''},
  emailError: '',
  passwordError: '',
  isLoading: false,
};

type AuthLoginAction =
  | {type: 'SET_INPUTS'; payload: Partial<Inputs>}
  | {type: 'SET_EMAIL_ERROR'; payload: string}
  | {type: 'SET_PASSWORD_ERROR'; payload: string}
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'CLEAR_ERRORS'}
  | {type: 'RESET'};

function authLoginReducer(
  state: AuthLoginState,
  action: AuthLoginAction,
): AuthLoginState {
  switch (action.type) {
    case 'SET_INPUTS':
      return {...state, inputs: {...state.inputs, ...action.payload}};
    case 'SET_EMAIL_ERROR':
      return {...state, emailError: action.payload};
    case 'SET_PASSWORD_ERROR':
      return {...state, passwordError: action.payload};
    case 'SET_LOADING':
      return {...state, isLoading: action.payload};
    case 'CLEAR_ERRORS':
      return {...state, emailError: '', passwordError: ''};
    case 'RESET':
      return initialAuthLoginState;
    default:
      return state;
  }
}

type AuthLoginContextType = AuthLoginState & {
  setInputs: (input: Partial<Inputs>) => void;
  setEmailError: (error: string) => void;
  setPasswordError: (error: string) => void;
  tryLogin: () => Promise<boolean>;
};

const AuthLoginContext = createContext<AuthLoginContextType | undefined>(
  undefined,
);

export const useAuthLoginContext = () => {
  const context = useContext(AuthLoginContext);
  if (!context)
    throw new Error('AuthLoginContext must be used within AuthLoginProvider');
  return context;
};

export function AuthLoginProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(authLoginReducer, initialAuthLoginState);

  const setInputs = (input: Partial<Inputs>) =>
    dispatch({type: 'SET_INPUTS', payload: input});
  const setEmailError = (error: string) =>
    dispatch({type: 'SET_EMAIL_ERROR', payload: error});
  const setPasswordError = (error: string) =>
    dispatch({type: 'SET_PASSWORD_ERROR', payload: error});

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const tryLogin = async (): Promise<boolean> => {
    dispatch({type: 'SET_LOADING', payload: true});
    dispatch({type: 'CLEAR_ERRORS'});

    const {email, password} = state.inputs;

    // if (!isValidEmail(email)) {
    //   setEmailError('Invalid email format');
    //   dispatch({type: 'SET_LOADING', payload: false});
    //   return false;
    // }
    //
    // if (!isValidPassword(password)) {
    //   setPasswordError(
    //     'Password must be at least 8 characters and include letters, numbers, and special characters',
    //   );
    //   dispatch({type: 'SET_LOADING', payload: false});
    //   return false;
    // }

    try {
      const loginResponse = await axiosLoginWithEmailPassword({
        email: email.trim(),
        password: password.trim(),
      });
      if (loginResponse?.success) {
        await useUserStore.getState().setLoggedInUserInfo(loginResponse);
        return true;
      }

      // Set error based on response error code
      if (loginResponse?.error?.code === '40400')
        setEmailError('X 등록되지 않은 사용자에요');
      else if (loginResponse?.error?.code === '40019')
        setPasswordError('X 잘못된 비밀번호에요');
      else setEmailError('X 등록되지 않은 사용자에요');
    } catch (error) {
      console.log('error: ', error);
      setEmailError('An unexpected error occurred');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
    return false;
  };

  return (
    <AuthLoginContext.Provider
      value={{
        ...state,
        setInputs,
        setEmailError,
        setPasswordError,
        tryLogin,
      }}>
      {children}
    </AuthLoginContext.Provider>
  );
}
