import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Account.scss';
import Avatar from '../../common/img/logo.svg';
import Api from '../../fetch/Api';


class Account extends Component {
    constructor() {
        super();
        this.state = {}
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    async componentDidMount() {
        let res = await Api.getEventCount();
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

                <div className='account-back' onClick={this.goBackToHome.bind(this)}>
                    <Button className='account-back-button'>返回首页</Button>
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
        // dispatchLoginStatue: (status) => {
        //     return dispatch(setLoginStatus(status));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
