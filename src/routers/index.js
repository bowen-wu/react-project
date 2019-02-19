import React, { Component } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom';

import Routes from './router'
import { routerConfig } from './router.config';

class Routers extends Component {
    render(){
        return(
            <BrowserRouter basename='/react-project/build/index.html'>
                <Switch>
                    <Routes config={routerConfig} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routers;