import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.less';

class Banner extends Component {

  render() {
    const clsPrefix = 'twl-jumbotron';
    return (
        <Jumbotron>
            <div className={`${clsPrefix}--container`}>
                <h1>Twitte your own life</h1>
                <p>
                    Share your own experence, favorite restaurants and tour in this lite app.
                </p>
                <p>
                    <Button><Link to="/newpost">Post a twitte</Link></Button>
                </p>
            </div>
        </Jumbotron>
    );
  }
}

export default Banner;
