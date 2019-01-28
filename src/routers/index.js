import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button } from 'antd-mobile';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Detail from '../pages/Detail/Detail';
import Account from '../pages/Account/Account';
import Error from '../pages/Error/Error';

class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="router">
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/detail" exact component={Detail} />
                    <Route path="/account" component={Account} />
                    <Route path="/error" component={Error} />
                </div>
            </BrowserRouter>
        )
    }
}

export default Routers;