import { SET_LOGIN_STATUS, UPDATE_USER_INFO } from './actionTypes';

const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {};
let {userName} = userInfo;

let initState = {
    loginStatus: userName ? true : false,
    userInfo,
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
        default:
            return state
    }
}