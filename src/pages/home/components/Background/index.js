import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.less';

const Background = () => {
    const clsPrefix = 'twl-background';
    return(
        <div>
            <div className={`${clsPrefix}--container`}>
        	    <div className={`${clsPrefix}--image`}>
        	        <ul className={`${clsPrefix}--slideshow`}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
        	    </div>
        	    <div className={`${clsPrefix}--content`}>
             		<h1>Welcome to TwitterLite</h1>
             		<hr className={`${clsPrefix}--bar`}></hr>
            		<p><Link to="/timeline">View Your TimeLine</Link></p>
                </div>
    	    </div>
        </div>
    );
};

export default Background;
