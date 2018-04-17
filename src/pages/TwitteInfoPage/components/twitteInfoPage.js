import React,{Component} from 'react';
import Geocode from 'react-geocode';
import { Image as ImageResize } from 'react-bootstrap';
import Image  from 'react-image-resizer';
import { apiCall } from '../../../services/api';
import { Menu, Icon, Avatar, Spin, Collapse, Card, Tag, Rate } from 'antd';
import { Icon as IconFa }  from 'react-fa';
import {Card as MCard, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommentList from '../../../components/CommentList/index';
import { success, error, warning } from '../../../components/Message/index';
import { MapComponent } from '../../../components/MapComponent';
import { commentSingleTwitte } from '../../../store/actions/twittes';
import './style.less';

const Panel = Collapse.Panel;
const { Meta } = Card;

class TwitteInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitte: this.props.location.query ? this.props.location.query.twitte : JSON.parse(localStorage.getItem('twitte')),
            lat: -34.397,
            lng: 150.644,
            placeId: '',
            key: '1',
            loading: false
        }
        this.handleEnter = this.handleEnter.bind(this);
        this.handleAPIClick = this.handleAPIClick.bind(this);
        this.renderPart = this.renderPart.bind(this);
    }

    componentWillMount() {
        localStorage.setItem('twitte', JSON.stringify(this.state.twitte));
        Geocode.setApiKey("AIzaSyCOWBvmEN2dBbC6S4jAvMRN7VSeGPZt72g");

        Geocode.enableDebug();
        const location = this.state.twitte.location;

        // Get latidude & longitude from address.
        Geocode.fromAddress(location)
        .then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            const placeId  = response.results[0].place_id;
            this.setState({
                lat,
                lng,
                placeId
            })
            console.log(lat, lng);
          },
          error => {
            console.error(error);
          }
        );
    }

    handleAPIClick(item) {
        const key = item.key;
        this.setState({
            loading: true
        }, () => {
            if (key === '1') {
                this.setState({
                    key,
                    loading: false
                })
            } else if (key === '2') {
                if(!this.state.yelp) {
                    const loc = this.state.twitte.location;
                    return apiCall('get', `/api/yelp/get?location=${loc}`)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            key,
                            yelp: res,
                            loading: false
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        key,
                        loading: false
                    })
                }
            } else if (key === '3') {
                if(!this.state.google) {
                    const {lat, lng} = this.state;
                    return apiCall('get', `/api/google/get?lat=${lat}&lng=${lng}`)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            google: res,
                            key,
                            loading: false
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        key,
                        loading: false
                    })
                }
            }
        })
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

    renderPart() {
        const { key, twitte } = this.state;
        const clsPrefix = 'twl-twitteInfo';
        if (key === '1') {
            return (
                <div style={{width: '100%'}}>
                    <div className={`${clsPrefix}--twitte_logo`}><Image width={100} height={100} src={require('../image/twitter_logo.png')} />Twitte</div>
                    <div className={`${clsPrefix}--twitteInfo`}>
                        <Card
                            hoverable
                            style={{ width: 300 }}
                            cover={<img alt="example" src={twitte.image} />}
                        >
                            <Meta
                              title={twitte.title}
                              description={`@${twitte.author.username}`}
                            />
                        </Card>
                        <div className={`${clsPrefix}--twittecontent`}>
                            <h4>{`price: $${twitte.price}/person`}</h4>
                            <p>{twitte.description}</p>
                            <p><em>Submitted by {twitte.author.username}, created at {twitte.createAt.substring(0, 10)} {twitte.createAt.substring(11, 19)}</em></p>
                        </div>
                    </div>
                    <div className={`${clsPrefix}--twitteComment`}>
                        <CommentList collapsed={false} comments={twitte.comments} handleEnter={this.handleEnter} />
                    </div>
                </div>
            )
        } else if (key === '2') {
            const yelpData = this.state.yelp.businesses;
            const customPanelStyle = {
                borderRadius: 2,
                marginBottom: 1,
                overflow: 'hidden',
            };
            return (
                <div style={{width: '100%'}}>
                    <Image width={200} height={128} src={require('../image/yelp_logo.png')} />
                    <Collapse accordion style={{width: '100%'}}>
                        {
                            yelpData.map((value, index) => (

                                <Panel header={value.name} key={index} style={customPanelStyle}>
                                    <Card
                                        style={{ width: 500 }}
                                        cover={<Image width={500} height={500} src={value.image_url} />}
                                    >
                                        <Meta
                                          title={value.name}
                                          description={<span className={`${clsPrefix}--dollar`}>{value.price}</span>}
                                        />
                                        <hr />
                                        {
                                            value.categories.map(val => (
                                                <Tag color="#c7233e">{val.title}</Tag>
                                            ))
                                        }
                                        <div>
                                            <Icon type="phone" />
                                            <span>  {value.display_phone}</span>
                                        </div>
                                        <div>
                                            <Icon type="environment-o" />
                                            <span>  {`${value.location.address1} ${value.location.address2} ${value.location.address3}, ${value.location.city}`}</span>
                                        </div>
                                        <Rate disabled allowHalf defaultValue={value.rating} />
                                        <a href={value.url}>Link</a>
                                    </Card>
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            )
        } else if (key === '3') {
            const google = this.state.google;
            const apiKey = 'AIzaSyCCbxThosEqEbGFGorOc6YVVs6mWvAlnMY';
            return (
                <div>
                    <Image width={200} height={128} src={require('../image/google_logo.png')} />
                    <MuiThemeProvider>
                        <MCard>
                            <CardHeader
                              title="Google Providing Content"
                              subtitle="Powered by google map api service"
                              avatar={require("../image/google_maps_logo.png")}
                            />
                            {
                                google.photos ?
                                <CardMedia
                                  overlay={<CardTitle title={google.name} subtitle={google.formatted_address} />}
                                >
                                    <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${google.photos[0].photo_reference}&key=${apiKey}`} alt="google" />
                                </CardMedia>
                                : null
                            }
                            <CardTitle title={google.name} subtitle={google.types[0]} />
                            <CardText>
                              <a href={google.website}>Web site</a>
                            </CardText>
                            {
                                google.reviews.map((value, index) => {
                                    return(
                                        <MCard>
                                            <CardHeader
                                              title={value.author_name}
                                              avatar={value.profile_photo_url}
                                            />
                                            <CardTitle>
                                                <Rate disabled allowHalf defaultValue={value.rating} />
                                            </CardTitle>
                                            <CardText>
                                              {value.text}
                                            </CardText>
                                        </MCard>
                                    )
                                })
                            }
                        </MCard>
                    </MuiThemeProvider>
                </div>
            );
        }
    }

    render() {
        const clsPrefix = 'twl-twitteInfo';
        const { twitte, loading } = this.state;
        const renderRight = this.renderPart();
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
                            onClick={this.handleAPIClick}
                        >
                            <Menu.Item key="1">
                                <Icon type="twitter" />
                                Twitte Content
                            </Menu.Item>
                            <Menu.Item key="2">
                                <IconFa name="fab fa-yelp"/>
                                  Yelp Providing Content
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="google" />
                                Google Providing Content
                            </Menu.Item>
                        </Menu>
                        <MuiThemeProvider>
                            <MCard>
                                <MapComponent
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCbxThosEqEbGFGorOc6YVVs6mWvAlnMY&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                />
                            </MCard>
                        </MuiThemeProvider>
                    </div>
                    <div className={`${clsPrefix}--rightPanel`}>
                        {
                            loading ? <div><Spin size="large" /></div> : renderRight
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TwitteInfoPage;
