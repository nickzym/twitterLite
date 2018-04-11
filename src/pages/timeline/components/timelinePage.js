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
                    <ListItem
                        fetchTwittes={this.props.fetchTwittes}
                        currentUser={this.props.currentUser}
                        deleteTwitte={this.props.deleteTwitte}
                        commentTwitte={this.props.commentTwitte}
                        twittes={this.props.twittes}
                        history={this.props.history}
                    />
                </div>
            </div>
        );
    }
}

export default TimelinePage;
