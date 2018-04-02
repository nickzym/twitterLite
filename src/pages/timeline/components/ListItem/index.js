import React,{Component} from 'react';
import { List, Avatar, Icon, Collapse, Input } from 'antd';

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
        }
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        const { messageShow } = this.state;
        return(
            <List
                itemLayout="vertical"
                size="middle"
                pagination={pagination}
                dataSource={listData}
                renderItem={(item, index) => (
                    <div>
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <span onClick={() => this.handleClick(index)}><IconText type="message" text="2" /></span>]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
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
