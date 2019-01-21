import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Button>default</Button>
                <Button type="primary">primary</Button>
            </div>
        );
    }
}

export default App;
