import { SET_LOGIN_STATUS, UPDATE_USER_INFO, UPDATE_TO_DO_LIST_INFO, SET_REFRESH_HOME } from './actionTypes';

const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {};
let {userId} = userInfo;

let initState = {
    loginStatus: userId ? true : false,
    userInfo,
    toDoListInfo: {
        toDoList: [],
        totalPage: 1,
        pageNo: 1,
        searchContent: undefined,
    },
    refreshHome: true,
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LOGIN_STATUS:
            return {
                ...state,
                loginStatus: payload
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                userInfo: payload,
            }
        case UPDATE_TO_DO_LIST_INFO: 
            return {
                ...state,
                toDoListInfo: payload,
            }
        case SET_REFRESH_HOME: 
            return {
                ...state,
                refreshHome: payload,
            }
        default:
            return state
    }
}