import { SET_LOGIN_STATUS } from './actionTypes';

export const setLoginStatus = loginStatus => ({ 
    type: SET_LOGIN_STATUS, 
    payload: loginStatus,
});