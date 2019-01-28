import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {}
    }
    skip(target) {
        this.props.history.push(`/${target}`);
    }
    render() {
        return (
            <div className="title">
                This is Home page
                <hr />
                <Button onClick={this.skip.bind(this, 'detail')}>go to detail</Button>
                <Button onClick={this.skip.bind(this, 'account')}>go to account</Button>
                <Button onClick={this.skip.bind(this, 'error')}>go to error</Button>
                <Button onClick={this.skip.bind(this, 'login')}>go to login</Button>
            </div>
        )
    }
}

export default Home;