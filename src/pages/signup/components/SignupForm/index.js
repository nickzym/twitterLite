import React,{Component} from 'react';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Tooltip from 'antd/lib/tooltip';
import Upload from 'antd/lib/upload';
// import Portal from '../../../../components/Portal/index';
import ModalPlus from '../../../../components/ModalPlus/index';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/auto-complete/style/css';
import 'antd/lib/upload/style/css';


const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          confirmDirty: false,
          showAgree: false,
        };
        this.showAgreement = this.showAgreement.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    showAgreement() {
        console.log('hahah');
        this.setState({
            showAgree: !this.state.showAgree,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { showAgree } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{width: '500px', position: 'relative',left: '-50px'}}>
                  <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    style={{fontFamily: 'Montserrat'}}
                  >
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                        required: true, message: 'Please input your E-mail!',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Password"
                    style={{fontFamily: 'Montserrat'}}
                  >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    style={{fontFamily: 'Montserrat'}}
                  >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: 'Please confirm your password!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    )}
                    style={{fontFamily: 'Montserrat'}}
                  >
                    {getFieldDecorator('nickname', {
                      rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Avatar"
                    style={{fontFamily: 'Montserrat'}}
                  >
                    {getFieldDecorator('upload', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                          <Icon type="upload" /> Click to upload
                        </Button>
                      </Upload>
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout} style={{fontFamily: 'Montserrat'}}>
                    {getFieldDecorator('agreement', {
                      valuePropName: 'checked',
                    })(
                      <Checkbox style={{fontFamily: 'Montserrat'}}>I have read the <a onClick={this.showAgreement}>agreement</a></Checkbox>
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout} style={{fontFamily: 'Montserrat'}}>
                    <Button type="primary" htmlType="submit">Register</Button>
                  </FormItem>
                </Form>
                <ModalPlus
                    visible={showAgree}
                    onChange={this.showAgreement}
                    title="TwitterLite Agreement"
                    context="嗯其实没有什么好说的，actually这就是一个人全栈项目，欢迎大家注册么么哒~希望大家在我的github上点一颗小星星 地址是https://github.com/nickzym/twitterLite"
                />
            </div>
        );
    }
}

const SignupForm = Form.create()(RegistrationForm);

export default SignupForm;
