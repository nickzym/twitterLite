import React, { Component } from 'react';
import classNames from 'classnames';
import { Card } from 'antd';
import TabsCard from './TabsCard';
import './style.less';
const devImg = require('./image/dev_img.png');
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
                        cover={<img alt="example" src={devImg} />}
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
