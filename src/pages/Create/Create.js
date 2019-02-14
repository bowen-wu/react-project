import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createForm } from 'rc-form';


import { Button, List, InputItem, TextareaItem, DatePicker, Toast } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';
import Title from '../../common/img/title.svg';
import Person from '../../common/img/person.svg';
import Time from '../../common/img/time.svg';
import Place from '../../common/img/location.svg';
import Back from '../../common/img/back.svg';
import Api from '../../fetch/Api';
import { setRefreshHome } from '../../redux/actions';

import './Create.scss';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            pageLoading: false,
        }
        console.log(this.props);
    }
    goBackToHome() {
        this.props.history.push('/');
    }
    async addTodo() {
        this.props.form.validateFields(async (error, value) => {
            if (error) {
                Toast.fail('请填写完整信息', 1);
                return;
            };
            this.setState({
                pageLoading: true,
            });

            let {userId} = this.props.userInfo;
            let {content, location, person, time: UTCTime, title} = value;
            let time = Util.dateChangeTimeStamp(UTCTime);
            let res = await Api.addTodo({content, location, person, time, title, userId, status: 0});
            if(res) {
                await this.props.dispatchRefreshHome(true);
                this.setState({
                    pageLoading: false,
                });
                this.props.history.push('/');
            }
        });
    }
    pageLoadingTemplate() {
        if(this.state.pageLoading) {
            return (
                <div className='page-loading'>
                    <Loading />
                </div>
            )
        }
        return false;
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='create'>
                <div className='create-header'>
                    <div className='create-header-back' onClick={this.goBackToHome.bind(this)}>
                        <img src={Back} className='create-header-back-icon' alt='back' />
                    </div>
                    <div className='create-header-title'>添加待办</div>
                </div>
                <List className='create-row'>
                    <InputItem {...getFieldProps('title', {
                            rules: [{
                                'required': true,
                            }]
                        })}><div className='create-row-label'><img src={Title} className='create-row-label-icon' alt='title' />标题</div></InputItem>
                </List>

                <List className='create-row'>
                    <InputItem {...getFieldProps('person', {
                            rules: [{
                                'required': true,
                            }]
                        })}><div className='create-row-label'><img src={Person} className='create-row-label-icon' alt='person' />人物</div></InputItem>
                </List>

                <List className='create-row create-row-time'>
                    <DatePicker
                        {...getFieldProps('time', {
                        rules: [
                            { required: true },
                        ],
                        })}
                    >
                        <List.Item arrow="horizontal"><div className='create-row-label'><img src={Time} className='create-row-label-icon' alt='time' />时间</div></List.Item>
                    </DatePicker>
                </List>

                <List className='create-row'>
                    <InputItem {...getFieldProps('location', {
                            rules: [{
                                'required': true,
                            }]
                        })}><div className='create-row-label'><img src={Place} className='create-row-label-icon' alt='location' />地点</div></InputItem>
                </List>

                <List className='create-row create-row-content'>
                    <TextareaItem
                        {...getFieldProps('content', {
                            rules: [{
                                'required': true,
                            }]
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
                <div className='create-add-todo'>
                    <Button className='submit-button' activeClassName='submit-button-active' onClick={this.addTodo.bind(this)}>添加</Button>
                </div>

                {this.pageLoadingTemplate()}
            </div>
        )
    }
}

function mapStateToProps(state){
    let {userInfo} = state;
    return {
        userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchRefreshHome: (isRefresh) => {
            return dispatch(setRefreshHome(isRefresh));
        }
    }
}

export default createForm()(connect(mapStateToProps, mapDispatchToProps)(Create));