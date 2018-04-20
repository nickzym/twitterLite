import React, { Component } from 'react';
import { List, Avatar, Icon, Collapse, Input, Button, Spin } from 'antd';
import Image from 'react-image-resizer';
import { success, error, warning } from '../../../../components/Message/index';
import CommentList from '../../../../components/CommentList/index';
import IconText from '../../../../components/IconText/index';

const Panel = Collapse.Panel;
const { TextArea } = Input;

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageShow: new Set(),
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            twitte: [],
            start: 0,
            num: 10,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }
    componentWillMount() {
        this.props.fetchTwittes(0, 10)
        .then(res => {
            this.setState({
                twitte: this.props.twittes
            });
        })
    }

    handleClick(index) {
        const messageShow = this.state.messageShow;
        if (messageShow.has(index)) {
            messageShow.delete(index);
        } else {
            messageShow.add(index);
        }
        this.setState({
            messageShow,
        });
    }

    handleDelete(item) {
        this.props.deleteTwitte(item._id, this.props.currentUser.user.id, this.state.twitte)
        .then(res => {
            success("Delete a post successfully!");
            this.setState({
                twitte: this.props.twittes
            })
        })
        .catch(err => {
            warning(err);
        })
    }

    handleEnter(item, e) {
        const { commentTwitte, currentUser } = this.props;
        const comment = new Object();
        comment.twitte_id = item._id;
        comment.author = currentUser.user.id;
        comment.text = e.target.value;
        console.log(comment);
        commentTwitte(comment, this.state.twitte)
        .then(res => {
            console.log(res);
            if(res.status === '401') {
                error(res.message);
            } else {
                success("Comment successfully!");
                this.setState({
                    twitte: this.props.twittes
                })
            }

        })
        .catch(err => {
            error("Comment failed for some reason");
            console.log(err);
        })
    }

    handleUserInfo(user_id) {
        this.props.history.push({
            pathname: '/profile',
            query: {
                author: user_id
            }
        })
    }

    handleTiwtteInfo(twitte) {
        this.props.history.push({
            pathname: '/twitte_info',
            query: {
                twitte,
                userId: this.props.currentUser.user.id
            }
        })
    }

    onLoadMore(){
        this.setState({
            loadingMore: true,
        });
        this.props.fetchTwittes(this.state.start+1, this.state.num, this.state.twitte)
        .then(res => {
            this.setState({
                twitte: this.props.twittes,
                loadingMore: false,
                start: this.state.start + 1
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        })
    }

    render() {
        const clsPrefix = 'twl-list';
        const { messageShow } = this.state;
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const { currentUser } = this.props;
        const loadMore = showLoadingMore ? (
          <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            {loadingMore && <Spin />}
            {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
          </div>
        ) : null;
        const defaultImg = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";
        return(
            <List
                style={{fontFamily: 'Montserrat'}}
                itemLayout="vertical"
                size="middle"
                loadMore={loadMore}
                dataSource={this.state.twitte}
                renderItem={(item, index) => (
                    <div>
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type="star-o" text="156" />,
                                <IconText type="like-o" text="156" />,
                                <span onClick={() => this.handleClick(index)}><IconText type="message" text={item.comments.length} /></span>,
                                <IconText type="clock-circle-o" text={`created at ${item.createAt.substring(0, 10)}`} />,
                                item.author && currentUser.user.id === item.author._id ? <span onClick={() => this.handleDelete(item)}><IconText type="delete" /></span> : null
                            ]}
                            extra={<div className="twl-timeline-border"><Image width={200} height={150} alt="logo" src={item.image} /></div>}
                        >
                            <List.Item.Meta
                                title={item.isPremium ? <span className={`${clsPrefix}--pointer`} onClick={() => this.handleTiwtteInfo(item)}><IconText iconPos='right' type="eye" text={item.title}/></span> : item.title}
                                description={item.author ? <span className={`${clsPrefix}--pointer`} onClick={() => this.handleUserInfo(item.author._id)}>{`@${item.author.username}`}</span> : 'No one'}
                                avatar = {<Avatar size="large" src={item.author ? item.author.avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                            />
                            {item.description}
                            </List.Item>
                            {
                                messageShow.has(index) ? <CommentList comments={item.comments} userInfo={this.handleUserInfo} handleEnter={(e) => this.handleEnter(item, e)} /> : null
                            }
                    </div>
                )}
            />
        );
    }
}

export default ListItem;
