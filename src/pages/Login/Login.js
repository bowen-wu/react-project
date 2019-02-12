import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createForm } from 'rc-form';


import { Button, List, InputItem, Toast } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';
import { setLoginStatus, updateUserInfo } from '../../redux/actions';
import Logo from '../../common/img/logo.svg';
import Api from '../../fetch/Api';


import './Login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            submitActive: false,
        }
    }
    async login() {
        if(this.state.submitActive) {
            return;
        }
        this.props.form.validateFields(async (error, value) => {
            if (error) {
                Toast.fail('请填写完整信息', 1);
                return;
            };
            this.setState({
                submitActive: true
            });
    
            let {username, password} = value;
            let res = await Api.login({username, password});
            if(res) {
                this.props.dispatchUserInfo({...this.props.userInfo, username});
                localStorage.removeItem('userInfo');
                localStorage.setItem('userInfo', JSON.stringify({username, timer: Date.now()}));
        
                this.props.dispatchLoginStatue(true);
                this.props.history.push('/');
            } else {
                this.setState({
                    submitActive: false
                });
            } 
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='login'>
                <div className='login-logo-wrapper'>
                    <img src={Logo} className='login-logo' alt='logo' />
                </div>
                <div className='login-form'>
                    <List className='login-form-row'>
                        <InputItem {...getFieldProps('username', {
                                rules: [{
                                    'required': true
                                }]
                            })} maxLength='10' placeholder='请输入用户名'></InputItem>
                    </List>
                    <List className='login-form-row'>
                        <InputItem {...getFieldProps('password', {
                                rules: [{
                                    'required': true
                                }]
                            })} type='password' maxLength='16' placeholder='请输入密码'></InputItem>
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

export default createForm()(connect(mapStateToProps, mapDispatchToProps)(Login));