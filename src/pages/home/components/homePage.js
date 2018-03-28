import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Background from './Background/index';
import Introduction from './Introduction/index';
import Developer from './Developer/index';
import JoinMe from './JoinMe/index';
import MoreInfo from './MoreInfo/index';

class Home extends Component{
  render(){
    // let {add,count,homeInfo:{name,age}}=this.props;
    return (
      <div>
        <Header />
        <Background />
        <Introduction />
        <Developer />
        <JoinMe />
        <MoreInfo />
        <Footer />
      </div>
    )
  }
}

export default Home
