import {
  all,
  takeLatest,
} from 'redux-saga/effects';

import * as types from '../stores/Types';
import {
  loginSaga,
  registerSaga,
} from './AuthSaga';
import {
  clearSettingsSaga,
  logSettingsSaga,
  setSettingsSaga,
} from './SettingsSaga';
import {startup} from './StartupSaga';

export default function* root() {
  console.log('init saga...');
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    // Call `fetchUser()` when a `FETCH_USER` action is triggered

    // ExampleTypes
    // takeLatest(types.CHECK_PHONE_NUM, verifyPhoneNumber),
    takeLatest(types.STARTUP, startup),
    takeLatest(types.SET_SETTINGS, setSettingsSaga),
    takeLatest(types.CLEAR_SETTINGS, clearSettingsSaga),
    takeLatest(types.LOG_SETTINGS, logSettingsSaga),
    takeLatest(types.LOGIN_COMPLETED, loginSaga),
    takeLatest(types.SIGNUP_COMPLETED, registerSaga),
  ]);
}
