import { SET_LOGIN_STATUS, UPDATE_USER_INFO } from './actionTypes';

export const setLoginStatus = loginStatus => ({ 
    type: SET_LOGIN_STATUS, 
    payload: loginStatus,
});

export const updateUserInfo = userInfo => ({ 
    type: UPDATE_USER_INFO,
    payload: userInfo,
});