import React,{Component} from 'react';
import { Image } from 'react-bootstrap';
import { apiCall } from '../../../services/api';
import { Menu, Icon, Avatar } from 'antd';
import CommentList from '../../../components/CommentList/index';
import { success, error, warning } from '../../../components/Message/index';
import { commentSingleTwitte } from '../../../store/actions/twittes';
import './style.less';

class TwitteInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitte: this.props.location.query.twitte
        }
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter(e) {
        const comment = new Object();
        comment.twitte_id = this.state.twitte._id;
        comment.author = this.props.location.query.userId;
        comment.text = e.target.value;
        console.log(comment);
        commentSingleTwitte(comment)
        .then(res => {
            this.setState({
                twitte: res
            }, () => {
                success("Comment successfully !");
            })
        })
        .catch(err => {
            console.log(err);
            error("Comment failed !");
        })
    }

    render() {
        const clsPrefix = 'twl-twitteInfo';
        const { twitte } = this.state;
        return (
            <div className={`${clsPrefix}--container`}>
                <div className={`${clsPrefix}--wrapper`}>
                    <div className={`${clsPrefix}--leftPanel`}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ width: 256 }}
                        >
                            <Menu.Item key="1">
                                <Icon type="twitter" />
                                Twitte Content
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="google" />
                                Google Providing Content
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="facebook" />
                                Fackebook Providing Content
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className={`${clsPrefix}--rightPanel`}>
                        <div className={`${clsPrefix}--twitteInfo`}>
                            <Image alt="twitte_img" src={twitte.image} responsive />
                            <h4 style={{float: 'right'}}>{`$${twitte.price}/person`}</h4>
                            <h4>{twitte.title}</h4>
                            <p>{twitte.description}</p>
                            <p><em>Submitted by {twitte.author.username}, created at {twitte.createAt.substring(0, 10)} {twitte.createAt.substring(11, 19)}</em></p>
                        </div>
                        <div className={`${clsPrefix}--twitteComment`}>
                            <CommentList collapsed={false} comments={twitte.comments} handleEnter={this.handleEnter} />
                        </div>
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${twitte.location}&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=AIzaSyCOWBvmEN2dBbC6S4jAvMRN7VSeGPZt72g`} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TwitteInfoPage;
