import React,{Component} from 'react';
import Banner from './Banner/index';
import ListItem from './ListItem/index';
import './style.less';

class TimelinePage extends Component {
    render() {
        const clsPrefix = 'twl-list';
        const { twittes } = this.props;
        return (
            <div>
                <Banner />
                <div className={`${clsPrefix}--container`}>
                    <ListItem fetchTwittes={this.props.fetchTwittes}/>
                </div>
            </div>
        );
    }
}

export default TimelinePage;
