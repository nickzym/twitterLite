import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';

const Introduction = () => {
    const clsPrefix = 'twl-intro';
    return(
        <div className={`${clsPrefix}--container`}>
    	    <h3 className={`${clsPrefix}--title`}>Introduction</h3>
    	    <hr className={`${clsPrefix}--bar`}/>
    	    <div className={`${clsPrefix}--text`}>TwitterLite is a social network which has a limited privacty between wechat and twitter. You can only see the posts from your friends as well as some stranger's posts filtered by our system. You can use TwitterLite to share your favourite restaurants, music, news and pictures. Also you can comment your friend's post.</div>
            <br />
            <div className={`${clsPrefix}--pics`}>
    	        <div className={classNames(`${clsPrefix}--pic-small`, `${clsPrefix}--pic`)} />
    	        <div className={classNames(`${clsPrefix}--pic-large`, `${clsPrefix}--pic`)} />
    	        <div className={classNames(`${clsPrefix}--pic-large`, `${clsPrefix}--pic`)} />
    	        <div className={classNames(`${clsPrefix}--pic-small`, `${clsPrefix}--pic`)} />
    	    </div>
	    </div>
    );
};

export default Introduction;
