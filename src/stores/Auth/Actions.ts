import * as types from '../Types';

export const authLoading = () => {
  return {
    type: types.AUTH_LOADING,
  };
};

export const signupCompleted = (user: any) => {
  return {
    type: types.SIGNUP_COMPLETED,
    payload: { user },
  };
};

export const loginCompleted = (user: any) => {
  return {
    type: types.LOGIN_COMPLETED,
    payload: { user },
  };
};

export const loginError = (errorCode: string, errorMsg: string) => {
  return {
    type: types.LOGIN_ERROR,
    payload: { errorCode, errorMsg },
  };
};

export const verifyOtpCompleted = (data: any) => {
  return {
    type: types.VERIFY_OTP_COMPLETED,
    payload: { data },
  };
};

export const logoutCompleted = () => {
  return {
    type: types.LOGOUT_COMPLETED,
    // payload: undefined,
  };
};