import React,{Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './style.less';

const MoreInfo = () => {
    const clsPrefix = 'twl-moreinfo';
    return(
        <div className={`${clsPrefix}--container`}>
    	    <h3 className={`${clsPrefix}--title`}>Learn More</h3>
    	    <hr className={`${clsPrefix}--bar`}/>
    	    <div className={`${clsPrefix}--text`}>Want to know about our upcoming special events, or come to make more friends? Just sign up for our mailing list. No spam from us, we promise! Except for the spam we give your to keep up your energy while you're enjoying chatting.</div>
            <br />
            <div className={`${clsPrefix}--email`}>
                <Form inline>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Jane Doe" />
                  </FormGroup>{' '}
                  <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="jane.doe@example.com" />
                  </FormGroup>{' '}
                  <Button type="submit">Send invitation</Button>
                </Form>
    	    </div>
	    </div>
    );
};

export default MoreInfo;
