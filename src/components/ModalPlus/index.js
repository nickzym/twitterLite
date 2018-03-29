import React,{Component} from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css';

class ModalPlus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
        })
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.onChange();
     }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
        this.props.onChange();
    }
    render() {
        const { title, context } = this.props;
        return (
          <div>
            <Modal
              title={title}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>{context}</p>
            </Modal>
          </div>
        );
    }
}

export default ModalPlus;
