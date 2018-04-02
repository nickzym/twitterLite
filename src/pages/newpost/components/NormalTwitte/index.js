import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Upload } from 'antd';
import './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;


class NormalTwitteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator('twitte', {
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
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>
        <FormItem>
            <Button type="primary">Post!</Button>
          </FormItem>
      </Form>
    );
  }
}

const NormalTwitte = Form.create()(NormalTwitteForm);

export default NormalTwitte;
