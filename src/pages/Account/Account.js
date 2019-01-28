import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, SearchBar, ListView, Modal } from 'antd-mobile';
import Util from '../../common/utils/util';
import Loading from '../../components/Loading/Loading';

import './Account.scss';

class Account extends Component {
    render() {
        return (
            <div className="title">Account page</div>
        )
    }
}

export default Account;