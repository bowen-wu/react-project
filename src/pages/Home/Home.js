import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <div className="title">
            This is Home page
            </div>
        )
    }
}

export default Home;