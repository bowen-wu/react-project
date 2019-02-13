import { SET_LOGIN_STATUS, UPDATE_USER_INFO, UPDATE_TO_DO_LIST_INFO, SET_REFRESH_HOME } from './actionTypes';

export const setLoginStatus = loginStatus => ({ 
    type: SET_LOGIN_STATUS, 
    payload: loginStatus,
});

export const updateUserInfo = userInfo => ({ 
    type: UPDATE_USER_INFO,
    payload: userInfo,
});

export const updateToDoListInfo = toDoListInfo => ({
    type: UPDATE_TO_DO_LIST_INFO,
    payload: toDoListInfo,
});

export const setRefreshHome = refreshHome => ({
    type: SET_REFRESH_HOME, 
    payload: refreshHome,
});