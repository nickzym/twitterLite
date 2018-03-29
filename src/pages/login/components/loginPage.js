import React,{Component} from 'react';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
import LoginForm from './LoginForm/index';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import './style.less';

class LoginPage extends Component {
  render() {
    const clsPrefix = 'twl-login';
    return (
        <div>
            <Header />
            <div className={`${clsPrefix}--container`}>
                <h2>Please Login : )</h2>
                <hr />
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
  }
}

export default LoginPage;
