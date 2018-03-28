import React,{Component} from 'react';
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
            		<a>View Your TimeLine</a>
                </div>
    	    </div>
        </div>
    );
};

export default Background;
