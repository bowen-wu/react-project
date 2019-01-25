import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import logo from './common/img/logo.svg';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <img src={logo} alt=''/>
                <Button>default</Button>
                <Button type="primary">primary</Button>
            </div>
        );
    }
}

export default App;
