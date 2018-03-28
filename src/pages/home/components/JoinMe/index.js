import React,{Component} from 'react';
import classNames from 'classnames';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/card/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/avatar/style/css';
import { Image } from 'react-bootstrap';
import './style.less';

const { Meta } = Card;

const JoinMe = () => {
    const clsPrefix = 'twl-join';
    return(
        <div className={`${clsPrefix}--container`}>
    	    <h3 className={`${clsPrefix}--title`}>Join Me</h3>
    	    <hr className={`${clsPrefix}--bar`}/>
    	    <div className={`${clsPrefix}--text`}>My interest is in Web Development. I am eager to build my app on IOS and Android. If you have interest in this project, please contact me.</div>
            <br />
            <div className={`${clsPrefix}--position`}>
                <Card
                  style={{ width: 300 }}
                  cover={<Image src={require('./iphone.jpg')} rounded />}
                  actions={[<Input placeholder="@Email" />]}
                >
                <Meta
                  avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/160px-Apple_logo_black.svg.png" />}
                  title="IOS Developer"
                  description="Familiar with IOS Development, React Native, Objective-C Webpack etc"
                />
                </Card>

                <Card
                  style={{ width: 300 }}
                  cover={<Image src={require('./pixel.jpg')} rounded />}
                  actions={[<Input placeholder="@Email" />]}
                >
                <Meta
                  avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/2000px-Android_robot.svg.png" />}
                  title="Android Developer"
                  description="Familiar with Android Development, Kotlin, Webpack etc"
                />
                </Card>
    	    </div>
	    </div>
    );
};

export default JoinMe;
