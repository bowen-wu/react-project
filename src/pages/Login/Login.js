import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, List, InputItem, Toast } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';
import { setLoginStatus, updateUserInfo } from '../../redux/actions';
import Logo from '../../common/img/logo.svg';


import './Login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            submitActive: false,
        }
    }
    login() {

    }
    render() {
        return (
            <div className='login'>
                <div className='login-logo-wrapper'>
                    <img src={Logo} className='login-logo' alt='logo' />
                </div>
                <div className='login-form'>
                    <List className='login-form-row'>
                        <InputItem maxLength='6' placeholder='请输入用户名'></InputItem>
                    </List>
                    <List className='login-form-row'>
                    <InputItem maxLength='16' placeholder='请输入密码'></InputItem>
                    </List>
                </div>
                <div className='login-submit' onClick={this.login.bind(this)}>
                    <Button className='submit-button' activeClassName='submit-button-active' loading={this.state.submitActive} disabled={this.state.submitActive}>确定</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    let {loginStatus, userInfo} = state;
    return {
        loginStatus,
        userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLoginStatue: (status) => {
            return dispatch(setLoginStatus(status));
        },
        dispatchUserInfo: (userInfo) => {
            return dispatch(updateUserInfo(userInfo))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);