import React,{Component} from 'react';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
import Tabs from 'antd/lib/tabs';
import NormalTwitte from './NormalTwitte/index';
import PremiumTwitte from './PremiumTwitte/index';
import 'antd/lib/tabs/style/css';
import './style.less';

const TabPane = Tabs.TabPane;

class NewpostPage extends Component {
  render() {
    const clsPrefix = 'twl-newpost';
    return (
        <div>
            <Header />
            <div className={`${clsPrefix}--container`}>
                <h2>Create a new post : )</h2>
                <hr />
                <div className="card-container">
                    <Tabs type="card">
                      <TabPane tab="Normal Twitte" key="1">
                        <NormalTwitte />
                      </TabPane>
                      <TabPane tab="Restaurant Share" key="2">
                        <PremiumTwitte />
                      </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
}

export default NewpostPage;
