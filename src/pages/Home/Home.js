import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import { setLoginStatus, updateToDoListInfo, setRefreshHome } from '../../redux/actions';

import './Home.scss';
import Account from '../../common/img/account.svg';
import Add from '../../common/img/add.svg';
import Api from '../../fetch/Api';


class Home extends Component {
    constructor() {
        super();
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
        }
    }
    async componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(
                {
                    'S0, R0': "S0, R0",
                    'Section 0': "Section 0"
                }, 
                ['Section 0'], 
                [["S0, R0"]]
            ),
        });
        if(this.props.refreshHome) {
            await this.props.dispatchToDoListInfo({ toDoList: [], totalPage: 1, pageNo: 1});
            await this.getToDoList();
            this.props.dispatchRefreshHome(false);
        }
    }
    async getToDoList() {
        let {toDoList, searchContent} = this.props.toDoListInfo;
        let {userId} = JSON.parse(localStorage.getItem('userInfo'));
        let res = await Api.getToDoList({userId});
        if(res) {
            let {pageObj: {totalPage, pageNo}, list} = res;
            list.forEach(item => {
                let {id, attributes: {content, location, person, status, title, time, userId}} = item;
                let createTime = Util.timeStampChangeDate(time);
                let obj = Object.assign({}, {id, content, location, person, status, title, createTime, userId});
                toDoList.push(obj);
            });
            this.props.dispatchToDoListInfo({toDoList, totalPage, pageNo, searchContent});
        }
    }
    skip(target) {
        this.props.history.push(`/${target}`);
    }
    searchEvent() {

    }
    onScrollHandle() {
        // this.props.dispatchScrollY(this.lv.listviewRef.scrollProperties.offset);
    }
    renderSectionHeaderTemplate() {
        return (
            <Sticky>
                {({ style }) => (
                    <div className="sticky" style={{ ...style, zIndex: 3}}>
                        <div className='home-content-search'>
                            <SearchBar ref={ref => this.autoFocusInst = ref} placeholder='请输入要搜索的 title' cancelText=' ' onClear={this.searchEvent.bind(this, 'clear')} onSubmit={this.searchEvent.bind(this)}/>
                        </div>
                    </div>
                )}
            </Sticky>
        )
    }
    cardTemplate() {
        return (
        <div className='home-content-main'>
            <div className='home-add' onClick={this.skip.bind(this, 'create')}>
                <img src={Add} className='home-add-icon' alt='add' />
            </div>
            <div className='home-content-main-card' onClick={this.skip.bind(this, 'account')}>
                <div className='home-content-main-card-avatar'>
                    <img src={Account} className='home-content-main-card-avatar-icon' alt='logo' />
                </div>
                <div className='home-content-main-card-username'>{this.props.userInfo.username}</div>
            </div>
        </div>
        ) 
    }
    renderFooterTemplate() {
        let {totalPage, pageNo} = this.props.toDoListInfo;
        if (!totalPage || pageNo === totalPage) {
            return (
                <div className='home-footer no-data'>
                    没有更多了
                </div>
            )
        } else {
            return (
                <div className='home-footer'>
                    <Loading />
                </div>
            )
        }
    }
    renderRowTemplate(){
        if(this.props.toDoListInfo && this.props.toDoListInfo.toDoList.length) {
            return this.props.toDoListInfo.toDoList.map(item => {
                return (
                    <div className='home-content-list-item' key={item.id} onClick={this.skip.bind(this, 'detail')}>
                        <div className='home-content-list-item-main'>
                            <div className='home-content-list-item-main-title'>{item.title}</div>
                            <div className='home-content-list-item-main-status' style={item.status ? {backgroundColor: '#00f'} : {backgroundColor: '#f00'}}></div>
                        </div>
                        <div className='home-content-list-item-basic'>
                            <div className='home-content-list-item-basic-time'>{item.createTime}</div>
                            <div className='home-content-list-item-basic-location'>{item.location}</div>
                        </div>
                    </div>
                )
            })
        } else {         
            return false;
        }
    }
    onEndReached(){
        let {totalPage, pageNo} = this.props.toDoListInfo;
        if (pageNo === totalPage) {
          return;
        }
    }
    render() {
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                className='am-list sticky-list home'
                renderSectionWrapper={(sectionID) => (<StickyContainer key={`${sectionID}`} className="sticky-container" style={{ zIndex: 4 }} />)}
                renderSectionHeader={this.renderSectionHeaderTemplate.bind(this)}
                renderHeader={this.cardTemplate.bind(this)}
                renderFooter={this.renderFooterTemplate.bind(this)}
                renderRow={this.renderRowTemplate.bind(this)}
                onScroll={this.onScrollHandle.bind(this)}
                onEndReached={this.onEndReached.bind(this)}
                pageSize={4}
                scrollEventThrottle={200}
                onEndReachedThreshold={100}
                useBodyScroll
            />
        )
    }
}

function mapStateToProps(state){
    let {loginStatus, userInfo, toDoListInfo, refreshHome} = state;
    return {
        loginStatus,
        userInfo,
        toDoListInfo,
        refreshHome,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLoginStatue: (status) => {
            return dispatch(setLoginStatus(status));
        },
        dispatchToDoListInfo: (toDoListInfo) => {
            return dispatch(updateToDoListInfo(toDoListInfo));
        },
        dispatchRefreshHome: (isRefresh) => {
            return dispatch(setRefreshHome(isRefresh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);