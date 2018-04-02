import React,{Component} from 'react';
import Banner from './Banner/index';
import ListItem from './ListItem/index';
import './style.less';

class TimelinePage extends Component {
  render() {
    const clsPrefix = 'twl-list';
    return (
        <div>
            <Banner />
            <div className={`${clsPrefix}--container`}>
                <ListItem />
            </div>
        </div>
    );
  }
}

export default TimelinePage;
