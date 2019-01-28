import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Login.scss';

class Login extends Component {
    render() {
        return (
            <div className="title">Login page</div>
        )
    }
}

export default Login;