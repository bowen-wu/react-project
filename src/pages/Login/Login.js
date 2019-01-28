import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {}
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="title">
                Login page
                <hr />
                <Button onClick={this.goBackToHome.bind(this)}>go back to Home</Button>
            </div>
        )
    }
}

export default Login;