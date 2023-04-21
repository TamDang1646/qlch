import {User} from '../../entities/User';
import * as types from '../Types';
import {INITIAL_STATE} from './InitialState';

interface signupCompleted  {
    type: typeof types.SIGNUP_COMPLETED,
    payload: { user:User },
}

interface loginCompleted {
    type: typeof types.LOGIN_COMPLETED,
    payload: { user:User },
}

interface loginError {

    type:typeof types.LOGIN_ERROR,
    payload: { errorCode:any, errorMsg:any },

}
interface loginError {

    type:typeof types.LOGIN_ERROR,
    payload: { errorCode:any, errorMsg:any },

}
export interface logoutCompleted {
    type: typeof types.LOGOUT_COMPLETED,
    // payload: undefined,
}
export type AuthActions = signupCompleted|loginCompleted|loginError|logoutCompleted
export default function (state = INITIAL_STATE, action: AuthActions) {
    switch (action.type) {
        case types.LOGIN_COMPLETED:
            console.log('login completed',action.payload.user)
            return {
                ...state,
                user:{...action.payload.user},
                loggedIn:true
            }            
        case types.LOGIN_ERROR:
            return {
                ...state,
                loggedIn:false
            }
        case types.SIGNUP_COMPLETED:
            return {
                ...state,
                user:{...action.payload.user},
                loggedIn:true
            }    
        case types.LOGOUT_COMPLETED:           
            return {
                ...INITIAL_STATE
            }    
        default:
            return state
    }
}