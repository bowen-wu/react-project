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
                    <button className="link-button"><Link to="/">Home</Link></button>
                    <button className="link-button"><Link to="/login">Login</Link></button>
                    <button className="link-button"><Link to="/detail">Detail</Link></button>
                    <button className="link-button"><Link to="/account">Account</Link></button>
                    <button className="link-button"><Link to="/error">Error</Link></button>
                    
                    
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