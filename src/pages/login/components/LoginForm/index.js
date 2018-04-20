import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.less';
import { authUser } from '../../../../store/actions/auth';
import { success, error, warning } from '../../../../components/Message/index';

const FormItem = Form.Item;

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        errors: state.errors
    }
)


class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.authUser('login', values)
                .then(() => {
                    success('Login successfully!');
                    setTimeout(function() {
                        window.location.href = '/timeline';
                    }, 2000);
                })
                .catch(() => {
                    error(this.props.errors.message);
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
             </Form>
        );
    }
}

const LoginForm = Form.create()(connect(mapStateToProps, { authUser })(NormalLoginForm));

export default LoginForm;
