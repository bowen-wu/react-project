import React, { Component } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom';

import Routes from './router'
import { routerConfig } from './router.config';

class Routers extends Component {
    constructor(props) {
        super();
        this.state = {
            basename: ''
        }
    }
    componentWillMount() {
        if(window.location.host.indexOf('localhost') < '0') {
            this.setState({basename: '/react-project/build/index.html'})
        }
        
    }
    render(){
        return(
            <BrowserRouter basename={this.state.basename}>
                <Switch>
                    <Routes config={routerConfig} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routers;