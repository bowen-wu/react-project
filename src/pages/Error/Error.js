import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Error.scss';
import ErrorIcon from '../../common/img/404.svg';


class Error extends Component {
    constructor() {
        super();
        this.state = {}
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="error">
                <img src={ErrorIcon} className='error-icon' alt='404' />
                <div className='error-tip'>404！抱歉，您查看的页面不存在～～</div>           
            </div>
        )
    }
}

export default Error;