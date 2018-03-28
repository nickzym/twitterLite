import React,{Component} from 'react';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
import Banner from './Jumbotron/index';

class TimelinePage extends Component {

  render() {
    return (
        <div>
            <Header />
            <Banner />
            <Footer />
        </div>
    );
  }
}

export default TimelinePage;
