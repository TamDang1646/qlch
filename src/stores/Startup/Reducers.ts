import * as types from '../Types';
import {INITIAL_STATE} from './InitialState';

interface startupDone {
  type: typeof types.STARTUP_DONE
}
interface startupLoading {
  type: typeof types.STARTUP_LOADING
}
interface startupError {
  type: typeof types.STARTUP_ERROR,
  payload: {
    errMsg: string
    errCode: number
  }
}

export type StartupActions =
  | startupDone
  | startupLoading
  | startupError

export default function (state = INITIAL_STATE, action: StartupActions) {
  switch (action.type) {
    case types.STARTUP_DONE:
      return {
        ...state,
        loading: false,
        error: false,
        isMaintenance: false
      };
    case types.STARTUP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload.errMsg,
        errorCode: action.payload.errCode,
        isMaintenance: true
      };
    case types.STARTUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}