import {put} from 'redux-saga/effects';

import * as AuthActions from '../stores/Auth/Actions';

export function* loginSaga(action: any): any {
    console.log('loginSaga', action);

}
export function* registerSaga(action: any): any {
    console.log('registerSaga', action);

}
export function* logoutSaga(action: any): any {
    console.log('logoutSaga', action)
    yield put(AuthActions.logoutCompleted())
}