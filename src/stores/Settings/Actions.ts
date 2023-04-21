import {SettingInitial} from '../../entities/ReducersEntities';
import * as types from '../Types';

export const setSettings = (settings: SettingInitial) => {
  return {
    type: types.SET_SETTINGS,
    payload: { settings },
  };
};
export const clearSettings = () => {
  return {
    type: types.CLEAR_SETTINGS,
  };
};
export const initSettings = () => {
  return {
    type: types.INIT_SETTINGS,
  };
};
export const logSettings = () => {
  return {
    type: types.LOG_SETTINGS,
  };
};