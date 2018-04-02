import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Tooltip, Upload } from 'antd';
import ModalPlus from '../../../../components/ModalPlus/index';
import { authUser } from '../../../../store/actions/auth';
import { success, error, warning } from '../../../../components/Message/index';

const FormItem = Form.Item;

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        errors: state.errors
    }
)

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
                if (values.agreement === undefined || values.agreement === false) {
                    warning('Check the agreement!');
                } else {
                    // this.props.authUser('signup', values)
                    // .then(() => {
                    //     success('Signup successfully!');
                    // })
                    // .catch(() => {
                    //     error(this.props.errors.message);
                    // });
                    

                }
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
        const errorMessage = this.props.errors.message;

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
                    {getFieldDecorator('username', {
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

const SignupForm = Form.create()(connect(mapStateToProps, { authUser })(RegistrationForm));

export default SignupForm;
