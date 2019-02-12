import AV from './fetch';

const { Query, User } = AV;

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

export default {
    login,
}