import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';
import { setLoginStatus, setRefreshHome } from '../../redux/actions';


import './Account.scss';
import Avatar from '../../common/img/logo.svg';
import Api from '../../fetch/Api';


class Account extends Component {
    constructor() {
        super();
        this.state = {
            logoutStatus: false,
        }
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    async logout() {
        this.setState({logoutStatus: true});
        let res = await Api.logout();
        if(res) {
            localStorage.removeItem('userInfo');

            this.props.dispatchLoginStatue(false);
            this.props.dispatchRefreshHome(true);
            this.props.history.push('/login');
        }
        this.setState({logoutStatus: false});

    }
    async componentDidMount() {
        let {userId} = this.props.userInfo;
        let res = await Api.getEventCount({userId});
        if(res) {
            let {todoCount, completeCount} = res;
            this.setState({todoCount, completeCount});
        }
    }
    render() {
        return (
            <div className='account'>
                <div className='account-main'>
                    <div className='account-main-avatar'>
                        <img src={Avatar} className='account-main-avatar-icon' alt='logo' />
                    </div>
                    <div className='home-content-account-main-username'>{this.props.userInfo.username}</div>
                </div>
                <div className='account-content'>
                    <div className='account-content-item'>
                        <div className='account-content-item-title'>未完成事件数：</div>
                        <div className='account-content-item-number'>{this.state.todoCount}</div>
                    </div>
                    <div className='account-content-item'>
                        <div className='account-content-item-title'>已完成事件数：</div>
                        <div className='account-content-item-number'>{this.state.completeCount}</div>
                    </div>
                </div>

                <div className='account-action'>
                    <Button className='account-action-back' onClick={this.goBackToHome.bind(this)}>返回首页</Button>
                    <Button className='account-action-logout' disabled={this.state.logoutStatus} onClick={this.logout.bind(this)}>退出登录</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    let {userInfo, toDoListInfo} = state;
    return {
        userInfo,
        toDoListInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLoginStatue: (status) => {
            return dispatch(setLoginStatus(status));
        },
        dispatchRefreshHome: (isRefresh) => {
            return dispatch(setRefreshHome(isRefresh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
