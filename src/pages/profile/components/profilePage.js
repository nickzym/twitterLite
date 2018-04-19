import React, { Component } from 'react';
import Image from 'react-image-resizer';
import { Card, Icon, Avatar, Collapse, List } from 'antd';
import { apiCall } from '../../../services/api';
import IconText from '../../../components/IconText/index';
import './style.less';

const { Meta } = Card;
const Panel = Collapse.Panel;

const getQueryString = name => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const userId = this.props.location.query ? this.props.location.query.author : getQueryString('author');
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
                <div className={`${clsPrefix}--title`}>
                    <h2>Personal Profile</h2>
                </div>
                <hr className={`${clsPrefix}--bar`}/>
                {
                    user ?
                    <div className={`${clsPrefix}--wrapper`}>
                        <div className={`${clsPrefix}--profile`}>
                            <div className={`${clsPrefix}--avatar`}>
                                <img src={user.avatar}/>
                            </div>
                            <div className={`${clsPrefix}--count`}>
                                <IconText type="twitter" text={`Number of twittes: ${user.twittes.length}`}  iconPos="left"/>
                                <IconText type="message" text={`Number of comments: ${user.comments.length}`}  iconPos="left"/>
                            </div>
                        </div>
                        <div className={`${clsPrefix}--history`}>
                            <Collapse>
                                <Panel header={`${user.username}'s twittes'`} key="1" style={{fontFamily: 'Montserrat'}}>
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
                                <Panel header={`${user.username}'s comments'`} key="2" style={{fontFamily: 'Montserrat'}}>
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
                                                    {
                                                        item.twitte && item.twitte.image ? <Image width={200} height={150} alt="logo" src={item.twitte.image} /> : null
                                                    }
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
