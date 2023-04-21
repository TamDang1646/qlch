import {put} from 'redux-saga/effects';

import {useAppSelector as UseAppSelector} from '../stores';
import * as AuthActions from '../stores/Auth/Actions';
import * as SettingsAction from '../stores/Settings/Actions';
import * as StartupActions from '../stores/Startup/Actions';

export function* startup(): any {
    console.log('startupSagaStart');
    
    yield put(StartupActions.startupLoading());
    yield put(SettingsAction.initSettings());
    const { user } = UseAppSelector(state => state.auth)
    if (user) { 
        yield put(AuthActions.loginCompleted(user))
    } else {
        yield put(AuthActions.loginError('1000','Chưa đăng nhập'))
    }
    console.log('startupSagaEnd');
    yield put(SettingsAction.setSettings({ demo: 'done saga' }))
    yield put(StartupActions.startupDone());
 }