import React,{Component} from 'react';
import classNames from 'classnames';
import Card from 'antd/lib/card';
import TabsCard from './TabsCard';
import 'antd/lib/card/style/css';
import './style.less';

const { Meta } = Card;

const Developer = () => {
    const clsPrefix = 'twl-developer';
    return(
        <div className={`${clsPrefix}--container`}>
            <h3 className={`${clsPrefix}--title`}>Developer Info</h3>
    	    <hr className={`${clsPrefix}--bar`}/>
    	    <div className={`${clsPrefix}--text`}>I am Yiming Zhang(Nick), Developer of this app.</div>
            <br />
            <div className={`${clsPrefix}--card`}>
                <div className={`${clsPrefix}--card-left`}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={require('./dev_img.png')} />}
                    >
                      <Meta
                        title="Yiming Zhang"
                        description="Web developer"
                      />
                    </Card>
                </div>
                <div className={`${clsPrefix}--card-right`}>
                    <TabsCard />
                </div>
            </div>

	    </div>
    );
};

export default Developer;
