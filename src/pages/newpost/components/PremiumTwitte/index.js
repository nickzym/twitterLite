import React,{Component} from 'react';
import { Form, Icon, Input, InputNumber, Button, Checkbox, Upload } from 'antd';
import './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;


class PremiumTwitteForm extends React.Component {
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
        <FormItem label="Twitte Title">
          {getFieldDecorator('twitte title', {
            rules: [{ required: true, message: 'Please input your twitte title!' }],
          })(
            <Input placeholder="title" />
          )}
        </FormItem>
        <FormItem label="Price">
          {getFieldDecorator('price', {
            rules: [{ required: false, message: 'Please input price!' }],
          })(
            <InputNumber min={0} max={10000} step={10} />
          )}
        </FormItem>
        <FormItem label="Location">
          {getFieldDecorator('location', {
            rules: [{ required: true, message: 'Please input location!' }],
          })(
            <Input placeholder="location" />
          )}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input your description!' }],
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

const PremiumTwitte = Form.create()(PremiumTwitteForm);

export default PremiumTwitte;
