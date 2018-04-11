import React,{Component} from 'react';
import Image from 'react-image-resizer';
import { Card, Icon, Avatar, Collapse, List } from 'antd';
import { apiCall } from '../../../services/api';
import './style.less';

const { Meta } = Card;
const Panel = Collapse.Panel;

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const userId = this.props.location.query.author;
        apiCall('get', `/api/user/getUser?userId=${userId}`)
        .then(res => {
            this.setState({
                user: res
            })
        })
    }

    render() {
        const clsPrefix = 'twl-profile';
        const user = this.state ? this.state.user : null;
        console.log(user);
        return (
            <div className={`${clsPrefix}--container`}>
                {
                    user ?
                    <div className={`${clsPrefix}--wrapper`}>
                        <div className={`${clsPrefix}--card`}>
                            <Card
                                style={{ width: 300 }}
                                cover={<img alt="avatar" src={user.avatar} />}
                                actions={[<Icon type="edit">Posts: {user.twittes.length}</Icon>, <Icon type="message">Comments: {user.comments.length}</Icon>]}
                            >
                                <Meta
                                  title={user.username}
                                  description={user.email}
                                />
                            </Card>
                        </div>
                        <div className={`${clsPrefix}--history`}>
                            <Collapse>
                                <Panel header={`${user.username}'s twittes'`} key="1">
                                    <List
                                      itemLayout="vertical"
                                      dataSource={user.twittes}
                                      renderItem={item => (
                                        <List.Item>
                                          <List.Item.Meta
                                            title={item.title}
                                            description={item.description}
                                          />
                                          <Image width={200} height={150} alt="logo" src={item.image} />
                                        </List.Item>
                                      )}
                                    />
                                </Panel>
                                <Panel header={`${user.username}'s comments'`} key="2">
                                    <List
                                      className={`${clsPrefix}--comments`}
                                      itemLayout="vertical"
                                      dataSource={user.comments}
                                      renderItem={item => (
                                        <List.Item>
                                          <List.Item.Meta
                                            description={`"${item.text}"`}
                                          />
                                      <div className={`${clsPrefix}--reftwitte`}>
                                            <div><b>twitte title:</b> {item.twitte ? item.twitte.title : "some twitte"}</div>
                                            <div><b>twitte content:</b> {item.twitte ? item.twitte.description : "some twitte content"}</div>
                                          </div>
                                        </List.Item>
                                      )}
                                    />
                                </Panel>
                            </Collapse>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

export default ProfilePage;
