import React, { Component } from 'react';

import Routers from './routers/index';


import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Routers />
            </div>
        );
    }
}

export default App;
