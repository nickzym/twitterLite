import React,{Component} from 'react';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
import SignupForm from './SignupForm/index';
import './style.less';

class SignupPage extends Component {
  render() {
    const clsPrefix = 'twl-signup';
    return (
        <div>
            <Header />
            <div className={`${clsPrefix}--container`}>
                <h2>Please Sign Up : )</h2>
                <hr />
                <SignupForm />
            </div>
            <Footer />
        </div>
    );
  }
}

export default SignupPage;
