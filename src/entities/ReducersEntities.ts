import {Posts} from './Post';
import {User} from './User';

export interface SettingInitial{
    demo: string;
}
export interface StartupInitial{
  deviceId: string;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  isOnlineSocket: boolean;
  locale: string;
  deviceToken: string;
}
export interface AuthInitial {
  phoneNum?: string;
  deviceId?: string;
  password?: string;
  userCode?: string;
  userFullName?: string;
  userAvatar?: string;
  user?: User;
  isLoading?: boolean;
  loggedIn?: boolean;
  errorCode?: number;
  errorMessage?: string;
  isNew?: boolean;
  phoneNumVerified?: boolean;
  accessToken?: string;
}

export interface PostsReducer{
  posteds: Posts[];
  search: Posts[];
}