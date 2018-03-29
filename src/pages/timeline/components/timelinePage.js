import React,{Component} from 'react';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
import Banner from './Banner/index';
import ListItem from './ListItem/index';
import './style.less';

class TimelinePage extends Component {
  render() {
    const clsPrefix = 'twl-list';
    return (
        <div>
            <Header />
            <Banner />
            <div className={`${clsPrefix}--container`}>
                <ListItem />
            </div>
            <Footer />
        </div>
    );
  }
}

export default TimelinePage;
