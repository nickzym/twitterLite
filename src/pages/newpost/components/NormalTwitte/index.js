import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Upload } from 'antd';
import { postTwitte } from '../../../../store/actions/twittes';
import { success, error, warning } from '../../../../components/Message/index';
import './style.less';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const { TextArea } = Input;

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        errors: state.errors
    }
)

class NormalTwitteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.normFile = this.normFile.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && this.props.currentUser.isAuthenticated) {
                console.log('Received values of form: ', values);

                const data = new Object();
                data.author = this.props.currentUser.user.id;
                data.title = values.title;
                data.description = values.description;

                var formData = new FormData();
                formData.append("file", this.state.file);
                formData.append("field", JSON.stringify(data));
                this.props.postTwitte(formData)
                .then(res => {
                    success('Post a new twitte successfully!');
                    setTimeout(function() {
                        window.location.href = "/timeline";
                    }, 2000);
                })
                .catch(err => {
                    error('Post twitte failed : (');
                    console.log(err);
                })
            } else {
                warning('Please login in first : )');
            }
        });
    }

    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            action: '/api/twitte/create',
            beforeUpload: (file, fileList) => {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                if (!isJPG) {
                    error('You can only upload JPG/JPEG/PNG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 6;
                if (!isLt2M) {
                    error('Image must smaller than 6MB!');
                }

            if (isJPG && isLt2M) {
                this.setState({
                    file
                });
            }
            return false;
        },
    };

    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input your title!' }],
                })(
                    <Input placeholder="title" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input your twitte!' }],
                })(
                    <TextArea rows={4} />
                )}
            </FormItem>
            <FormItem
                label="Share an image?"
                >
                <div className="dropbox">
                    {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Dragger>
                    )}
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={this.handleSubmit}>Post!</Button>
            </FormItem>
        </Form>
    );
  }
}

const NormalTwitte = Form.create()(connect(mapStateToProps, { postTwitte })(NormalTwitteForm));

export default NormalTwitte;
