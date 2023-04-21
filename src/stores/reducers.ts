import {combineReducers} from 'redux';

import AuthReducer from './Auth/Reducers';
import SettingsReducer from './Settings/Reducers';

export const rootReducers = combineReducers({
    auth: AuthReducer,
    settings: SettingsReducer,
});