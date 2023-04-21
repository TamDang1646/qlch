import * as types from '../Types';
import {clearSettings} from './Actions';
import {INITIAL_STATE} from './InitialState';

interface initSettings {
  type: typeof types.INIT_SETTINGS,
}
interface setSettings {
  type: typeof types.SET_SETTINGS,
  payload: {
    settings: any
  }
}
interface clearSettings {
  type: typeof types.CLEAR_SETTINGS,
}
interface logSettings {
  type: typeof types.LOG_SETTINGS,
}
export type SettingsActions = setSettings | clearSettings | logSettings | initSettings
export default function (state = INITIAL_STATE, action: SettingsActions) {
    switch (action.type) {
      case types.INIT_SETTINGS:
        console.log('INIT_SETTINGS');
        return state
      case types.SET_SETTINGS:
        console.log('SET_SETTINGS');
        return ({
          ...state,
          demo: action.payload.settings['demo']
        })
      case types.CLEAR_SETTINGS:
        console.log('CLEAR_SETTINGS')
        return ({...INITIAL_STATE})
      case types.LOG_SETTINGS:
        console.log('LOG_SETTINGS')
        return state
      default:
          return state;
    }
}