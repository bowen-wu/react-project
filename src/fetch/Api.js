import AV from './fetch';

const { Query, User } = AV;
const limitNum = 10;

async function instance({method}) {
    try {
        const res = await method;
        return res;
    } catch (error) {
        console.error('api error', error.message);
    }
}

function login({username, password}) {
    return instance({method: User.logIn(username, password)});
}

async function getToDoList({userId, pageNo = 1}) {
    let skipNum = (pageNo - 1) * limitNum;
    let query = new AV.Query('ToDoList');
    query.equalTo('userId', userId);
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

export default {
    login,
    getToDoList,
}