import {DEFAULT_USER_AVATAR} from '../../constants';
import {AuthInitial} from '../../entities/ReducersEntities';

export const INITIAL_STATE: AuthInitial = {
  phoneNum: '',
  deviceId: '',
  password: '',
  userCode: '',
  userFullName: '',
  userAvatar: DEFAULT_USER_AVATAR,
  user: {
    id: 0,
    code: '',
    name: '',
    email: '',
    gender: 0,
    address: null,
    phoneNumber: '',
    avatar: ''
  },
  isLoading: false,
  loggedIn: false,
  errorCode: 0,
  errorMessage: '',
  isNew: false,
};