import React, { Component } from 'react';
import LoginForm from './LoginForm/index';
import { Card } from 'antd';
import './style.less';

class LoginPage extends Component {
  render() {
    const clsPrefix = 'twl-login';
    return (
        <div className={`${clsPrefix}--container`}>
            <h2>Please Login : )</h2>
            <hr />
            <LoginForm />
        </div>
    );
  }
}

export default LoginPage;
