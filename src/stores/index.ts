import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import AsyncStorage from '@react-native-async-storage/async-storage';

import rootSaga from '../sagas';
import {rootReducers} from './reducers';

const persistConfig = {
  key: 'root:redux',
  storage: AsyncStorage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
  ],
};

const middleware = [];
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducers);

middleware.push(sagaMiddleware);


enhancers.push(applyMiddleware(...middleware));

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const store = createStore(persistedReducer, compose(...enhancers));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {persistor, store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
