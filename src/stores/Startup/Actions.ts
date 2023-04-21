import * as types from '../Types';

export const startupDone = () => {
  return {
    type: types.STARTUP_DONE,
  };
};

export const startupLoading = () => {
  return {
    type: types.STARTUP_LOADING,
  };
};

export const startup = () => {
  return {
    type: types.STARTUP,
  };
};

export const startupError = (errCode: number, errMsg: string) => {
  return {
    type: types.STARTUP_ERROR,
    payload: { errCode, errMsg },
  };
};

