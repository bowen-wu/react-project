import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, Toast } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';
import { setRefreshHome } from '../../redux/actions';


import './Detail.scss';
import Api from '../../fetch/Api';
import Back from '../../common/img/back.svg';


class Detail extends Component {
    constructor() {
        super();
        this.state = {
            eventId: '',
            eventDetail: [],
            title: '', 
            status: 0,
        }
    }
    async componentDidMount() {
        let eventId = window.location.href.split('?')[1].split('&')[0].split('=')[1];
        let res = await Api.getEventDetail({eventId});
        if(res) {
            let {attributes: {content, location, person, status, time, title}, createdAt, updatedAt} = res[0];
            let limitTime = Util.timeStampChangeDate(time);
            let createTime = Util.timeStampChangeDate(Util.dateChangeTimeStamp(createdAt));
            let updateTime = Util.timeStampChangeDate(Util.dateChangeTimeStamp(updatedAt));
            let eventDetail = [
                {title: '事件时间', content: limitTime},
                {title: '事件地点', content: location},
                {title: '相关人物', content: person},
                {title: '事件状态', content: status ? '已完成' : '未完成'},
                {title: '创建时间', content: createTime},
                {title: '更新时间', content: updateTime},
            ]
            this.setState({title, status, eventDetail, eventId, content});
        }
    }
    async completeEvent() {
        let res = await Api.completeEvent(this.state.eventId);
        if(res) {
            Toast.success('恭喜！事件已完成！', 2);
            await this.props.dispatchRefreshHome(true);
            this.goBackToHome();
        }
    }
    async deleteEvent() {
        let res = await Api.deleteEvent(this.state.eventId);
        if(res) {
            Toast.success('事件已删除！', 1);
            await this.props.dispatchRefreshHome(true);
            this.goBackToHome();
        }
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className='detail'>
                <div className='detail-header'>
                    <div className='detail-header-back' onClick={this.goBackToHome.bind(this)}>
                        <img src={Back} className='detail-header-back-icon' alt='back' />
                    </div>
                    <div className='detail-header-title'>{this.state.title}</div>
                </div>

                <div className='detail-content'>
                    {this.state.eventDetail.map(item => (
                        <div className='detail-content-item' key={item.title}>
                            <div className='detail-content-item-title'>{item.title}</div>
                            <div className='detail-content-item-text'>{item.content}</div>
                        </div>
                    ))}
                    <div className='detail-content-text'>{this.state.content}</div>
                </div>

                
                <div className='detail-action'>
                    {this.state.status ? '' : <Button className='detail-action-complete' onClick={this.completeEvent.bind(this)}>完成</Button>}
                    <Button className='detail-action-delete' onClick={this.deleteEvent.bind(this)}>删除</Button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    let {refreshHome} = state;
    return {
        refreshHome,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchRefreshHome: (isRefresh) => {
            return dispatch(setRefreshHome(isRefresh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);