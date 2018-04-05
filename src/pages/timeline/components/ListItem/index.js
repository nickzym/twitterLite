import React,{Component} from 'react';
import { List, Avatar, Icon, Collapse, Input, Button, Spin } from 'antd';
import Image from 'react-image-resizer';

const Panel = Collapse.Panel;
const { TextArea } = Input;

const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};

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
    }
    componentWillMount() {
        this.props.fetchTwittes(0, 10)
        .then(res => {
            console.log(res);
            this.setState({
                twitte: res
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

    onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.props.fetchTwittes(this.state.start+1, this.state.num)
        .then(res => {
            this.setState({
                twitte: this.state.twitte.concat(res),
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
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <span onClick={() => this.handleClick(index)}><IconText type="message" text={item.comments.length} /></span>]}
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
