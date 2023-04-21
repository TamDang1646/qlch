import {put} from 'redux-saga/effects';

import * as SettingsAction from '../stores/Settings/Actions';

export function* setSettingsSaga(): any {
    console.log('settingsSaga');
    // yield put(SettingsAction.setSettings({demo:'done saga'}))
    console.log('settingsSagaEnd');
 }
export function* clearSettingsSaga(): any {
    console.log('clearSettingsSaga');
    // yield put(SettingsAction.clearSettings())
    console.log('clearSettingsSagaEnd');
 }
export function* logSettingsSaga(): any {
    console.log('logSettingsSaga');
    yield put(SettingsAction.initSettings());
 }