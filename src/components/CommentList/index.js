import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Collapse, Input } from 'antd';
import './style.less';

const Panel = Collapse.Panel;
const { TextArea } = Input;

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { comments, collapsed } = this.props;
        return (
            collapsed === true ?
            <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel key="1" showArrow={false}>
                    <List
                        size="small"
                        bordered
                        dataSource={comments}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    className="twl-twitte-comment"
                                    avatar={<Avatar src={item.author.avatar === '' ? "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" : item.author.avatar} />}
                                    title={<span onClick={() => this.props.userInfo(item.author._id)}>{`@${item.author.username}`}</span>}
                                    description={item.text}
                                />
                            </List.Item>
                        )}
                     />
                    <hr style={{visibility:"hidden"}}/>
                    <TextArea placeholder="Leave your comments here" autosize={{ minRows: 2, maxRows: 6 }} onPressEnter={this.props.handleEnter}/>
                </Panel>
            </Collapse> :
            <div style={{marginTop: '20px'}}>
                <List
                    size="small"
                    bordered
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                className="twl-twitte-comment"
                                avatar={<Avatar src={item.author.avatar === '' ? "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" : item.author.avatar} />}
                                title={<span onClick={() => this.props.userInfo(item.author._id)}>{`@${item.author.username}`}</span>}
                                description={item.text}
                                />
                        </List.Item>
                    )}
                 />
                <hr style={{visibility:"hidden"}}/>
                <TextArea placeholder="Leave your comments here" autosize={{ minRows: 2, maxRows: 6 }} onPressEnter={this.props.handleEnter}/>
            </div>
        );
    }
}

CommentList.defaultProps = {
    collapsed: true
};


export default CommentList;
