import React,{Component} from 'react';
import { List, Avatar, Icon, Collapse, Input, Button, Spin } from 'antd';
import Image from 'react-image-resizer';
import { success, error, warning } from '../../../../components/Message/index';


const Panel = Collapse.Panel;
const { TextArea } = Input;

class IconText extends Component {
    render() {
        const { type, text } = this.props;
        return(
            <span>
              <Icon type={type} style={{ marginRight: 8 }}/>
              {text}
            </span>
        );
    }
}

class Message extends Component {
    render() {
        return (
            <Collapse bordered={false} defaultActiveKey={['1']} >
                <Panel key="1" showArrow={false}>
                    <IconText type="message" text="This is a message leaving from Nick Yiming zhang" />
                    <hr style={{visibility:"hidden"}}/>
                    <TextArea placeholder="Leave your comments here" autosize={{ minRows: 2, maxRows: 6 }} />
                </Panel>
            </Collapse>
        );
    }
}

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
            success("Delete a post successfully !");
            this.setState({
                twitte: this.props.twittes
            })
        })
        .catch(err => {
            warning(err);
        })
    }

    onLoadMore = () => {
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
                                item.author && currentUser.user.id === item.author._id ? <span onClick={() => this.handleDelete(item)}><IconText type="delete" /></span> : null
                            ]}
                            extra={<div className="twl-timeline-border"><Image width={200} height={150} alt="logo" src={item.image} /></div>}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.author ? `@${item.author.username}` : 'No one'}
                                avatar = {<Avatar size="large" src={item.author ? item.author.avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                            />
                            {item.description}
                            </List.Item>
                            {
                                messageShow.has(index) ? <Message /> : null
                            }
                    </div>
                )}
            />
        );
    }
}

export default ListItem;
