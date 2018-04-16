import React,{Component} from 'react';
import { Image } from 'react-bootstrap';
import { apiCall } from '../../../services/api';
import { Menu, Icon, Avatar } from 'antd';
import Geocode from "react-geocode";
import CommentList from '../../../components/CommentList/index';
import { success, error, warning } from '../../../components/Message/index';
import { MapComponent } from '../../../components/MapComponent';
import { commentSingleTwitte } from '../../../store/actions/twittes';
import './style.less';

class TwitteInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitte: this.props.location.query.twitte,
            lat: -34.397,
            lng: 150.644
        }
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentWillMount() {
        Geocode.setApiKey("AIzaSyCOWBvmEN2dBbC6S4jAvMRN7VSeGPZt72g");

        Geocode.enableDebug();
        const location = this.state.twitte.location;

        // Get latidude & longitude from address.
        Geocode.fromAddress(location)
        .then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                lat,
                lng
            })
            console.log(lat, lng);
          },
          error => {
            console.error(error);
          }
        );
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
                        <div>
                            <h4><Icon type="caret-right" />  TwitteLite Support API</h4>
                        </div>
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
                        <MapComponent
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCbxThosEqEbGFGorOc6YVVs6mWvAlnMY&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            lat={this.state.lat}
                            lng={this.state.lng}
                        />
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
                    </div>
                </div>
            </div>
        );
    }
}

export default TwitteInfoPage;
