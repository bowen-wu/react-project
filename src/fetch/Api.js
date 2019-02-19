import { Toast } from 'antd-mobile';

import AV from './fetch';

const { Query, User } = AV;
const limitNum = 10;

async function instance({method}) {
    try {
        const res = await method;
        return res;
    } catch (error) {
        if(error.message.indexOf('Username has already been taken.') >= 0) {
            Toast.info('用户名已经被占用', 2);
        } else {
            console.error('api error', error.message);
        }
    }
}

function login({username, password}) {
    return instance({method: User.logIn(username, password)});
}

function signup({username, password}) {
    let user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    return instance({method: user.signUp()});
}

async function getToDoList({userId, searchTitle = '', pageNo = 1}) {
    let skipNum = (pageNo - 1) * limitNum;
    let query = new AV.Query('ToDoList');
    query.equalTo('userId', userId);
    query.contains('title', searchTitle);
    query.limit(limitNum);
    query.skip(skipNum);
    let count = await instance({method: query.count()});
    let pageObj = {
        count,
        pageNo,
        totalPage: Math.ceil(count/limitNum),
    }
    let list = await instance({method: query.find()});
    return {pageObj, list};
}

function addTodo({content, location, person, time, title, userId, status}) {
    let ToDoList = AV.Object.extend('ToDoList');
    let toDoList = new ToDoList();
    toDoList.set('content', content);
    toDoList.set('location', location);
    toDoList.set('person', person);
    toDoList.set('time', time);
    toDoList.set('title', title);
    toDoList.set('userId', userId);
    toDoList.set('status', status);

    return instance({method: toDoList.save()});
}

async function getEventCount({userId}) {
    let query = new AV.Query('ToDoList');
    query.equalTo('userId', userId);
    query.equalTo('status', 0);
    let todoCount = await instance({method: query.count()});
    query.equalTo('status', 1);
    let completeCount = await instance({method: query.count()});
    return {todoCount, completeCount};
}

function getEventDetail({eventId}) {
    let query = new AV.Query('ToDoList');
    query.equalTo('objectId', eventId);
    return instance({method: query.find()});
}

function completeEvent(eventId) {
    let todo = AV.Object.createWithoutData('ToDoList', eventId);
    todo.set('status', 1);
    return instance({method: todo.save()});
}

function deleteEvent(eventId) {
    let todo = AV.Object.createWithoutData('ToDoList', eventId);
    return instance({method: todo.destroy()});
} 

function logout() {
    return instance({method: AV.User.logOut()});
}

export default {
    login,
    getToDoList,
    signup,
    addTodo,
    getEventCount,
    getEventDetail,
    completeEvent,
    deleteEvent,
    logout,
}