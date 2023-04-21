import {StartupInitial} from '../../entities/ReducersEntities';

/**
 * The initial values for the redux state.
 */

export const INITIAL_STATE: StartupInitial = {
  deviceId: '',
  loading: true,
  error: false,
  errorMsg: '',
  isOnlineSocket: false,
  locale: 'vi',
  deviceToken: '',
};
