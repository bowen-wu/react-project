import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Detail from '../pages/Detail/Detail';
import Account from '../pages/Account/Account';
import Error from '../pages/Error/Error';

export const routerConfig = [
    {
        path: '/',
        component: Home,
        auth: true,
    }, {
        path: '/login',
        component: Login,
    }, {
        path: '/detail',
        component: Detail,
        auth: true,
    }, {
        path: '/error',
        component: Error,
    }, {
        path: '/account',
        component: Account,
        auth: true,
    }
];