import React,{Component} from 'react';
import SignupForm from './SignupForm/index';
import './style.less';

class SignupPage extends Component {
  render() {
    const clsPrefix = 'twl-signup';
    return (
        <div className={`${clsPrefix}--container`}>
            <h2>Please Sign Up : )</h2>
            <hr />
            <SignupForm />
        </div>
    );
  }
}

export default SignupPage;
